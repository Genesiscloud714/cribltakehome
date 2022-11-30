const fs = require('fs');
const readline = require('readline');

function getLogsEventsForServer(fileName, text, numOfMatches)
{
    const filePath = `../var/log/${fileName}`;
    console.log(filePath);
    if (!fs.existsSync(filePath)) throw new Error('ERROR: Could not retrieve logs from server 01');
    const fileContent = fs.readFileSync(filePath, {encoding:'utf8'});
    // KMP algorithim
    const textLength = text.length;
    let lps = new Array(textLength, 0);

    let prevLps = 0;
    let i = 0;
    while (i < textLength) //pattern
    {
        if (text[i] == text[prevLps])
        {
            lps[i] = prevLps;
            prevLps += 1;
            i += 1;
        }
        else if (prevLps == 0)
        {
            lps[i] = 0;
            i += 1;
        }
        else
        {
            prevLps = lps[prevLps - 1];
        }
    }
    // going through the file and returning match pattern
    let j = 0;
    let k = 0;
    let prevIdx = -1
    let currentLineText = '';
    let shouldAddLine = false;
    const arrMatchingLines = [];
    const fileLength = fileContent.length;
    const set = new Set();
    while (j < fileLength)
    {
        if (fileContent[j] == '\r' || fileContent[j] == '\n') 
        {
            if (j + 1 < fileLength && fileContent[j] == '\r' && fileContent[j + 1] == '\n') {
                set.add(j + 1);
            }
            else if (fileContent[j] == '\n') {
                set.add(j);
            }
            else if (fileContent[j] == '\r') {
                set.add(j);
            }
            if (shouldAddLine) {
                arrMatchingLines.push({ lineNumber: set.size, text: currentLineText});
            }
            currentLineText = '';
            shouldAddLine = false;
        }
        else if (prevIdx != j) 
        {
            currentLineText += fileContent[j];
            prevIdx = j;
        }

        if (fileContent[j] == text[k])
        {
            j = j + 1;
            k = k + 1;
        }
        else
        {
            if (k == 0)
            {
                j += 1;
            }
            else
            {
                k = lps[k - 1];
            }
        }
        if (k == textLength)
        {
            shouldAddLine = true;
            k = 0;
        }
    }
    return arrMatchingLines.slice(-1 * numOfMatches);
}
module.exports = { getLogsEventsForServer: getLogsEventsForServer }