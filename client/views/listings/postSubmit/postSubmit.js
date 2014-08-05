var $name;

Template.postSubmit.rendered= function() {
  $name = $(".categorySection").html();
};


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
  'submit form': function(e) {
    e.preventDefault();
    var post = {
      category: $("#subCategory").text(),
      title: $(e.target).find('[name=title]').val(),
      authors: $(e.target).find('[name=authors]').val(),
      emails: $(e.target).find('[name=emails]').val(),
      description: $(e.target).find('[name=description]').val(),
      price: $(e.target).find('[name=price]').val() 
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
  },

"click .option": function(e) {
  e.preventDefault();
  var htmlString =  e.target.text;
  var htmlString2;
  switch (e.target.id) {
    case "menu1":
        htmlString2 = $(".forSale").html();
        break;
    case "menu2":
        htmlString2 = $(".housing").html();
        break;
    case "menu3":
        htmlString2 = $(".community").html();
        break;
    case "menu4":
        htmlString2 = $(".jobs").html();
        break;
}
  var divv = document.createElement("button");
  divv.style.display = "inline";
  divv.style.padding = "20px 40px 20px 40px";
  divv.style.background = "rgb(230,230,230)";
  divv.style.border = "1px solid black";
  divv.style.fontSize = "15px";
  divv.innerHTML = htmlString2;
  var div = document.createElement("div");
  div.style.display = "inline";
  div.style.marginLeft = "25px";
  div.style.fontSize = "19px";
  div.innerHTML = "Sub-Category";
  var div2 = document.createElement("button"); 
  div2.style.display = "inline";
  div2.style.marginLeft = "5px";
  div2.style.padding = "20px 40px 20px 40px";
  div2.style.background = "white";
  div2.style.border = "1px solid rgb(230,230,230)";
  div2.style.fontSize = "15px";
  div2.innerHTML = htmlString;

  // To submit the post
  $(div2).attr("id","subCategory");

  $( ".div4" ).append(divv);
  $( ".div4" ).append(div);
  $( ".div4" ).append( div2);
  $( ".dropdown" ).css("background", "rgb(230,230,230)");
  $( ".dropdown:hover .dropdown-menu" ).css("display", "none");
  $( ".forSale" ).remove();
  $( ".housing" ).remove();
  $( ".community" ).remove();
  $( ".jobs" ).remove(); 
  divv.className += ' button';
},
"click .button": function(e) {
  e.preventDefault();
  console.log($name);
  $('.categorySection').html($name);
}


});
