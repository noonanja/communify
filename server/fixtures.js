// static data for all of the listing categories
var forSaleData = [ {
    title: 'Animals',
    titleURL: 'animals',
    count: 0,
    category: 'forSale'
}, {
    title: 'Bikes',
    titleURL: 'bikes',
    count: 0,
    category: 'forSale'
}, {
    title: 'Books',
    titleURL: 'books',
    count: 0,
    category: 'forSale'
}, {
    title: 'Clothes and Accesories',
    titleURL: 'clothes&accesories',
    count: 0,
    category: 'forSale'
}, {
    title: 'Electronics',
    titleURL: 'electronics',
    count: 0,
    category: 'forSale'
}, {
    title: 'Free',
    titleURL: 'free',
    count: 0,
    category: 'forSale'
}, {
    title: 'Health and Beauty',
    titleURL: 'health&beauty',
    count: 0,
    category: 'forSale'
}, {
    title: 'Household',
    titleURL: 'household',
    count: 0,
    category: 'forSale'
}, {
    title: 'Kids Stuff',
    titleURL: 'kidsStuff',
    count: 0,
    category: 'forSale'
}, {
    title: 'Musical Instruments',
    titleURL: 'musicalInstruments',
    count: 0,
    category: 'forSale'
}, {
    title: 'Sports/ Recreation',
    titleURL: 'sports-recreation',
    count: 0,
    category: 'forSale'
}, {
    title: 'Tickets',
    titleURL: 'tickets',
    count: 0,
    category: 'forSale'
}, {
    title: 'Vehicles',
    titleURL: 'vehicles',
    count: 0,
    category: 'forSale'
}, {
    title: 'Wanted',
    titleURL: 'wanted',
    count: 0,
    category: 'forSale'
}, {
    title: 'Yard Sale/ Moving Sale',
    titleURL: 'yard-movingSale',
    count: 0,
    category: 'forSale'
} 
];

var housingData = [ {
    title: 'House Sales',
    titleURL: 'houseSales',
    count: 0,
    category: 'housing'
}, {
    title: 'Housing Wanted',
    titleURL: 'housingWanted',
    count: 0,
    category: 'housing'
}, {
    title: 'More Housing Resources',
    titleURL: 'moreHousingResources',
    count: 0,
    category: 'housing'
}, {
    title: 'Rentals',
    titleURL: 'rentals',
    count: 0,
    category: 'housing'
}, {
    title: 'Rommates Wanted',
    titleURL: 'roommatesWanted',
    count: 0,
    category: 'housing'
}, {
    title: 'Subleases',
    titleURL: 'subleases',
    count: 0,
    category: 'housing'
}
];

var communityData = [ {
    title: 'Activities',
    titleURL: 'activities',
    count: 0,
    category: 'community'
}, {
    title: 'Events',
    titleURL: 'events',
    count: 0,
    category: 'community'
}, {
    title: 'Groups',
    titleURL: 'groups',
    count: 0,
    category: 'community'
}, {
    title: 'Lost and Found',
    titleURL: 'lost&found',
    count: 0,
    category: 'community'
}, {
    title: 'Services (drop down?)',
    titleURL: 'services',
    count: 0,
    category: 'community'
}, {
    title: 'Rides',
    titleURL: 'rides',
    count: 0,
    category: 'community'
}, {
    title: 'Volunteer Opportunites',
    titleURL: 'volunteerOpportunities',
    count: 0,
    category: 'community'
}

];

var jobsData = [ {
    title: 'Human Research Subjects',
    titleURL: 'humanResearchSubjects',
    count: 0,
    category: 'jobs'
}, {
    title: 'Needed',
    titleURL: 'needed',
    count: 0,
    category: 'jobs'
}, {
    title: 'Off-Campus Student',
    titleURL: 'off-campusStudent',
    count: 0,
    category: 'jobs'
}, {
    title: 'Employment',
    titleURL: 'employment',
    count: 0,
    category: 'jobs'
}, {
    title: 'On-Campus Student',
    titleURL: 'on-campusStudent',
    count: 0,
    category: 'jobs'
}, {
    title: 'Employment',
    titleURL: 'employment',
    count: 0,
    category: 'jobs'
}, {
    title: 'Paid Research',
    titleURL: 'paidResearch',
    count: 0,
    category: 'jobs'
}, {
    title: 'Opportunites',
    titleURL: 'opportunities',
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
