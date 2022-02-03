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

    oracledb.getConnection(oraConnectionJSON)
        .then(conn => {
           Log.debug('got conenction');
           Log.debug(conn);
        })
        .then()
        .catch(err => {
           Log.error('Error connecting', err);
        });

    runExample();
});

async function runExample() {
  let connection;

  try {

    let sql, binds, options, result;

    connection = await oracledb.getConnection(oraConnectionJSON);

    //
    // Create a table
    //

    const stmts = [
      `DROP TABLE no_example`,

      `CREATE TABLE no_example (id NUMBER, data VARCHAR2(20))`
    ];

    for (const s of stmts) {
      try {
        await connection.execute(s);
      } catch (e) {
        if (e.errorNum != 942)
          Log.error(e);
      }
    }

    //
    // Insert three rows
    //

    sql = `INSERT INTO no_example VALUES (:1, :2)`;

    binds = [
      [101, "Alpha" ],
      [102, "Beta" ],
      [103, "Gamma" ]
    ];

    // For a complete list of options see the documentation.
    options = {
      autoCommit: true,
      // batchErrors: true,  // continue processing even if there are data errors
      bindDefs: [
        { type: oracledb.NUMBER },
        { type: oracledb.STRING, maxSize: 20 }
      ]
    };

    result = await connection.executeMany(sql, binds, options);

    Log.debug("Number of rows inserted:", result.rowsAffected);

    //
    // Query the data
    //

    sql = `SELECT * FROM no_example`;

    binds = {};

    // For a complete list of options see the documentation.
    options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,   // query result format
      // extendedMetaData: true,               // get extra metadata
      // prefetchRows:     100,                // internal buffer allocation size for tuning
      // fetchArraySize:   100                 // internal buffer allocation size for tuning
    };

    result = await connection.execute(sql, binds, options);

    Log.debug("Metadata: ");
    console.dir(result.metaData, { depth: null });
    Log.debug("Query results: ");
    console.dir(result.rows, { depth: null });

    //
    // Show the date.  The value of ORA_SDTZ affects the output
    //

    sql = `SELECT TO_CHAR(CURRENT_DATE, 'DD-Mon-YYYY HH24:MI') AS CD FROM DUAL`;
    result = await connection.execute(sql, binds, options);
    Log.debug("Current date query results: "+result.rows[0]['CD']);

  } catch (err) {
    Log.error(err);
  } finally {
    if (connection) {
      try {
        Log.debug("Closing connection");
        await connection.close();
      } catch (err) {
        Log.error(err);
      }
    }
  }
}
