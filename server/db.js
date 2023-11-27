const {Client} = require('pg');

const client = new Client({
    host : 'localhost',
    port : 5432,
    database : 'Organ_Donation',
    user : 'postgres',
    password : '1729',
});

client.connect((err) => {
    if(err){
        console.log('Connection error',err.stack);
    }
    else{
        console.log("Connected to database");
    }
});

module.exports = client;
