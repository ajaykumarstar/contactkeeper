
// Using a fixed Oracle time zone helps avoid machine and deployment differences
process.env.ORA_SDTZ = 'UTC';

const oracledb = require('oracledb');
const dbConfig = require('../config/dbconfig');

// const Connect = require('../config/connect');

/*
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('user', UserSchema);

*/

const findUser = async function(email1) {
  

   let connection;

   //
    // Query the data
    //

    sql = "SELECT * FROM CKM_USER where email = '" + email1.email + "'";

    binds = { };

    // For a complete list of options see the documentation.
    options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,   // query result format
     // resultSet: true
      // extendedMetaData: true,               // get extra metadata
      // prefetchRows:     100,                // internal buffer allocation size for tuning
      // fetchArraySize:   100                 // internal buffer allocation size for tuning
    };

    var user, i;

    try {
      // Get a non-pooled connection
      connection = await oracledb.getConnection(dbConfig);
  
     // console.log('Connection was successful!');

     /*

      result = await connection.execute(sql, binds, options);

   // console.log("Metadata: ");
   // console.dir(result.metaData, { depth: null });
   // console.log("Query results: ");
   // console.log(result.rows.count);
   console.log(email1.email);

   const rs = result.resultSet;
let row;
let i = 0;

while ((row = await rs.getRow())) {
  i++;
}
// always close the ResultSet
await rs.close();

*/

const result = await connection.execute(
  "SELECT * FROM CKM_USER where email = '" + email1.email + "'",
  [], // no bind variables
  {
    resultSet: true // return a ResultSet (default is false)
  }
);

const rs = result.resultSet;
let row;
i = 1;

let eml, password1;

while ((row = await rs.getRow())) {
  // console.log("getRow(): row " + i++);
  //console.log(row[0]);
  eml = row[1];
  password1 = row[3];

}
// always close the ResultSet
await rs.close();

   user = {email: eml, password: password1};

   // console.log(user);

     
  
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }

      if(i == 1)
      return null;
    else
      return user;
    } 
    
   
}

const findById = async function(email1) {
  
  let connection;

  sql = "SELECT * FROM CKM_USER where email = '" + email1 + "'";

  binds = { };

  // For a complete list of options see the documentation.
  options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT,  
  };

  var user, i;

  try {
    // Get a non-pooled connection
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      "SELECT * FROM CKM_USER where email = '" + email1 + "'",
      [], // no bind variables
      {
        resultSet: true // return a ResultSet (default is false)
      }
    );
    
    const rs = result.resultSet;
    let row;
    i = 1;
    
    let nm, eml, cdate;
    
    while ((row = await rs.getRow())) {
     // console.log("getRow(): row " + i++);
      //console.log(row[0]);
      nm = row[0];
      eml = row[1];
      cdate = row[2];
    
    }
    // always close the ResultSet
    await rs.close();
    
       user = {name: nm, email: eml, currdate: cdate};
    
      // console.log(user);
    
         
      
        } catch (err) {
          console.error(err);
        } finally {
          if (connection) {
            try {
              await connection.close();
            } catch (err) {
              console.error(err);
            }
          }
    
          if(i === 1)
          return null;
          else
          return user;
        } 

}

const savenewUser = async function(user) {
  let connection;

  var user1, i;

  // console.log(user);

  oracledb.autoCommit = true;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      "insert into CKM_USER(name, email, currdate, password) values('" + user.name +"', '" + user.email + "', sysdate, '" + user.password + "')",
      [],
      {
        resultSet: true
      }
    );

    const result1 = await connection.execute(
      "select * from CKM_USER where email = '" + user.email + "'",
      [],
      {
        resultSet: true
      }
    );

    
    const rs = result1.resultSet;
    let row;
    i = 0;
    
    let nm, eml, crdt, pswd;
    
    while ((row = await rs.getRow())) {
      // console.log("getRow(): row " + i);

      nm = row[0];
      eml = row[1];
      crdt = row[2];
      pswd = row[3];

      user1 = { name: nm, email: eml, currdate: crdt, password: pswd };
      
      i++;
    
    }
    // always close the ResultSet
    await rs.close();
    
    // console.log(user1);
    
    
         
      
        } catch (err) {
          console.error(err);
        } finally {
          if (connection) {
            try {
              await connection.close();
            } catch (err) {
              console.error(err);
            }
          }
    
          if(i === 0)
          return null;
        else
          return user1;
        }    
  

}

module.exports = { findUser, findById, savenewUser };
