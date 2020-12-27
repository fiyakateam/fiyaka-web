//Install express server
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;
const appdir = __dirname + '/dist/fiyaka-webapp';

// Serve only the static files form the dist directory
app.use(express.static(appdir));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(appdir + '/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(port, () => {
    console.log('Server is up on port ' + port);
});
