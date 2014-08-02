  Template.postItemPostPage.helpers({
  dataEntries: function() {
  	console.log(this._id);
    return myFiles.find({'metadata.postId': this._id});
  } 
});