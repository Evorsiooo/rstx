const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const { name, email, stock, quantity, accessKey } = JSON.parse(event.body);
    const validAccessKeys = ['key1', 'key2', 'key3'];  // needs to be the same as in login.js

    if (!validAccessKeys.includes(accessKey)) {
        return {
            statusCode: 401,
            body: JSON.stringify({ success: false, message: 'Unauthorized' }),
        };
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    const payload = {
        content: `**Name:** ${name}\n**Email:** ${email}\n**Stock:** ${stock}\n**Quantity:** ${quantity}`,
    };

    try {
        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, message: error.message }),
        };
    }
};
