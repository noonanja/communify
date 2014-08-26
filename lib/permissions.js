// check that the userId specified owns the documents
ownsDocument = function(userId, doc) {
	return doc && doc.userId === userId;
};


currentUserCanEdit = function(item) {
  return canEdit(Meteor.user(), item);
};

canEdit = function(user, item, returnError){
	var user=(typeof user === 'undefined') ? Meteor.user() : user;

	if (!user || !item){
		return returnError ? "noRights" : false;
	} else if (isAdmin(user)) {
		return true;
	} else if (user._id!==item.userId) {
		return returnError ? "noRights" : false;
	} else {
		return true;
	}
};

isAdmin = function(user){
  user = (typeof user === 'undefined') ? Meteor.user() : user;
  return !!user && !!user.isAdmin;
};
