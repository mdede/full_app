import { Meteor } from 'meteor/meteor';
import { Log } from 'meteor/logging';
import { Links } from '/imports/api/links/links.js';
import oracledb from 'oracledb';

const oraConnectionJSON = JSON.parse(Assets.getText('OracleConnection.json'));

Meteor.startup(() => {
    Log.info("Connection info read: "+oraConnectionJSON.user+"@"+oraConnectionJSON.connectString);
//  try {
//    Log.info(oracledb);
    oracledb.initOracleClient({libDir: oraConnectionJSON.libDir});
//  } catch (err) {
//    Log.error('Whoops!');
//    Log.error(err);
//  }
    initPool();

//    runExample();
});

async function initPool() {
  try {
   await oracledb.createPool(oraConnectionJSON);
   Log.debug('got pool');
  } catch (err) {
           Log.error('Error pool');
           Log.error(err);
  }
//   await runExample();
  Meteor.setInterval(()=>runExample (), 3000);

}

async function runExample() {
  let sql, binds, options, result, connection;
  try {
    connection = await oracledb.getConnection(); //from the pool
  } catch (err) {
    Log.error('getConnection Error: ')
    Log.error(err);
  }
  try {
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
    Log.error("Select error: ");
    Log.error(err);
  }
  finally {
    if (connection) {
      try {
//        Log.debug("Releasing connection");
        await connection.release();
      } catch (err) {
        Log.error("releasing connection")
        Log.error(err);
      }
    }
  }
}
