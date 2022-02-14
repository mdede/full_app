//global helpers
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

const getUser = () => Meteor.user();
const isUserLogged = () => !!getUser();

Template.registerHelper(
    "isUserLogged",
    function () { return isUserLogged(); }
);

Template.registerHelper(
    "getUser",
    function () { return getUser(); }
);
