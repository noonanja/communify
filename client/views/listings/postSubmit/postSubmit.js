Template.postSubmit.helpers({
  forSale1: function() {
    return Listings.find({category: 'forSale'}, {limit: 8});
  },
  forSale2: function() {
    return Listings.find({category: 'forSale'}, {skip: 8});
  },
  jobs: function() {
    return Listings.find({category: 'jobs'}); 
  },
  housing: function() {
    return Listings.find({category: 'housing'}); 
  },
  community: function() {
    return Listings.find({category: 'community'}); 
  }
});
