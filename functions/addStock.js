const fs = require('fs').promises;
const path = require('path');

exports.handler = async function(event) {
    const { ticker, companyName, description, logo, accessKey } = JSON.parse(event.body);

    if (accessKey !== 'key3') {
        return {
            statusCode: 403,
            body: JSON.stringify({ success: false, message: 'Unauthorized' })
        };
    }

    const newStock = { ticker, companyName, description, logo };

    const filePath = path.join(__dirname, 'stocks.json');
    let stocks = [];

    try {
        const data = await fs.readFile(filePath, 'utf8');
        stocks = JSON.parse(data);
    } catch (err) {
        if (err.code !== 'ENOENT') throw err; // Ignore if the file doesn't exist
    }

    stocks.push(newStock);

    await fs.writeFile(filePath, JSON.stringify(stocks, null, 2));

    return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
    };
};
