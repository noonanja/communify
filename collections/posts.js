Posts = new Meteor.Collection('posts');

Posts.allow({
  update: ownsDocument,
  remove: ownsDocument
});


// We want to make sure that users can only edit certain fields
Posts.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following fields:
    return (_.without(fieldNames, 'emails','authors',
              'description','price','title','category','parentCategory').length > 0);
  }
});

var escape = function(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

Posts.search = function(term, options) {
  var where = {title: {$regex: escape(term), $options: 'i'}};
  var where2 = {description: {$regex: escape(term), $options: 'i'}};
  // search the mongoDB with an OR clause
  return Posts.find({$or: [where, where2]}, options);
}

Meteor.methods({
  post: function(postAttributes) {
    var user = Meteor.user()
    
    // Assure the post has not been posted
    postWithSameID = Posts.findOne({_id: postAttributes._id}); 
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to post new listings");
    
    // ensure the post has a title
    if (!postAttributes.title)
      throw new Meteor.Error(422, 'Please name this listing');

      // ensure the post has a category
    if (!postAttributes.category)
      throw new Meteor.Error(422, 'Please choose a category for this listing');

    if (!postAttributes.authors)
      throw new Meteor.Error(422, 'Please give a name for this listing!');
    
     if (isNaN(postAttributes.price))
      throw new Meteor.Error(422, 'Please only use integers for pricing');

    // check that there are no previous posts with the same link
    if (postAttributes._id && postWithSameID) {
      throw new Meteor.Error(302, 
        'This link has already been posted', 
        postWithSameID._id);
    }
    // pick out the whitelisted keys
     var post = _.extend(_.pick(postAttributes, 'parentCategory', 'category', 'title', 
    	               'authors','emails','description','price'), {
      userId: user._id, 
      username: user.username, 
      submitted: new Date(), 
      flagged: false
    });
    
    var postId = Posts.insert(post);
    
    // update the count for this category (Listing title)
    var id = Listings.findOne({title: post.category})._id;
    Listings.update(id, {$inc: {count: 1}});
    
    return postId;
  },

  update: function(postAttributes) {
    var user = Meteor.user()
    
    // hopefully the user can edit a post if he's not logged in... but just in case
    if (!user)
      throw new Meteor.Error(401, "You need to login to edit this listing");
    
    // ensure the post has a title
    if (!postAttributes.title)
      throw new Meteor.Error(422, 'Please name this listing');

    //   // ensure the post has a category
    // if (!postAttributes.category)
    //   throw new Meteor.Error(422, 'Please choose a category for this listing');

    if (!postAttributes.authors)
      throw new Meteor.Error(422, 'Please give a name for this listing!');
    
    //  if (isNaN(postAttributes.price))
    //   throw new Meteor.Error(422, 'Please only use integers for pricing');
   
   Posts.update(postAttributes.currentPostId, {$set: postAttributes});
   return postAttributes.currentPostId;
  },

  remove: function(postAttributes) {
      var userId = Meteor.user()._id;
      
      if(userId != postAttributes.userId)
        throw new Meteor.Error(422, 'This is not your post!');
      // update the count for this category (Listing title)
      var id = Listings.findOne({title: postAttributes.category})._id;
      Listings.update(id, {$inc: {count: -1}});
      Posts.remove(postAttributes.currentPostId);
      return;
  }
});
