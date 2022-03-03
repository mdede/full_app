// All links-related publications
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Links } from '../links.js';

Meteor.publish('links.all', function () {
    if (! Roles.userIsInRole(this.userId, ['normal','manage'])) {
        this.stop();
        return;
    }
    return Links.find({}, {fields: {title: 1, url:1, lastUpdatedAt:1 }});
});
