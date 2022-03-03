import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './login.html';

Template.App_login.events({
  'submit .login-form'(e) {
    e.preventDefault();

    const target = e.target;

    const username = target.username.value;
    const password = target.password.value;

    Meteor.loginWithPassword(username, password, function(err) {
        if(err) {
            alert(err);
        } else {
            FlowRouter.go('App.home');
        }
    });
  }
});