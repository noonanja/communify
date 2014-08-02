Template.postContinue.events({
  'click .del-file': function(e, t) {
    return myFiles.remove({
      _id: this._id
    });
  } 
});

Template.gallery.helpers({ 
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

