import { Meteor } from 'meteor/meteor';
import { Log } from 'meteor/logging';
import { Links } from '/imports/api/links/links.js';
import oracledb from 'oracledb';


Meteor.startup(() => {
    if(Meteor.settings.snifferRun) {
        initPool();
    }
});

async function initPool() {
  const oraConnectionJSON = JSON.parse(Assets.getText('OracleConnection.json'));
  Log.info("Init oracledb at "+oraConnectionJSON.libDir+", connect to: "+oraConnectionJSON.user+"@"+oraConnectionJSON.connectString);
  try {
   oracledb.initOracleClient({libDir: oraConnectionJSON.libDir});
   await oracledb.createPool(oraConnectionJSON);
   Log.debug('got pool');
  } catch (err) {
           Log.error('Error pool');
           Log.error(err);
  } finally {
      Meteor.setInterval(()=>runExample (), Meteor.settings.snifferTimeout);
  }
}

async function runExample() {
  let sql, binds, options, result, connection;
  try {
    connection = await oracledb.getConnection(); //from the pool
    binds = {};
    // For a complete list of options see the documentation.
    options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,   // query result format
      // extendedMetaData: true,               // get extra metadata
      // prefetchRows:     100,                // internal buffer allocation size for tuning
      // fetchArraySize:   100                 // internal buffer allocation size for tuning
    };
    //
    // Show the date.  The value of ORA_SDTZ affects the output
    //
    sql = `SELECT TO_CHAR(SYSTIMESTAMP, 'YYYY-MM-DD HH24:MI:SS.FF') AS CD FROM DUAL`;
    result = await connection.execute(sql, binds, options);
//    Log.debug("Metadata: ");
//    Log.debug(result.metaData, { depth: null });
    Log.debug("Query results: ");
    Log.debug(result.rows, { depth: null });

    Links.update({url: "http://seznam.cz"}, {$set: {title: result.rows[0]['CD']}});

  } catch (err) {
    Log.error('Sniffer oracle: '+err.errorNum+": "+err.message);
  }
  finally {
    if (connection) {
      try {
        await connection.release();
      } catch (err) {
            Log.error('release Error: '+err.errorNum+": "+err.message);
      }
    }
  }
}
