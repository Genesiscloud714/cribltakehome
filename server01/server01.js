const port = 3001;

const express = require('express');
const cors = require('cors');
const apiArray = require('./apis/logapis.js');

// ============================================================================
// Express Routes and Statics
// ============================================================================
const app = express();
app.use(cors());                           // Enables pre-flighting for requests with methods other than GET/HEAD/POST (like DELETE)
app.use(express.json({limit: '10mb'}));             // for parsing application/json

// ============================================================================
// Middleware
// ============================================================================
const execApiHandler = (handler) =>
{
    return async(req, res, next) => {
        res.apiResult = await handler(req, res);
        next();
    }
};
function resolveApiResult(req, res, next)
{
    if (!res.apiResult) return next(new Error('Api Result is undefined'));

    res.json(res.apiResult);
}

function errorLoadAppRouter(err, req, res, next)
{
    console.error(err); // in prod don't use this or console.log because it is not async.
    const jsonError = {};
    jsonError['status'] = 'ERROR';
    jsonError['message'] = err;
    res.status(500);
    res.json(jsonError);
}
function errorResourceNotFound(req, res, next)
{
    res.status(404).send('Sorry, the requested resource was not found.');
}

// ============================================================================
// Routing
// ============================================================================
for (const jsonApi of apiArray) {
    const path = jsonApi['path'];
    const method = jsonApi['method'];
    const handler = jsonApi['handler'];
    const resolvedPath = ['/apis', path].join('/');

    if (method === 'GET')       app.get(resolvedPath, execApiHandler(handler), resolveApiResult);
}
app.use(errorLoadAppRouter);
app.use(errorResourceNotFound);

// ============================================================================
// Server Startup
// ============================================================================
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

module.exports = app;