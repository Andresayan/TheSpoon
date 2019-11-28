'use strict';


/**
 * Add an empty menu to a restaurant
 * Add a menu to a restaurant of a restaurant owner, which needs to be logged in. The menuItems are not meant to be added to the menu through this endpoint.
 *
 * body MenuWithoutItems Menu data
 * returns MenuID
 **/
exports.addMenu = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "menuID" : 2
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Add a menuItem to a menu
 * Add a menuItem to the menu with given menuID. Authentication required.
 *
 * menuID Integer ID of the menu
 * body MenuItemWithoutColors Menu data
 * returns Menu
 **/
exports.addMenuItem = function(menuID,body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "name" : "Emilio's menu of the day",
  "description" : "Our special menu of today",
  "tags" : [ {
    "name" : "Italian",
    "color" : "#FFBC8C"
  }, {
    "name" : "Mediterranean",
    "color" : "#FFBC8C"
  } ],
  "menuItems" : [ {
    "name" : "Spaghetti alla carbonara",
    "description" : "Fantastic italian dish made of spaghetti, pig cheek, eggs, black pepper, pecorino romano",
    "type" : "dish",
    "priceEuros" : 10,
    "tags" : [ {
      "name" : "Mediterranean",
      "color" : "#FFBC8C"
    }, {
      "name" : "Pasta",
      "color" : "#99C99B"
    }, {
      "name" : "Italian",
      "color" : "#FFBC8C"
    } ],
    "imageLink" : "www.cloudStorage.com/Carbonara"
  }, {
    "name" : "Polpette al sugo",
    "description" : "Meatballs with tomato sauce",
    "type" : "dish",
    "priceEuros" : 7,
    "tags" : [ {
      "name" : "Mediterranean",
      "color" : "#FFBC8C"
    }, {
      "name" : "Meat",
      "color" : "#FFBC8C"
    }, {
      "name" : "Italian",
      "color" : "#FFBC8C"
    } ],
    "imageLink" : "www.cloudStorage.com/Meatballs"
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Configure data of the restaurant
 * Save the data of the restaurant given by the owner. Authentication is needed.  One of the parameter to be passed is the imageID, this is the flow:  1. The restaurant owner is in the page in which he can input the restaurant data. He will upload the photo of the restaurant while he is writing all the fields of the form.  2. The uploading of the photo is done by sending the photo to the /api/image endpoint. While the restaurant owner is still writing the fields of the form, the message to that endpoint is sent and the imageID is received as a response.  3. When the restaurant owner finishes writing the fields of the form and click the send button, the photo was actually already been ent in the point 2 and he doesn't have to wait for the upload (if he was fast compiling the form and the upload isn't finished yet, at least he has to wait less because it was already started). The imageID received as a response by the /api/image endpoint will be sent to this endpoint with the data of the form in a json, because the backend needs it in order to associate the json to the previously uploaded photo.
 *
 * body Restaurant Restaurant data
 * returns RestaurantID
 **/
exports.configureRestaurant = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "restaurantID" : 54
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Creates restaurant owner
 * Creates a new restaurant owner profile. This endpoint is used only for restaurant owner registration.  The endpoint, if the registration succeeds, returns the username of the account as a confirmation.
 *
 * body Owner Restaurant owner that needs to register
 * returns UsernameAndToken
 **/
exports.createOwner = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "username" : "xXEmilioXx",
  "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjI5LCJpYXQiOjE1NjE5OTg2NjB9.SWYMJXTTM8pe6NQw1QwS-d8Btt6Isuzzk5JtH775uV0"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete a menu
 * Delete a menu of the restaurant. Authentication is required
 *
 * menuID Integer ID of the menu to be edited
 * no response value expected for this operation
 **/
exports.deleteMenu = function(menuID) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Delete a menuItem
 * Delete the menuItem with given menuItemID of the menu with given menuID. Authentication required.
 *
 * menuID Integer ID of the menu
 * menuItemID Integer ID of the menuItem
 * no response value expected for this operation
 **/
exports.deleteMenuItem = function(menuID,menuItemID) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Edit a menu's information (not its items)
 * Edit a given menu (but not its menuItems). To identify the menu, the menuID needs to be given. Authentication is required.
 *
 * menuID Integer ID of the menu to be edited
 * body MenuWithoutItems Data of the menu to be saved
 * returns MenuID
 **/
exports.editMenu = function(menuID,body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "menuID" : 2
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Edit a menuItem
 * Edit the menuItem with given menuItemID of the menu with given menuID. Authentication required.
 *
 * menuID Integer ID of the menu
 * menuItemID Integer ID of the menuItem
 * body MenuItemWithoutColors Data of the menuItem
 * returns Menu
 **/
exports.editMenuItem = function(menuID,menuItemID,body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "name" : "Emilio's menu of the day",
  "description" : "Our special menu of today",
  "tags" : [ {
    "name" : "Italian",
    "color" : "#FFBC8C"
  }, {
    "name" : "Mediterranean",
    "color" : "#FFBC8C"
  } ],
  "menuItems" : [ {
    "name" : "Spaghetti alla carbonara",
    "description" : "Fantastic italian dish made of spaghetti, pig cheek, eggs, black pepper, pecorino romano",
    "type" : "dish",
    "priceEuros" : 10,
    "tags" : [ {
      "name" : "Mediterranean",
      "color" : "#FFBC8C"
    }, {
      "name" : "Pasta",
      "color" : "#99C99B"
    }, {
      "name" : "Italian",
      "color" : "#FFBC8C"
    } ],
    "imageLink" : "www.cloudStorage.com/Carbonara"
  }, {
    "name" : "Polpette al sugo",
    "description" : "Meatballs with tomato sauce",
    "type" : "dish",
    "priceEuros" : 7,
    "tags" : [ {
      "name" : "Mediterranean",
      "color" : "#FFBC8C"
    }, {
      "name" : "Meat",
      "color" : "#FFBC8C"
    }, {
      "name" : "Italian",
      "color" : "#FFBC8C"
    } ],
    "imageLink" : "www.cloudStorage.com/Meatballs"
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Return all the menus of the restaurant
 * Return all the menus of the restaurant. Since authentication is required, the backend is able to get which restaurant is involved from the authentication token.
 *
 * returns List
 **/
exports.getOwnMenus = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "menuID" : 2,
  "name" : "Emilio's menu of the day",
  "description" : "Our special menu of today",
  "tags" : [ {
    "name" : "Italian",
    "color" : "#FFBC8C"
  }, {
    "name" : "Mediterranean",
    "color" : "#FFBC8C"
  } ],
  "menuItems" : [ {
    "name" : "Spaghetti alla carbonara",
    "description" : "Fantastic italian dish made of spaghetti, pig cheek, eggs, black pepper, pecorino romano",
    "type" : "dish",
    "priceEuros" : 10,
    "tags" : [ {
      "name" : "Mediterranean",
      "color" : "#FFBC8C"
    }, {
      "name" : "Pasta",
      "color" : "#99C99B"
    }, {
      "name" : "Italian",
      "color" : "#FFBC8C"
    } ],
    "imageLink" : "www.cloudStorage.com/Carbonara"
  }, {
    "name" : "Polpette al sugo",
    "description" : "Meatballs with tomato sauce",
    "type" : "dish",
    "priceEuros" : 7,
    "tags" : [ {
      "name" : "Mediterranean",
      "color" : "#FFBC8C"
    }, {
      "name" : "Meat",
      "color" : "#FFBC8C"
    }, {
      "name" : "Italian",
      "color" : "#FFBC8C"
    } ],
    "imageLink" : "www.cloudStorage.com/Meatballs"
  } ]
}, {
  "menuID" : 3,
  "name" : "Emilio's menu of the day",
  "description" : "Our special menu of today",
  "tags" : [ {
    "name" : "Italian",
    "color" : "#FFBC8C"
  }, {
    "name" : "Mediterranean",
    "color" : "#FFBC8C"
  } ],
  "menuItems" : [ {
    "name" : "Spaghetti alla carbonara",
    "description" : "Fantastic italian dish made of spaghetti, pig cheek, eggs, black pepper, pecorino romano",
    "type" : "dish",
    "priceEuros" : 10,
    "tags" : [ {
      "name" : "Mediterranean",
      "color" : "#FFBC8C"
    }, {
      "name" : "Pasta",
      "color" : "#99C99B"
    }, {
      "name" : "Italian",
      "color" : "#FFBC8C"
    } ],
    "imageLink" : "www.cloudStorage.com/Carbonara"
  }, {
    "name" : "Polpette al sugo",
    "description" : "Meatballs with tomato sauce",
    "type" : "dish",
    "priceEuros" : 7,
    "tags" : [ {
      "name" : "Mediterranean",
      "color" : "#FFBC8C"
    }, {
      "name" : "Meat",
      "color" : "#FFBC8C"
    }, {
      "name" : "Italian",
      "color" : "#FFBC8C"
    } ],
    "imageLink" : "www.cloudStorage.com/Meatballs"
  } ]
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get data of own restaurant
 * Get the data of the restaurant of authenticated owner, so that it can be showed in the 'Your Restaurant' page.
 *
 * returns RestaurantReceived
 **/
exports.getRestaurant = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "name" : "Emilio's Pizza",
  "address" : "Piazzale Susa",
  "city" : "Milan",
  "country" : "Italy",
  "imageLink" : "www.cloudStorage.com/Restaurant",
  "openingHours" : [ {
    "day" : "Monday",
    "openTime" : "12.00",
    "closeTime" : "15.00"
  }, {
    "day" : "Saturday",
    "openTime" : "19.00",
    "closeTime" : "23.59"
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}
