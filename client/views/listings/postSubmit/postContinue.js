Template.postContinue.events({
  'click .del-file': function(e, t) {
    return myFiles.remove({
      _id: this._id
    });
  },
  'click #submitPost': function(e, t) {
    Router.go('postPage', {_id: this._id});
  }
});

Template.gallery.helpers({ 
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
    // .trunc is defined in home.js
    return this.filename.trunc(w, true);
  }
});
