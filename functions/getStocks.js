const knex = require('knex')(require('../../knexfile').development);

exports.handler = async function() {
    try {
        const stocks = await knex('stocks').select('*');
        return {
            statusCode: 200,
            body: JSON.stringify(stocks)
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to read stocks data' })
        };
    }
};
