const fs = require('fs');
const apiArray = [];
module.exports = apiArray;

async function replyto_getLogs(req, res)
{
    //if (req.body.logFile === undefined) return res.status(400);
    //const logFile = req.body.logFile;
    // fs.readFile(`var/log/${logFile}/`, 'utf-8', function(err, logData){
    //     console.log(logData)
    // });
    return {message:'you hit server 02'};
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