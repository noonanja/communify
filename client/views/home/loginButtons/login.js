var isValidPassword = function(val, field) {
  if (val.length >= 6) {
    return true;
  } else {
    Session.set('displayMessage', 'Error &amp; Too short.')
    return false; 
  }
};

// trim helper
var trimInput = function(val) {
  return val.replace(/^\s*|\s*$/g, "");
};

Template.login.events({
  'submit #login-form' : function(e, t) {
    e.preventDefault();
      // retrieve the input field values
      var email = t.find('#login-email').value
      , password = t.find('#login-password').value;

        // Trim and validate your fields here.... 
        // email = trimInput(email);

        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        Meteor.loginWithPassword(email, password, function(err){
          if (err) {
          // The user might not have been found, or their passwword
          // could be incorrect. Inform the user that their
          // login attempt has failed.           
          Session.set('entryError', err.reason);
          }
          else {
            Session.set('entryError', undefined);
          }
        });
        return false; 
      }
    });

Meteor.autorun(function() {
    // Whenever this session variable changes, run this function.
    var message = Session.get('displayMessage');
    if (message) {
      var stringArray = message.split('&amp;');
      ui.notify(stringArray[0], stringArray[1])
        .effect('slide')
          .closable();

      Session.set('displayMessage', null);
    }
  });

Template.passwordRecovery.helpers({
  resetPassword : function(t) {
    return Session.get('resetPassword');
  }
});

if (Accounts._resetPasswordToken) {
  Session.set('resetPassword', Accounts._resetPasswordToken);
}

// Template.passwordRecovery.events({
//   'submit #recovery-form' : function(e, t) {
//     e.preventDefault()
//     var email = trimInput(t.find('#recovery-email').value)

//     if (isNotEmpty(email) && isEmail(email)) {
//       Session.set('loading', true);
//       Accounts.forgotPassword({email: email}, function(err){
//         if (err)
//           Session.set('displayMessage', 'Password Reset Error &amp; Doh')
//         else {
//           Session.set('displayMessage', 'Email Sent &amp; Please check your email.')
//         }
//         Session.set('loading', false);
//       });
//     }
//     return false; 
//   },

//   'submit #new-password' : function(e, t) {
//     e.preventDefault();
//     var pw = t.find('#new-password-password').value;
//     if (isNotEmpty(pw) && isValidPassword(pw)) {
//       Session.set('loading', true);
//       Accounts.resetPassword(Session.get('resetPassword'), pw, function(err){
//         if (err)
//           Session.set('displayMessage', 'Password Reset Error &amp; Sorry');
//         else {
//           Session.set('resetPassword', null);
//         }
//         Session.set('loading', false);
//       });
//     }
//     return false; 
//   }
// });

Template.userNav.events({
   'click #login-buttons-logout': function() {
    Meteor.logout();
  }
});

Template.nav.helpers({
  displayName : function () {
  var user = Meteor.user();
  if (!user)
    return '';
  if (user.profile && user.profile.name)
    return user.profile.name;
  if (user.username)
    return user.username;
  if (user.emails && user.emails[0] && user.emails[0].address)
    return user.emails[0].address;
  return '';
 }
});

Template.signInError.helpers({
   error: function() {
    return Session.get('entryError');
   }
});

Template.login.rendered = function() {
  $(function(){
          $(".showpassword").each(function(index,input) {
              var $input = $(input);
              $("<p class='opt'/>").append(
                  $("<input type='checkbox' class='showpasswordcheckbox' id='showPassword' />").click(function() {
                      var change = $(this).is(":checked") ? "text" : "password";
                      var rep = $("<input placeholder='Password' type='" + change + "' />")
                          .attr("id", $input.attr("id"))
                          .attr("name", $input.attr("name"))
                          .attr('class', $input.attr('class'))
                          .val($input.val())
                          .insertBefore($input);
                      $input.remove();
                      $input = rep;
                   })
              ).append($("<label for='showPassword'/>").text("Show password")).insertAfter($input.parent());
          });

          $('#showPassword').click(function(){
          if($("#showPassword").is(":checked")) {
            $('.icon-lock').addClass('icon-unlock');
            $('.icon-unlock').removeClass('icon-lock');    
          } else {
            $('.icon-unlock').addClass('icon-lock');
            $('.icon-lock').removeClass('icon-unlock');
          }
          });
      });
}