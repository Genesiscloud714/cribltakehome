const { getLogsEventsForServer } = require('../../shared_helpers/helpers_log.js')
const apiArray = [];
module.exports = apiArray;

async function replyto_getLogs(req, res)
{
    if (req.query.fileName === undefined) return {message: 'fileName is missing'};
    if (req.query.text === undefined) return {message: 'text is missing'};
    if (req.query.numOfMatches === undefined) return {message: 'numOfMatches is missing'};
    if (req.query.fileName.trim() == '') return {message: 'fileName is invalid'};
    if (req.query.text.trim() == '') return {message: 'text is invalid'};
    if (typeof req.query.numOfMatches == 'number') return {message: 'numOfMatches expected to be a number'};
    if (req.query.numOfMatches <= 0) return {message: 'Please provide numOfMatches with a value greater than 0'};

    const fileName = req.query.fileName;
    const text = req.query.text;
    const numOfMatches = req.query.numOfMatches;

    let logData = null;
    try {
        logData = getLogsEventsForServer(fileName, text, numOfMatches);
    } catch (err){
        return {statusCode: 400, message: err.message}
    }

    return {message:'Successfully retrieved log events', data: logData};
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