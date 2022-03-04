import { Meteor } from 'meteor/meteor';
import { Log } from 'meteor/logging';
import { Links } from '/imports/api/links/links.js';
import { SyncedCron } from 'meteor/littledata:synced-cron';
import oracledb from 'oracledb';
import { Mongo } from 'meteor/mongo';
import moment from 'moment';

Meteor.startup(() => {
    if(Meteor.settings.snifferSchedule) {
        initPool();
        SyncedCron.add({
            name: 'cleanup',
            schedule: parser => parser.text('every 1 hour'),
            job: () => cleanup(),
        });
        SyncedCron.start();
    }
});

function initPool() {
  const oraConnectionJSON = JSON.parse(Assets.getText('OracleConnection.json'));
  Log.info("Init oracledb at "+oraConnectionJSON.libDir+", connect to: "+oraConnectionJSON.user+"@"+oraConnectionJSON.connectString);
  try {
   oracledb.initOracleClient({libDir: oraConnectionJSON.libDir});
   oracledb.createPool(oraConnectionJSON);
   Log.debug('got pool');
  } catch (err) {
           Log.error('initPool error: '+err.errorNum+": "+err.message);;
  } finally {
          SyncedCron.add({
            name: 'query oracle',
            schedule: parser => parser.text(Meteor.settings.snifferSchedule, true),
            job: (intendedAt,entry_name) => runExample(intendedAt,entry_name),
          });
  }
}

async function runExample(intendedAt,entry_name) {
  let sql, binds, options, result, connection;
  try {
    connection = await oracledb.getConnection(); //from the pool
    binds = {};
    options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,   // query result format
    };
    sql = `SELECT TO_CHAR(SYSTIMESTAMP, 'YYYY-MM-DD HH24:MI:SS.FF') AS CD FROM DUAL`;
    result = await connection.execute(sql, binds, options);
//    Log.debug("Metadata: ");
//    Log.debug(result.metaData, { depth: null });
//    Log.debug("Query results: ");
//    Log.debug(result.rows, { depth: null });
    Links.update({url: "http://seznam.cz"}, {$set: {title: result.rows[0]['CD']}});
    SyncedCron._collection.update(
        {intendedAt: intendedAt, name: entry_name},
        {$set: {result: "Success, rows: "+result.rows.length, finishedAt: new Date()}},
        {multi: false}
    );
  } catch (err) {
    Log.error('Sniffer oracle: '+err.message);
    SyncedCron._collection.update(
        {intendedAt: intendedAt, name: entry_name},
        {$set: {result: "Error: "+String(err.message), finishedAt: new Date()}},
        {multi: false}
    );
  } finally {
    if (connection) {
      try {
        await connection.release();
      } catch (err) {
            Log.error('release Error: '+err.errorNum+": "+err.message);
      }
    }
  }
}

function cleanup() {
    Log.debug("Cleanup exec");
    return;
//    this is done automatically by config.collectionTTL
    const deletionDate = moment().subtract(24, 'hours');
    let cnt = SyncedCron._collection.remove({intendedAt: {$lt: deletionDate.toDate()}});
    return "Removed recs: "+String(cnt)+" cut off time "+deletionDate.format('YYYY-MM-DD HH:mm');
}