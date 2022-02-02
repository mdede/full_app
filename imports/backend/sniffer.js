import { Meteor } from 'meteor/meteor';
import { Log } from 'meteor/logging';

let oraConnectionJSON = '';

Meteor.startup(() => {
    oraConnectionJSON = Assets.getText('OracleConnection.json');
    Log.info("Connection info read: "+oraConnectionJSON);
});
