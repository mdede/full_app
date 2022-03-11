import './hello.html';
import { Meteor } from 'meteor/meteor';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.onRendered(function helloOnRendered() {


   $(function () {
          $('[data-bs-toggle="popover"]').popover()
          $('[data-bs-toggle="tooltip"]').tooltip()
        });
        return;
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
  gitCommitHash() {
    return Meteor.gitCommitHash;
  },
});

Template.hello.events({
  'click #clickme'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
