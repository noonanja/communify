  Template.postItemPostPage.helpers({
  dataEntries: function() {
  	console.log(this._id);
    return myFiles.find({'metadata.postId': this._id});
  },
  isImage: function() {
    return imageTypes[this.contentType] != null;
  },
  link: function() {
    return myFiles.baseURL + "/" + this.md5
  }, 
});