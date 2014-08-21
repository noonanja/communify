Messages = new Meteor.Collection('messages');

Meteor.methods({
  message: function(messageAttributes) {
    var user = Meteor.user();
    var post = Posts.findOne(messageAttributes.postId);
    
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to message");
      
    if (!messageAttributes.body)
      throw new Meteor.Error(422, 'Please write some content');
      
    if (!post)
      throw new Meteor.Error(422, 'You must message about a post');
    
    message = _.extend(_.pick(messageAttributes, 'postId', 'body'), {
      userId: user._id,
      author: user.emails[0].address,
      submitted: new Date().getTime()
    });
    
    // create the message, save the id
    message._id = Messages.insert(message);
    
    // now create a notification, informing the user that there's been a message
    createMessageNotification(message);
    
    return message._id;
  }
});