Notifications = new Meteor.Collection('notifications');

Notifications.allow({
  update: ownsDocument
});

createMessageNotification = function(message) {
  var post = Posts.findOne(message.postId);
  if (message.userId !== post.userId) {
    Notifications.insert({
      userId: post.userId,
      postId: post._id,
      commentId: message._id,
      commenterName: message.author,
      read: false
    });
  }
};