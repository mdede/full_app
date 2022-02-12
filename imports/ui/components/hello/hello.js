import './hello.html';
import { Meteor } from 'meteor/meteor';

const getUser = () => Meteor.user();
const isUserLogged = () => !!getUser();

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
//  gitCommitHash() {
//    return Meteor.gitCommitHash;
//  },
  isUserLogged() {
    return isUserLogged();
  },
    getUser() {
      return getUser();
    },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
  'click #logout'() {
    Meteor.logout();
  },
});
