import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import './menu.html';

Template.Menu.helpers({
    menuSelected(menu) {
      return String(FlowRouter.current().route.name) === String(menu)
        ? "pure-menu-selected":"";
    },
//    gitCommitHash() {
//      return Meteor.gitCommitHash;
//    },
  }

);

Template.Menu.events({
  'click .pure-menu-item'(e) {
    e.preventDefault();
    FlowRouter.go(e.target.id);
  }
});

