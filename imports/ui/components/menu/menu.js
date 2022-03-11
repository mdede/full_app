import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import './menu.html';

Template.Menu.helpers({
    menuSelected(menu) {
      return String(FlowRouter.current().route.name) === String(menu)
        ? "active":"";
    },
//    gitCommitHash() {
//      return Meteor.gitCommitHash;
//    },
  }

);

Template.Menu.events({
  'click .nav-link'(e) {
    e.preventDefault();
    FlowRouter.go(e.target.id);
    $('.navbar-collapse').collapse('hide');;
  }
});

