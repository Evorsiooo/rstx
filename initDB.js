const knex = require('knex')(require('./knexfile').development);
const fs = require('fs');
const path = require('path');

// Ensure the data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

knex.schema.createTable('stocks', (table) => {
    table.increments('id').primary();
    table.string('ticker');
    table.string('companyName');
    table.string('description');
    table.string('logo');
}).then(() => {
    console.log('Stocks table created');
    process.exit(0);
}).catch((err) => {
    console.error('Error creating table:', err);
    process.exit(1);
});
