import { Meteor } from 'meteor/meteor';
import { Log } from 'meteor/logging';

const oraConnectionJSON = JSON.parse(Assets.getText('OracleConnection.json'));

Meteor.startup(() => {
    Log.info("Connection info read: "+oraConnectionJSON.user+"@"+oraConnectionJSON.hostname);
});
