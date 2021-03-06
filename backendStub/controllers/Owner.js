'use strict';

var utils = require('../utils/writer.js');
var Owner = require('../service/OwnerService');

module.exports.addMenu = function addMenu (req, res, next) {
  var body = req.swagger.params['body'].value;
  Owner.addMenu(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.addMenuItem = function addMenuItem (req, res, next) {
  var menuID = req.swagger.params['menuID'].value;
  var body = req.swagger.params['body'].value;
  Owner.addMenuItem(menuID,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiUserOwnerDELETE = function apiUserOwnerDELETE (req, res, next) {
  Owner.apiUserOwnerDELETE()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiUserOwnerGET = function apiUserOwnerGET (req, res, next) {
  Owner.apiUserOwnerGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiUserOwnerPUT = function apiUserOwnerPUT (req, res, next) {
  var body = req.swagger.params['body'].value;
  Owner.apiUserOwnerPUT(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiUserOwnerPasswordPUT = function apiUserOwnerPasswordPUT (req, res, next) {
  var body = req.swagger.params['body'].value;
  Owner.apiUserOwnerPasswordPUT(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiUserOwnerRestaurantReviewGET = function apiUserOwnerRestaurantReviewGET (req, res, next) {
  Owner.apiUserOwnerRestaurantReviewGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiUserOwnerRestaurantReviewReviewIDPOST = function apiUserOwnerRestaurantReviewReviewIDPOST (req, res, next) {
  var reviewID = req.swagger.params['reviewID'].value;
  var body = req.swagger.params['body'].value;
  Owner.apiUserOwnerRestaurantReviewReviewIDPOST(reviewID,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiUserOwnerTagGET = function apiUserOwnerTagGET (req, res, next) {
  Owner.apiUserOwnerTagGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.configureRestaurant = function configureRestaurant (req, res, next) {
  var body = req.swagger.params['body'].value;
  Owner.configureRestaurant(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.createOwner = function createOwner (req, res, next) {
  var body = req.swagger.params['body'].value;
  Owner.createOwner(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteMenu = function deleteMenu (req, res, next) {
  var menuID = req.swagger.params['menuID'].value;
  Owner.deleteMenu(menuID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteMenuItem = function deleteMenuItem (req, res, next) {
  var menuID = req.swagger.params['menuID'].value;
  var menuItemID = req.swagger.params['menuItemID'].value;
  Owner.deleteMenuItem(menuID,menuItemID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.editMenu = function editMenu (req, res, next) {
  var menuID = req.swagger.params['menuID'].value;
  var body = req.swagger.params['body'].value;
  Owner.editMenu(menuID,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.editMenuItem = function editMenuItem (req, res, next) {
  var menuID = req.swagger.params['menuID'].value;
  var menuItemID = req.swagger.params['menuItemID'].value;
  var body = req.swagger.params['body'].value;
  Owner.editMenuItem(menuID,menuItemID,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.editRestaurant = function editRestaurant (req, res, next) {
  var body = req.swagger.params['body'].value;
  Owner.editRestaurant(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getOwnMenus = function getOwnMenus (req, res, next) {
  Owner.getOwnMenus()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getRestaurant = function getRestaurant (req, res, next) {
  Owner.getRestaurant()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
