const mysql = require('mysql2');

// Create connection
const connection = mysql.createConnection({
  host: 'localhost',      
  user: 'root',          
  password: '8905502534',            // your MySQL password, often empty in localhost
  database: 'freelancer_db' // the DB name you created
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err.message);
    return;
  }
  console.log('✅ Connected to MySQL database!');
});

module.exports = connection;
