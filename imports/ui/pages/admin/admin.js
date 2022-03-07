import './admin.html';
import { resetPassword } from '/imports/api/user_roles/methods.js';

Template.App_admin.onCreated(function () {
  this.autorun(() => {
      this.subscribe('users.admin');
  });
});

Template.App_admin.helpers({
  users() {
    return Meteor.users.find({}, { sort: { username: 1 } });
  },
});

Template.admin_user.helpers({
  roles: function (userId) {
    const roles = Roles.getRolesForUser(userId);
    if (!roles.length) {
      return '<none>';
    }
    return roles.join(', ');
  },
});


Template.admin_user.events({
  'click #reset_password' (e) {
        resetPassword.call({ _id: this._id },
         (err, res) => {
          if (err) {
            alert(err);
          } else {
            alert("Password for "+this.username+" is empty now. User was logged out.");
          }
        });
  },
});