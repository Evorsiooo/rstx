const path = require('path');

module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: path.join(__dirname, 'data', 'stocks.db')
        },
        useNullAsDefault: true
    }
};
