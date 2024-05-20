const fetch = require('node-fetch');
const knex = require('knex')(require('../../knexfile').development);

exports.handler = async function(event) {
    const { name, robloxUsername, discordUsername, stock, quantity, accessKey } = JSON.parse(event.body);

    // Validate access key and input data
    if (!validateAccessKey(accessKey) || !name || !robloxUsername || !discordUsername || !stock || !quantity) {
        return {
            statusCode: 400,
            body: JSON.stringify({ success: false, message: 'Invalid input' })
        };
    }

    // Send the stock purchase data to the Discord webhook
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            content: `New stock purchase:\nName: ${name}\nRoblox Username: ${robloxUsername}\nDiscord Username: ${discordUsername}\nStock: ${stock}\nQuantity: ${quantity}`
        })
    });

    return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
    };
};

function validateAccessKey(key) {
    const validKeys = ['key1', 'key2', 'key3']; // Add more keys as needed
    return validKeys.includes(key);
}
