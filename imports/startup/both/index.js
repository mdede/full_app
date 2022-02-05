// Import modules used by both client and server through a single index entry point
// e.g. useraccounts configuration file.

import { Meteor } from 'meteor/meteor';
import { Log } from 'meteor/logging';

Log.info("Starting up the app. Meteor version "+Meteor.release);
Log.info("Starting Meteor.settings");
Log.info(Meteor.settings);
