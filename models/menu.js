const Sequelize = require('sequelize');
const db = require('../sequelizeSettings');

const MenuItem = require('./menuItem.js');
const Restaurant = require('./restaurants.js');
const TaggedMenu = require('./taggedMenu.js');
const MenuReview = require('./menuReview.js');


const Menu = db.define('Menu', {
        Menu_ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Restaurant_ID: {
            type: Sequelize.INTEGER
        },
        Name: {
            type: Sequelize.STRING
        },
        Description: {
            type: Sequelize.STRING
        },
        Rating: {
            type:  Sequelize.FLOAT
        },
        Quality: {
            type: Sequelize.FLOAT
        },
        Service: {
            type: Sequelize.FLOAT
        },
        AveragePrice: {
            type: Sequelize.FLOAT
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

Menu.hasMany(MenuItem, {
    foreignKey: 'Menu_ID'
});

MenuItem.belongsTo(Menu, {
    foreignKey: 'Menu_ID'
});

Menu.belongsTo(Restaurant, {
    foreignKey: 'Restaurant_ID'
});

Menu.hasMany(TaggedMenu, {
    foreignKey: 'Menu_ID'
});

Menu.hasMany(MenuReview, {
    foreignKey: 'Menu_ID'
});

MenuReview.belongsTo(Menu, {
    foreignKey: 'Menu_ID'
});



module.exports = Menu;