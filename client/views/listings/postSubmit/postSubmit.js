Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var post = {
      category: $(e.target).find('[name=category]').val(),
      title: $(e.target).find('[name=title]').val(),
      authors: $(e.target).find('[name=authors]').val(),
      emails: $(e.target).find('[name=emails]').val(),
      description: $(e.target).find('[name=description]').val(),
      price: $(e.target).find('[name=price]').val(),
    }

    
    Meteor.call('post', post, function(error, id) {
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

  'change .btn-file': function(event, template) {
    console.log('uploading');
    FS.Utility.eachFile(event, function(file) {
      Images.insert(file, function (err, fileObj) {
        //Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
      });
    });
  }

});




