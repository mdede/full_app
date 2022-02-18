import './home.html';

import '../../components/hello/hello.js';
import '../../components/info/info.js';

Template.App_home.helpers({
  connected() {
//    if (showConnectionIssue.get()) {
    if (true) {
      return Meteor.status().connected;
    }
    return true;
  },
});