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

Template.postSubmit.events({
  'click #continue': function(e) {
    e.preventDefault();
    console.log($(e.target).find('[name=title]').val());
    var post = {
      // category: $(e.target).find('[name=category]').val(),
      // title: $(e.target).find('[name=title]').val(),
      // authors: $(e.target).find('[name=authors]').val(),
      // emails: $(e.target).find('[name=emails]').val(),
      // description: $(e.target).find('[name=description]').val(),
      // price: $(e.target).find('[name=price]').val() this need to be a number
      category: 'Animals',
      title: 'Roommate wanted',
      authors: 'Jake Noonan',
      emails: 'noonanja@wharton.upenn.edu',
      description: 'I want an animal for a Roommate!',
      price: null
    }

    
    Meteor.call('post', post, function(error, id) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
        
        if (error.error === 302)
          Router.go('postPage', {_id: error.details})
      } else {
        Router.go('postContinue', {_id: id});
      }
    });
  }
});