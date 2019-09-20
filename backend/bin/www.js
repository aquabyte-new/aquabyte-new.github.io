'use strict';

const env = process.env.NODE_ENV || 'development';

const bodyParser = require('body-parser'),
      compression = require('compression'),
      cors = require('cors'),
      express = require('express'),
      sslRedirect = require('heroku-ssl-redirect'),
      _ = require('lodash'),
			morgan = require('morgan'),
      SparkPost = require('sparkpost'),
      http = require('http'),
      //envFile = require('node-env-file');

const sparkpost = new SparkPost(process.env.SPARKPOST_API_KEY);

const sendEmail = async (from, recipients, subject, html, attachments) => {
  let allRecipients = _.map(recipients, 'address').join(', ');

  console.log(`Sending an email: ${from} -> ${allRecipients}: ${subject}: ${html}`);

  let sparkpostData = {
    content: {
      from: from,
      subject: subject,
      html: '<html><body>' + html + '</body></html>'
    },
    recipients: recipients
  };

  if (attachments) {
    sparkpostData.content.attachments = attachments;
  }

  try {
    let data = await sparkpost.transmissions.send(sparkpostData);

    console.log('Sending email: ');
    console.log(data);
  } catch (err) {
    console.log('Error with email: ');
    console.log(err);

    throw new Error();
  }
};

// Create the Express app
const app = express();

// enable ssl redirect
app.use(sslRedirect());

// Compress all requests
app.use(compression());

let whitelist = [
  'http://localhost:3002',
  'http://localhost:9000',
  'https://www.aquabyte.ai',
  'https://www.aquabyte.no',
  'https://aquabyteai.github.io',
];

let corsOptions = {
  origin: function(origin, callback){
      let originIsWhitelisted = whitelist.indexOf(origin) !== -1;
      callback(null, originIsWhitelisted);
  },
  credentials: true
};

// Enable CORS
app.use(cors(corsOptions));

// Log requests
app.use(morgan(':date[web] -- :method :url -- :remote-addr -- :status :response-time ms', { stream: { write: (str) => console.log(str) } }));

// Parse the URL parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Load environment file if on development mode
// if(env === 'development') {
//   envFile('development.env');
// }

app.get('/.well-known/acme-challenge/ym6diIe5reUTO1-Nga4S7rdCSVZs7idQuTv6BM1Ffn4', (req, res) => res.send('ym6diIe5reUTO1-Nga4S7rdCSVZs7idQuTv6BM1Ffn4.46X4MJiKWQd06ToCey5HOyujOsUWdFoXUN3n8HWH8gc'));

app.post('/send_email', async (req, res, next) => {
  let cf_name = req.body.cf_name;
  let cf_email = req.body.cf_email;
  let cf_subject = req.body.cf_subject;
  let cf_message = req.body.cf_message;
  let cf_newsletter = req.body.cf_newsletter;

  let subject = 'New website message from ' + cf_name;
  let html = '<div>'
    + '<p>From: ' + cf_name
    + '</p><p>E-mail: ' + cf_email
    + '</p><p>Subject: ' + cf_subject
    + '</p><p>Message: ' + cf_message
    + '</p><p>Newsletter: ' + cf_newsletter
    + '</p>';

  let recipients = [ 
    { address: 'bizdev@aquabyte.ai' }
  ];

  await sendEmail('bizdev@aquabyte.ai', recipients, '[' + env + '] ' + subject, html, undefined);

  res.status(200).send('ok');
});

// Create the HTTP Server
const server = http.createServer(app);
server.listen(process.env.PORT);
console.log(`Aquabyte server listening on port ${(process.env.PORT)}`);
