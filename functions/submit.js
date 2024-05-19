const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const { data, accessKey } = JSON.parse(event.body);
    const validAccessKeys = ['key1', 'key2', 'key3'];  // make sure they matchs the keys in login.js

    if (!validAccessKeys.includes(accessKey)) {
        return {
            statusCode: 401,
            body: JSON.stringify({ success: false, message: 'Unauthorized' }),
        };
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    try {
        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: data }),
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
