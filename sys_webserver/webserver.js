const port = 8080;

const path = require('path');
const express = require('express');
const cors = require('cors');

const corsOption =
{
    origin: function (origin, callback) {
        console.log('origin: ', origin);
        if (['http://localhost:8080', 'http://localhost:3010'].indexOf(origin) !== -1 || !origin) { callback(null, true); }
        else { callback(new Error('Not allowed by CORS')); }
    },
};

// ============================================================================
// Express Routes and Statics
// ============================================================================
const app = express();
app.use(cors(corsOption));                          // Resolves cross-origin resource sharing
app.options('*', cors())                            // Enables pre-flighting for requests with methods other than GET/HEAD/POST (like DELETE)
app.use(express.json());                            // for parsing application/json

const pathToStatics = path.join(__dirname, './statics');
const pathToIndex = path.join(__dirname, './statics/index.html');

app.use(express.static(pathToStatics));              // Loads statics of current service
app.get('/', (req, res, next) => {                   // Serve on root
    res.sendFile(pathToIndex);
});
app.all('*', (req, res) => {
    try {
        res.redirect('/');
    } catch (error) {
        res.json({ success: false, message: 'Something went wrong' });
    }
});

// ============================================================================
// Server Startup
// ============================================================================
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});