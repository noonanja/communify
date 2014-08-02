// Create a file collection, and enable file upload and download using HTTP
myFiles = new FileCollection('myFiles',
  { resumable: true,   // Enable built-in resumable.js upload support
    http: [
      { method: 'get',
        path: '/:md5',  // this will be at route "/gridfs/myFiles/:md5"
        lookup: function (params, query) {  // uses express style url params
          return { md5: params.md5 };       // a query mapping url to myFiles
        }
      }
    ]
  }
);

if (Meteor.isServer) {

  // Only publish files owned by this userId, and ignore
  // file chunks being used by Resumable.js for current uploads
  Meteor.publish('myData',
    function (clientUserId) {
      if (clientUserId === this.userId) {
        return myFiles.find({ 'metadata._Resumable': { $exists: false },
                              'metadata.owner': this.userId });
      } else {        // Prevent client race condition:
        return null;  // This is triggered when publish is rerun with a new
                      // userId before client has resubscribed with that userId
      }
    }
  );
  
  Meteor.publish('singlemyData', function(id) {
  // ignore file chunks being used by Resumable.js for current uploads
  return id && myFiles.find({'metadata.postId': id});
  });

  // Allow rules for security. Should look familiar!
  // Without these, no file writes would be allowed
  myFiles.allow({
    // The creator of a file owns it. UserId may be null.
    insert: function (userId, file) {
      // Assign the proper owner when a file is created
      file.metadata = file.metadata || {};
      file.metadata.owner = userId;
      return true;
    },
    // Only owners can remove a file
    remove: function (userId, file) {
      // Only owners can delete
      return (userId === file.metadata.owner);
    },
    // Anyone can retrieve a file via HTTP GET
    read: function (userId, file) {
      return true;
    },
    // This rule secures the HTTP REST interfaces' PUT/POST
    // Necessary to support Resumable.js
    write: function (userId, file, fields) {
      // Only owners can upload file data
      return (userId === file.metadata.owner);
    }
  });
}

if (Meteor.isClient) {

  imageTypes = {
   'image/jpeg': true,
   'image/png': true,
   'image/gif': true,
   'image/tiff': true
  };

  Meteor.startup(function() {

    Template.postContinue.rendered = function(){
    // This assigns a file upload drop zone to some DOM node
    myFiles.resumable.assignDrop($(".fileDrop"));
    // This assigns a browse action to a DOM node
    myFiles.resumable.assignBrowse($(".fileBrowse"));
    }
    
    // To prevent the browswer from loading the image
    window.addEventListener('dragover', (function(e) {
       return e.preventDefault();
      }), false);
    window.addEventListener('drop', (function(e) {
       return e.preventDefault();
      }), false);

    // When a file is added via drag and drop
    myFiles.resumable.on('fileAdded', function (file) {

      // Create a new file in the file collection to upload
      myFiles.insert({
        _id: file.uniqueIdentifier,  // This is the ID resumable will use
        filename: file.fileName,
        contentType: file.file.type,
        metadata: { postId: Session.get('postId')}
        },
        function (err, _id) {  // Callback to .insert
          if (err) { return console.error("File creation failed!", err); }
          // Once the file exists on the server, start uploading
          myFiles.resumable.upload();
        }
      );
    });

    // upload the progress session variable
    myFiles.resumable.on('fileProgress', function(file) {
      return Session.set(file.uniqueIdentifier, Math.floor(100 * file.progress()));
    });

    // Finish the upload progress in the session variable
    myFiles.resumable.on('fileSuccess', function(file) {
      return Session.set(file.uniqueIdentifier, void 0);
    });



    // This autorun keeps a cookie up-to-date with the Meteor Auth token
    // of the logged-in user. This is needed so that the read/write allow
    // rules on the server can verify the userId of each HTTP request.
    Deps.autorun(function () {
      userId = Meteor.userId()
      // // Sending userId prevents a race condition
      // Meteor.subscribe('myData', Meteor.userId());

      // $.cookie() assumes use of "jquery-cookie" Atmosphere package.
      // You can use any other cookie package you may prefer...
      $.cookie('X-Auth-Token', Accounts._storedLoginToken());
    });
  });
}