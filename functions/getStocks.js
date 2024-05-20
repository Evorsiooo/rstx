const fs = require('fs').promises;
const path = require('path');

exports.handler = async function() {
    const filePath = path.join(__dirname, 'stocks.json');

    try {
        const data = await fs.readFile(filePath, 'utf8');
        const stocks = JSON.parse(data);
        return {
            statusCode: 200,
            body: JSON.stringify(stocks)
        };
    } catch (err) {
        if (err.code === 'ENOENT') {
            return {
                statusCode: 200,
                body: JSON.stringify([])
            };
        }
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to read stocks data' })
        };
    }
};
