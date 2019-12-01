const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());


//those are all the routes
const login = require('./routes/login.js');
const registrationCustomer = require('./routes/registrationCustomer.js');
const registrationOwner = require('./routes/registrationOwner.js');
const image = require('./routes/image-upload.js');
const searchByMenuItem = require('./routes/searchByMenuItem.js');
const manageMenuInformation = require('./routes/manageMenuInformation.js');
const searchMenu = require('./routes/searchMenu.js');
const getRestaurant = require('./routes/getRestaurant.js');

app.use('/api/user/login', login);
app.use('/api/user/customer/register', registrationCustomer);
app.use('/api/user/owner/register', registrationOwner);
app.use('/api/image',image);
app.use('/api/user/customer/menu/searchByMenuItem', searchByMenuItem);
app.use('/api/user/owner/restaurant/menu', manageMenuInformation);
app.use('/api/user/customer/menu/', searchMenu);
app.use('/api/user/owner/restaurant', getRestaurant);

app.use(bodyParser.json());


module.exports = app;


