exports.handler = async function(event, context) {
    const { accessKey } = JSON.parse(event.body);
    const validAccessKeys = ['key1', 'key2', 'key3'];  // Replace with your actual access keys

    if (validAccessKeys.includes(accessKey)) {
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true }),
        };
    } else {
        return {
            statusCode: 401,
            body: JSON.stringify({ success: false, message: 'Unauthorized' }),
        };
    }
};
