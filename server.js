const express = require('express');
const cors = require('cors')
const path = require('path');
const port = process.env.PORT || 3030;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./routes/api'));

// send the user to index html page inspite of the url
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});


app.listen(port, err => {
  console.log(err || `Server listening on port ${port}`);
});
