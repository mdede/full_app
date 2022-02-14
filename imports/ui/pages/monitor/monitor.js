import { Session } from 'meteor/session'
import './monitor.html';

Template.Monitor.onCreated(function () {
    // update time every 1 second
    setInterval(function () {
        const d = new Date;
        Session.set("time", String(d.getHours())+":"+String(d.getMinutes()).padStart(2, '0'));
    }, 1000);
});

Template.Monitor.helpers({
  time() {
    return Session.get("time");
    },
  mon() {
    return {
        A: 54,
        P: 46,
        AP: (46/54*100).toFixed(1)
        }
  },
});
