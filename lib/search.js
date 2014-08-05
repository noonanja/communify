// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "postsSearch".

if (Meteor.isClient) {
    Template.leaderboard.selected_name = function () {
        var player = Posts.findOne(Session.get("selected_player"));
        return player && player.name;
    };

    Template.player.selected = function () {
        return Session.equals("selected_player", this._id) ? "selected" : '';
    };

    Template.leaderboard.inputIsNotEmpty = function () {
        var searchValue = Session.get('searchVal');
        return searchValue && searchValue.length > 0;
    };

    Template.leaderboard.esOptions = function () {
        return {sort: {submitted: -1, title: 1}};
    }

    Template.leaderboard.showAutosuggest = function () {
        return Session.get('showAutosuggest');
    }

    Template.leaderboard.events({
        'keyup .search-input input': function (e) {
            Session.set('searchVal', $(e.target).val());
        },
        // 'click .inc' : function () {
        //     var player = Session.get('selected_player');

        //     if (!player) {
        //         return;
        //     }

        //     Posts.update(Session.get('selected_player'), { $inc: { score : 5 } });
        // },
        'click .show-autosuggest' : function (e) {
            Session.set('showAutosuggest', !Session.get('showAutosuggest'));

            e.preventDefault();
        }
    });

    Template.player.events({
        'click': function () {
            Router.go('postPage', {_id: this._id});
        }
    });
}

    // Searching
    Meteor.startup(function () {
        // on Client and Server
        EasySearch.createSearchIndex('postsSearch', {
            'collection'    : Posts,              // instanceof Meteor.Collection
            'field'         : ['title', 'description'],    // can also be an array of fields
            'limit'         : 10,                   // default: 10
            'use'           : 'mongo-db',
            'convertNumbers': true
        });
    });