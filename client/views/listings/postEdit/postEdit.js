Template.postEdit.events({
  'click #updatePost': function(e) {
    e.preventDefault();
    
    var postProperties = {
      currentPostId: this._id,
      authors: $('#update').find('[name=authors]').val(),
      title: $('#update').find('[name=title]').val(),
      description: $('#update').find('[name=description]').val()
    }
    
    Meteor.call('update', postProperties, function(error, id) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
        
        if (error.error === 302)
          Router.go('postPage', {_id: error.details})
      } else {
        Router.go('postPage', {_id: id});
      }
    });
  },

  'click .del-file': function(e, t) {
    return myFiles.remove({
      _id: this._id
    });
  },
  
  'click .delete': function(e) {
    e.preventDefault();
    if (confirm("Delete this listing?")) {
      var postProperties = {
      userId : this.userId,  
      currentPostId: this._id,
      category: this.category
     }
      Meteor.call('remove', postProperties, function(error, id) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
        
        if (error.error === 302)
          Router.go('postPage', {_id: error.details})
      } else {
        Router.go('home');
      }
    });
      
    }
  }
});


Template.postEdit.helpers({ 
  dataEntries: function() {
    return myFiles.find({'metadata.postId': this._id});
  }, 
  isImage: function() {
    return imageTypes[this.contentType] != null;
  },
  link: function() {
    return myFiles.baseURL + "/" + this.md5
  },
  shortFilename: function(w) {
    if (w == null) {
      w = 16;
    }
    return shorten(this.filename, w);
  }
});

var shorten;
shorten = function(name, w) {
  if (w == null) {
    w = 16;
  }
  if (w % 2) {
    w++;
  }
  w = (w - 2) / 2;
  if (name.length > w) {
    return name.slice(0, +w + 1 || 9e9) + '...' + name.slice(-w - 1);
  } else {
    return name;
  }
};
