import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  } else {
    this.ready()
  }
});

Meteor.publish('users.admin', function () {
    if (! Roles.userIsInRole(this.userId, ['admin'])) {
        this.stop();
        return;
    }
    return [
        Meteor.users.find({}, {fields: {username:1, profile:1 }}),
        Meteor.roleAssignment.find({}),
    ];
});
