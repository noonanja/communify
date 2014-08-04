// static data for all of the listing categories
var forSaleData = [ {
    title: 'Animals',
    count: 0,
    category: 'forSale'
}, {
    title: 'Bikes',
    count: 0,
    category: 'forSale'
}, {
    title: 'Books',
    count: 0,
    category: 'forSale'
}, {
    title: 'Clothes and Accesories',
    count: 0,
    category: 'forSale'
}, {
    title: 'Electronics',
    count: 0,
    category: 'forSale'
}, {
    title: 'Free',
    count: 0,
    category: 'forSale'
}, {
    title: 'Health and Beauty',
    count: 0,
    category: 'forSale'
}, {
    title: 'Household',
    count: 0,
    category: 'forSale'
}, {
    title: 'Kids Stuff',
    count: 0,
    category: 'forSale'
}, {
    title: 'Musical Instruments',
    count: 0,
    category: 'forSale'
}, {
    title: 'Sports/ Recreation',
    count: 0,
    category: 'forSale'
}, {
    title: 'Tickets',
    count: 0,
    category: 'forSale'
}, {
    title: 'Vehicles',
    count: 0,
    category: 'forSale'
}, {
    title: 'Wanted',
    count: 0,
    category: 'forSale'
}, {
    title: 'Yard Sale/ Moving Sale',
    count: 0,
    category: 'forSale'
} 
];

var housingData = [ {
    title: 'House Sales',
    count: 0,
    category: 'housing'
}, {
    title: 'Housing Wanted',
    count: 0,
    category: 'housing'
}, {
    title: 'More Housing Resources',
    count: 0,
    category: 'housing'
}, {
    title: 'Rentals',
    count: 0,
    category: 'housing'
}, {
    title: 'Rommates Wanted',
    count: 0,
    category: 'housing'
}, {
    title: 'Subleases',
    count: 0,
    category: 'housing'
}
];

var communityData = [ {
    title: 'Activities',
    count: 0,
    category: 'community'
}, {
    title: 'Events',
    count: 0,
    category: 'community'
}, {
    title: 'Groups',
    count: 0,
    category: 'community'
}, {
    title: 'Lost and Found',
    count: 0,
    category: 'community'
}, {
    title: 'Services (drop down?)',
    count: 0,
    category: 'community'
}, {
    title: 'Rides',
    count: 0,
    category: 'community'
}, {
    title: 'Volunteer Opportunites',
    count: 0,
    category: 'community'
}

];

var jobsData = [ {
    title: 'Human Research Subjects',
    count: 0,
    category: 'jobs'
}, {
    title: 'Needed',
    count: 0,
    category: 'jobs'
}, {
    title: 'Off-Campus Student',
    count: 0,
    category: 'jobs'
}, {
    title: 'Employment',
    count: 0,
    category: 'jobs'
}, {
    title: 'On-Campus Student',
    count: 0,
    category: 'jobs'
}, {
    title: 'Employment',
    count: 0,
    category: 'jobs'
}, {
    title: 'Paid Research',
    count: 0,
    category: 'jobs'
}, {
    title: 'Opportunites',
    count: 0,
    category: 'jobs'
} 
];

if (Listings.find().count() === 0) {
    for (i in forSaleData) {
        Listings.insert(forSaleData[i]);
    };
    for (i in housingData) {
        Listings.insert(housingData[i]);
    };
    for (i in jobsData) {
        Listings.insert(jobsData[i]);
    };
    for (i in communityData) {
        Listings.insert(communityData[i]);
    }
}
// ===============================================================
 
// if (Posts.find().count() === 0) {
  
//   var tomId = Meteor.users.insert({
//     profile: { name: 'Tom Coleman' }
//   });
//   for (var i = 0; i < 4; i++) {
//     var post = {
//       category: 'Animals',
//       authors: 'Jake Noonan',
//       title: 'Test post #' + i,
//       emails: 'noonanja@wharton.upenn.edu',
//       description: 'This is a description. Act quickly before this post is gone.',
//       price: null,
//       userId: tomId, 
//       // username: user.username, 
//       submitted: new Date().getTime(), 
//       flagged: false
//     }
//     Posts.insert(post);
//     // update the count for this category (Listing title)
//     var id = Listings.findOne({title: post.category})._id;
//     Listings.update(id, {$inc: {count: 1}});
//   };

//   for (var i = 0; i < 24; i++) {
//     var post = {
//       category: 'Subleases',
//       authors: 'Jake Noonan',
//       title: 'Test post #' + i,
//       emails: 'noonanja@wharton.upenn.edu',
//       description: 'This is a description. Act quickly before this post is gone.',
//       price: null,
//       userId: tomId, 
//       // username: user.username, 
//       submitted: new Date().getTime(), 
//       flagged: false
//     }
//     Posts.insert(post);
//     // update the count for this category (Listing title)
//     var id = Listings.findOne({title: post.category})._id;
//     Listings.update(id, {$inc: {count: 1}});
//   };

//   for (var i = 0; i < 11; i++) {
//     var post = {
//       category: 'Bikes',
//       authors: 'Jake Noonan',
//       title: 'Test post #' + i,
//       emails: 'noonanja@wharton.upenn.edu',
//       description: 'This is a description. Act quickly before this post is gone.',
//       price: null,
//       userId: tomId, 
//       // username: user.username, 
//       submitted: new Date().getTime(), 
//       flagged: false
//     }
//     var postId = Posts.insert(post);
//     // update the count for this category (Listing title)
//     var id = Listings.findOne({title: post.category})._id;
//     Listings.update(id, {$inc: {count: 1}});
//   };

//   for (var i = 0; i < 6; i++) {
//     var post = {
//       category: 'Events',
//       authors: 'Jake Noonan',
//       title: 'Test post #' + i,
//       emails: 'noonanja@wharton.upenn.edu',
//       description: 'This is a description. Act quickly before this post is gone.',
//       price: null,
//       userId: tomId, 
//       // username: user.username, 
//       submitted: new Date().getTime(), 
//       flagged: false
//     }
//     var postId = Posts.insert(post);
//     // update the count for this category (Listing title)
//     var id = Listings.findOne({title: post.category})._id;
//     Listings.update(id, {$inc: {count: 1}});
//   };

//   for (var i = 0; i < 102; i++) {
//     var post = {
//       category: 'Books',
//       authors: 'Jake Noonan',
//       title: 'Test post #' + i,
//       emails: 'noonanja@wharton.upenn.edu',
//       description: 'This is a description. Act quickly before this post is gone.',
//       price: null,
//       userId: tomId, 
//       // username: user.username, 
//       submitted: new Date().getTime(), 
//       flagged: false
//     }
//     var postId = Posts.insert(post);
//     // update the count for this category (Listing title)
//     var id = Listings.findOne({title: post.category})._id;
//     Listings.update(id, {$inc: {count: 1}});
//   };
// }
