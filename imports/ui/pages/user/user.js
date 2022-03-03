import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Roles } from 'meteor/alanning:roles';
import { $ } from 'meteor/jquery';
import './user.html';

Template.App_user.onCreated(function () {
  this.pwd12 = new ReactiveVar(' ');
});

Template.App_user.helpers({
  pwd12: function () {
    return Template.instance().pwd12.get();
  },
  enable_pwd_button: function () {
    return Template.instance().pwd12.get() ? "pure-button-disabled": "";
  },
  roles: function () {
    let roles = Roles.getRolesForUser(Meteor.userId());
    if (!roles.length) {
      return '<none>';
    }
    return roles.join(', ');
  },
});

Template.App_user.events({
  'click #logout' (e) {
    e.preventDefault();
    e.stopPropagation();
    Meteor.logout();
    FlowRouter.go("App.home");
  },
  'keyup input[type="password"]' (e, instance) {
        const pwd1 = $('input[name="password1"]')[0].value;
        const pwd2 = $('input[name="password2"]')[0].value;
        instance.pwd12.set(pwd1.length>0 && pwd1 === pwd2 ? "" : "New passwords do not match.");
  },
  'submit .password-form' (e, instance) {
    e.preventDefault();
    const target = e.target;
    const pwd  = target.password .value;
    const pwd1 = target.password1.value;
    const pwd2 = target.password2.value;
    Accounts.changePassword(pwd, pwd1, function(err) {
        if(err) {
            alert(err);
        }  else {
            $('input[type="password"]').val('');
            instance.pwd12.set("New password saved.");
        }
    });
  },
});