PostPaging = new Meteor.Pagination('posts',{
    router: 'iron-router',
    routerTemplate: 'postsList',
    route: '/listings/:title',
    perPage: 4,
}) 