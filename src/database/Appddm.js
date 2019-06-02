console.log('Starting Test...') 
const pg = require('pg');
const config = {
	user: 'vmuqvcwbukevgi',
    host: 'ec2-54-83-61-142.compute-1.amazonaws.com',
    database: 'dccntc4qkcldkt',
    password: 'a562a5181b5f9af532c2a0879f39a3aa54b92c4ee91988ad6a2fea4119a2f7ee',
    port: 5432,
	ssl: true};
	
const client = new pg.Client(config); // Set database connection parameters

console.log('Connecting to Database...') 
client.connect(); // Connect to Database
console.log('Connected to Database...') 

//invalid test
emailaddr = 'foobar@123' ;
pwd = '133';

//valid test
//emailaddr = 'mars@gmail.com' ;
//pwd = 'pass12345';

queryString = `select count(*) from public.users where email_address = '${emailaddr}' and password='${pwd}';`;

console.log('Querying Database...') 
const query = client.query(queryString, (err, res) => {
  console.log(err ? err.stack : res.rows[0].count) 
  client.end()
});
