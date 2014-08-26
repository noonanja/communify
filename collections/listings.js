Listings = new Meteor.Collection('listings');

Listings.allow({
  insert: function () {
    return false;
  },
  update: ownsDocument
});






