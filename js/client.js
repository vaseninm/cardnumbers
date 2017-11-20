/* global TrelloPowerUp */

// we can access Bluebird Promises as follows
var Promise = TrelloPowerUp.Promise;

/*

 Trello Data Access

 The following methods show all allowed fields, you only need to include those you want.
 They all return promises that resolve to an object with the requested fields.

 Get information about the current board
 t.board('id', 'name', 'url', 'shortLink', 'members')

 Get information about the current list (only available when a specific list is in context)
 So for example available inside 'attachment-sections' or 'card-badges' but not 'show-settings' or 'board-buttons'
 t.list('id', 'name', 'cards')

 Get information about all open lists on the current board
 t.lists('id', 'name', 'cards')

 Get information about the current card (only available when a specific card is in context)
 So for example available inside 'attachment-sections' or 'card-badges' but not 'show-settings' or 'board-buttons'
 t.card('id', 'name', 'desc', 'due', 'closed', 'cover', 'attachments', 'members', 'labels', 'url', 'shortLink', 'idList')

 Get information about all open cards on the current board
 t.cards('id', 'name', 'desc', 'due', 'closed', 'cover', 'attachments', 'members', 'labels', 'url', 'shortLink', 'idList')

 Get information about the current active Trello member
 t.member('id', 'fullName', 'username')

 For access to the rest of Trello's data, you'll need to use the RESTful API. This will require you to ask the
 user to authorize your Power-Up to access Trello on their behalf. We've included an example of how to
 do this in the `🔑 Authorization Capabilities 🗝` section at the bottom.

 */

/*

 Storing/Retrieving Your Own Data

 Your Power-Up is afforded 4096 chars of space per scope/visibility
 The following methods return Promises.

 Storing data follows the format: t.set('scope', 'visibility', 'key', 'value')
 With the scopes, you can only store data at the 'card' scope when a card is in scope
 So for example in the context of 'card-badges' or 'attachment-sections', but not 'board-badges' or 'show-settings'
 Also keep in mind storing at the 'organization' scope will only work if the active user is a member of the team

 Information that is private to the current user, such as tokens should be stored using 'private' at the 'member' scope

 t.set('organization', 'private', 'key', 'value');
 t.set('board', 'private', 'key', 'value');
 t.set('card', 'private', 'key', 'value');
 t.set('member', 'private', 'key', 'value');

 Information that should be available to all users of the Power-Up should be stored as 'shared'

 t.set('organization', 'shared', 'key', 'value');
 t.set('board', 'shared', 'key', 'value');
 t.set('card', 'shared', 'key', 'value');
 t.set('member', 'shared', 'key', 'value');

 If you want to set multiple keys at once you can do that like so

 t.set('board', 'shared', { key: value, extra: extraValue });

 Reading back your data is as simple as

 t.get('organization', 'shared', 'key');

 Or want all in scope data at once?

 t.getAll();

 */

var GLITCH_ICON = './images/glitch.svg';
var WHITE_ICON = './images/icon-white.svg';
var GRAY_ICON = './images/icon-gray.svg';

var randomBadgeColor = function () {
    return ['green', 'yellow', 'red', 'none'][Math.floor(Math.random() * 4)];
};

var getBadges = function (t) {
    return t.card('idShort')
        .get('idShort')
        .then(function (id) {
            return [{
                title: 'Номер карты', // for detail badges only
                text: '№' + id,
                color: 'green',
                icon: GRAY_ICON // for card front badges only
            }];
        });
};


TrelloPowerUp.initialize({
    'card-badges': function (t, options) {
        return getBadges(t);
    },
    'card-detail-badges': function (t, options) {
        return getBadges(t);
    }
});

console.log('Loaded by: ' + document.referrer);