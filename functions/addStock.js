const knex = require('knex')(require('../../knexfile').development);

exports.handler = async function(event) {
    const { ticker, companyName, description, logo, accessKey } = JSON.parse(event.body);

    if (accessKey !== 'key3') {
        return {
            statusCode: 403,
            body: JSON.stringify({ success: false, message: 'Unauthorized' })
        };
    }

    try {
        await knex('stocks').insert({ ticker, companyName, description, logo });
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true })
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, message: 'Failed to add stock' })
        };
    }
};
