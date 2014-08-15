Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound' // URL not found
});

listingPageController = RouteController.extend({
  template: 'listingPage',
  sort: {submitted: -1},
  limit: function() {return Session.get('limit')},
  findOptions: function() {
    return {sort: this.sort, title: this.params.title, limit: this.limit()}; 
  },
  waitOn: function() {
    return Meteor.subscribe("posts", this.findOptions());
  },
  data: function() {
    return Listings.findOne({title: this.params.title})
  }
});

PostsListController = RouteController.extend({
  increment: 5, 
  limit: function() { 
    return parseInt(this.params.postsLimit) || this.increment; 
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.limit()};
  },
  waitOn: function() {
    return Meteor.subscribe('posts', this.findOptions());
  },
  posts: function() {
    return Posts.find({}, this.findOptions());
  },
  data: function() {
    var hasMore = this.posts().count() === this.limit();
    return {
      posts: this.posts(),
      nextPath: hasMore ? this.nextPath() : null
    };
  }
});
SearchPostsListController = PostsListController.extend({
  term: function() {
    return this.params.term || '';
  },
  sort: {submitted: -1, _id: -1},
  waitOn: function() {
    if (this.term())
      return Meteor.subscribe('searchPosts', this.term(), this.findOptions());
  },
  posts: function() {
    return Posts.search(this.term(), this.findOptions());
  },
  nextPath: function() {
    return Router.routes.home.path({term: this.term(), postsLimit: this.limit() + this.increment})
  },
  data: function() {
    return _.extend(SearchPostsListController.__super__.data.call(this), {
      term: this.term()
    });
  }
});


Router.map(function() {

  this.route('home', {
    // check this out!!
    path: '/:term?/:postsLimit?',
    progress: {enabled: true},
    controller: SearchPostsListController
  });

  //  // more precise solution for Meteor search
  // this.route('leaderboard', {
  //   path: '/search/:term?/:postsLimit?',
  //   controller: SearchPostsListController
  // });
  
  
  this.route('listingPage', {
    path: '/listings/:title',
    layoutTemplate: 'layout',
    yieldTemplates: {
      // 'topBarListingPage': {to: 'topBar'},
      'footer': {to: 'footer'}
    },
    progress: {enabled: true},
    controller: listingPageController
  });


  this.route('postSubmit', {
    path: '/submit',
    layoutTemplate: 'layout',
    yieldTemplates: {
     'topBarListingPage': {to: 'topBar'},
      'footer': {to: 'footer'} 
    }
  });

  this.route('postContinue', {
    path: '/submit/continue/:_id',
    progress: {enabled: true},
    layoutTemplate: 'layout',
    yieldTemplates: {
      'footer': {to: 'footer'} 
    },
    waitOn: function() {
      Session.set('postId', this.params._id);
      return [
        Meteor.subscribe('singlemyData', this.params._id),
        Meteor.subscribe('singlePost', this.params._id)
      ];
    },
    data: function() { return Posts.findOne(this.params._id); }
  });


  this.route('postPage', {
    path: '/posts/:_id',
    layoutTemplate: 'layout',
     yieldTemplates: {
      'topBarListingPage': {to: 'topBar'},
      'footer': {to: 'footer'}
    },
    progress: {enabled: true},
    waitOn: function() {
      return [
       Meteor.subscribe('singlemyData', this.params._id),
       Meteor.subscribe('singlePost', this.params._id)
      ];
    },
    data: function() { return Posts.findOne(this.params._id); }
  });

  this.route('postEdit', {
    path: '/posts/:_id/edit',
    layoutTemplate: 'layout',
     yieldTemplates: {
      'topBarListingPage': {to: 'topBar'},
      'footer': {to: 'footer'}
    },
    progress: {enabled: true},
    waitOn: function() {
      return [
       Meteor.subscribe('listings'),
       Meteor.subscribe('singlemyData', this.params._id),
       Meteor.subscribe('singlePost', this.params._id)
      ];
    },
    data: function() { return Posts.findOne(this.params._id); }
  });

});


// animateContentOut = function(pause) {
//     return $('#content').removeClass("animated fadeIn");
// }

// Router.onAfterAction(animateContentOut);

// animateContentIn = function() {
//     return $('#content').addClass("animated fadeIn");
// }
// Router.onAfterAction(animateContentIn);
var requireLogin = function(pause) {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else {
      this.render('accessDenied');
    }
    pause();
  }
}
var canEditPost = function(pause) {
    if(!this.ready()) return;
    // Already subscribed to this post by route({waitOn: ...})
    var post = Posts.findOne(this.params._id);
    if(!currentUserCanEdit(post)){
      // throwError(i18n.t("Sorry, you cannot edit this post."));
      this.render('noRights');
      pause();
    }
  }


Router.onBeforeAction(requireLogin, {except: 'home'});
Router.onBeforeAction(canEditPost, {only: 'postEdit'});
Router.onBeforeAction('loading');
if (Meteor.isClient)
  Router.onBeforeAction(function() { clearErrors() });