/*

const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  type: {
    type: String,
    default: 'personal'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('contact', ContactSchema);

*/
process.env.ORA_SDTZ = 'UTC';

const oracledb = require('oracledb');
const dbConfig = require('../config/dbconfig');

const find = async function(user) {
  let connection;

  var usercontacts = [], i;

  // console.log(user.email);

  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      "SELECT * FROM CKM_CONTACT where userid = '" + user.email + "' order by currdate asc",
      [],
      {
        resultSet: true
      }
    );
    
    const rs = result.resultSet;
    let row;
    i = 0;
    
    let nm, eml, phn, ty;
    
    while ((row = await rs.getRow())) {
     // console.log("getRow(): row " + i);

      nm = row[0];
      eml = row[1];
      phn = row[2];
      ty = row[3];

      usercontacts[i] = { name: nm, email: eml, phone: phn, type: ty };
      
      i++;
    
    }
    // always close the ResultSet
    await rs.close();
    
    // console.log(usercontacts);
    
         
      
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
          return usercontacts;
        }    

  
}

const savenewContact = async function(usercontact) {
  let connection;

  var usercontact1, i;

  // console.log(usercontact);

  oracledb.autoCommit = true;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      "insert into CKM_CONTACT(name, email, phone, type, currdate, userid) values('" + usercontact.name +"', '" + usercontact.email + "', '" + usercontact.phone + "', '" + usercontact.type + "', sysdate, '" +  usercontact.user + "')",
      [],
      {
        resultSet: true
      }
    );

    const result1 = await connection.execute(
      "select * from CKM_CONTACT where email = '" + usercontact.email + "'",
      [],
      {
        resultSet: true
      }
    );

    
    const rs = result1.resultSet;
    let row;
    i = 0;
    
    let nm, eml, phn, ty, dt, uid;
    
    while ((row = await rs.getRow())) {
      // console.log("getRow(): row " + i);

      nm = row[0];
      eml = row[1];
      phn = row[2];
      ty = row[3];
      dt = row[4];
      uid = row[5];

      usercontact1 = { name: nm, email: eml, phone: phn, type: ty, currdate: dt, userid: uid };
      
      i++;
    
    }
    // always close the ResultSet
    await rs.close();
    
    // console.log("User Contact 1 : " + usercontact1);
    
    
         
      
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
          return usercontact1;
        }    
  

}

const findById = async function(usercontact) {

  let connection;

  var usercontact1, i;

  // console.log(usercontact);

  oracledb.autoCommit = true;

  try{

     

  }catch (err) {
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
          return usercontact1;
        }    

}



module.exports = { find, savenewContact };

