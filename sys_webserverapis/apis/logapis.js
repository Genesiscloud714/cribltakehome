const axios = require('axios');
const apiArray = [];
module.exports = apiArray;

async function replyto_getLogs(req, res)
{
    const serverName = req.query.serverName;    
    if (!['server01', 'server02'].includes(serverName)) return res.status(400).json({message: 'Invalid server name'});

    // routes to correct server
    let port = '';
    if (serverName == 'server01') port = '3001';
    if (serverName == 'server02') port = '3002';

    // forward request
    const url = req.url
    const response = await axios.get(`http://localhost:${port}${url}`);   
    const statusCode = response['status'];
    if (statusCode < 200 || statusCode > 299) return new Error('ERROR: The http request failed');
    const responseBody = response['data'];

    return responseBody;
}
apiArray.push(
    {
        method: 'GET',
        handler: replyto_getLogs,
        path: 'getLogs',
        options:
        {
            description: 'Reads a file and gets log data from it',
        }
    }
);