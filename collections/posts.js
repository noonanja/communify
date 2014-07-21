Posts = new Meteor.Collection('posts');

Posts.allow({
insert: function(userId, doc) {
    // only allow posting if you are logged in
return !! userId; }
});


Meteor.methods({
  post: function(postAttributes) {
    var user = Meteor.user()
      // , postWithSameLink = Posts.findOne({url: postAttributes.url});
      // check that there are no previous posts with the same link
    // if (postAttributes.url && postWithSameLink) {
    //   throw new Meteor.Error(302, 
    //     'This link has already been posted', 
    //     postWithSameLink._id);
    // }
    
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to post new listings");
    
    // ensure the post has a title
    if (!postAttributes.title)
      throw new Meteor.Error(422, 'Please name this listing');

      // ensure the post has a title
    if (!postAttributes.category)
      throw new Meteor.Error(422, 'Please choose a category for this listing');
   
    // pick out the whitelisted keys
     var post = _.extend(_.pick(postAttributes, 'category', 'title', 
    	               'authors','emails','description','price'), {
      userId: user._id, 
      username: user.username, 
      submitted: new Date().getTime(),
      commentsCount: 0,
    });
    
    var postId = Posts.insert(post);
    
    // update the count for this category (Listing title)
    Listings.update(post.category, {$inc: {count: 1}});

    return postId;
  }
});
