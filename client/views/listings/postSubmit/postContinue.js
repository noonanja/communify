Template.postContinue.events({
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
  'click .del-file': function(e, t) {
    return myFiles.remove({
      _id: this._id
    });
  } 
});

Template.postContinue.helpers({ 
  dataEntries: function() {
    return myFiles.find();
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

