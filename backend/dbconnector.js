// Get an instance of mysql
let mysql = require('mysql2')

// Create a connection to the database
const pool = mysql.createPool({
    waitForConnections: true,
    connectionLimit   : 10,
    host              : 'ENTER THE HOST WEBSITE OF YOUR DATABASE',
    user              : 'ENTER THE USERNAME FOR YOUR DATABASE',
    password          : 'ENTER THE PASSWORD FOR YOUR DATABASE',
    database          : 'ENTER THE NAME OF YOUR DATABASE'
}).promise();

// Export it for use in our application
module.exports = pool;
