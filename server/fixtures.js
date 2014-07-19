var forSaleData = [ {
    title: 'Animals',
    count: 0,
}, {
    title: 'Bikes',
    count: 0,
}, {
    title: 'Books and Textbooks',
    count: 0,
}, {
    title: 'Clothes and Accesories',
    count: 0,
}, {
    title: 'Electronics',
    count: 0,
}, {
    title: 'Free',
    count: 0,
}, {
    title: 'Health and Beauty',
    count: 0,
}, {
    title: 'Household',
    count: 0,
}, {
    title: 'Kids Stuff',
    count: 0,
}, {
    title: 'Musical Instruments',
    count: 0,
}, {
    title: 'Sports/ Recreation',
    count: 0,
}, {
    title: 'Tickets',
    count: 0,
}, {
    title: 'Vehicles',
    count: 0,
}, {
    title: 'Wanted',
    count: 0,
}, {
    title: 'Yard Sale/ Moving Sale',
    count: 0,
} 
];

var housingData = [ {
    title: 'House Sales',
    count: 0,
}, {
    title: 'Housing Wanted',
    count: 0,
}, {
    title: 'More Housing Resources',
    count: 0,
}, {
    title: 'Rentals',
    count: 0,
}, {
    title: 'Rommates Wanted',
    count: 0,
}, {
    title: 'Subleases',
    count: 0,
}
];

var communityData = [ {
    title: 'Activities',
    count: 0,
}, {
    title: 'Events',
    count: 0,
}, {
    title: 'Groups',
    count: 0,
}, {
    title: 'Lost and Found',
    count: 0,
}, {
    title: 'Services (drop down?)',
    count: 0,
}, {
    title: 'Rides',
    count: 0,
}, {
    title: 'Volunteer Opportunites',
    count: 0,
}

];

var jobsData = [ {
    title: 'Human Research Subjects',
    count: 0,
}, {
    title: 'Needed',
    count: 0,
}, {
    title: 'Off-Campus Student',
    count: 0,
}, {
    title: 'Employment',
    count: 0,
}, {
    title: 'On-Campus Student',
    count: 0,
}, {
    title: 'Employment',
    count: 0,
}, {
    title: 'Paid Research',
    count: 0,
}, {
    title: 'Opportunites',
    count: 0,
} 
];

for (i in forSaleData) {
    ForSale.insert(forSaleData[i]);
};
for (i in housingData) {
    Housing.insert(housingData[i]);
};
for (i in jobsData) {
    Jobs.insert(jobsData[i]);
};
for (i in communityData) {
    Community.insert(communityData[i]);
}