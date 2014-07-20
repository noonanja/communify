var forSaleData = [ {
    title: 'Animals',
    count: 0,
    category: 'forSale'
}, {
    title: 'Bikes',
    count: 0,
    category: 'forSale'
}, {
    title: 'Books and Textbooks',
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



if (Posts.find().count() === 0) {
    var now = new Date().getTime(); 
    Posts.insert({
        category: 'Animals',
        author: '50 Cent',
        title: 'Selling Iguana',
        date: now,
        price: 500,
        text: "I'm selling my mofo Iguanna boyz", 
        image: null, 
        flagged: false
    });
    Posts.insert({
        category: 'Events',
        author: 'Tom Coleman',
        title: 'MGMT101 textbook', 
        date: now,
        price: 200,
        text: "I'm selling my mofo textbook boyz",
        image: null,
        flagged: false

    });
    Posts.insert({
        category: 'Events',
        author: 'Steve Aoki',
        title: 'Yard Sale',
        date: now,
        price: null,
        text: "I'm selling my YARD SALE boyz",
        image: null,
        flagged: false
    }); 
    Posts.insert({
        category: 'Human Research Subjects',
        author: 'J Money',
        title: 'Yard Sale',
        date: now,
        price: null,
        text: "I'm selling my YARD SALE boyz",
        image: null,
        flagged: false
    }); 
    Posts.insert({
        category: 'Activities',
        author: 'Joe',
        title: 'Yard Sale',
        date: now,
        price: null,
        text: "I'm selling my YARD SALE boyz",
        image: null,
        flagged: false
    }); 
    Posts.insert({
        category: 'House Sales',
        author: 'The Maine',
        title: 'Yard Sale',
        date: now,
        price: null,
        text: "I'm selling my YARD SALE boyz",
        image: null,
        flagged: false
    }); 
    Posts.insert({
        category: 'Housing Wanted',
        author: 'Lebron',
        title: 'Yard Sale',
        date: now,
        price: null,
        text: "I'm selling my YARD SALE boyz",
        image: null,
        flagged: false
    }); 
    Posts.insert({
        category: 'Groups',
        author: 'Jeff',
        title: 'Yard Sale',
        date: now,
        price: null,
        text: "I'm selling my YARD SALE boyz",
        image: null,
        flagged: false
    }); 
    Posts.insert({
        category: 'Needed',
        author: 'Oprah',
        title: 'Yard Sale',
        date: now,
        price: null,
        text: "I'm selling my YARD SALE boyz",
        image: null,
        flagged: false
    }); 
    Posts.insert({
        category: 'Animals',
        author: 'Randy Johnson',
        title: 'Yard Sale',
        date: now,
        price: null,
        text: "I'm selling my YARD SALE boyz",
        image: null,
        flagged: false
    }); 
    Posts.insert({
        category: 'Animals',
        author: 'Tom',
        title: 'Yard Sale',
        date: now,
        price: null,
        text: "I'm selling my YARD SALE boyz",
        image: null,
        flagged: false
    }); 


}
