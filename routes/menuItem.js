const AWS_IMAGE_STORAGE = "https://the-spoon.s3.eu-central-1.amazonaws.com/";

const express = require('express');
const router = express();
router.use(express.json());

const Menu = require('../models/menu.js');
const Tag = require('../models/tag.js');
const MenuItem = require('../models/menuItem.js');
const TaggedItem = require('../models/taggedItem.js');
const TaggedMenu = require('../models/taggedMenu.js');


const auth = require('../middleware/authorizationMiddleware.js');
const isOwner = require('../middleware/checkIfOwnerMiddleware.js');
const findRestaurant = require('../middleware/findRestaurantOfOwnerMiddleware.js');

//Add a menuItem to a menu
router.post('/:menuID/menuItem', auth, isOwner, findRestaurant, async (req, res) => {
    console.log('in POST /api/user/owner/restaurant/menu/{menuID}/menuItem');
    const menuID = req.params.menuID;
    const menuItem = req.body;
    const imageLink = AWS_IMAGE_STORAGE + menuItem.imageID;

    //check if the tags of the menu exist in the database
    for (let tag of menuItem.tags) {
        const tagFound = await Tag.findAll({
            where: {
                Name: tag
            }
        });
        if (tagFound.length <= 0) return res.status(400).send('One or more tags are not valid');
    }

    //create the menuItem
    const menuItemCreated = await MenuItem.create({
        Menu_ID: menuID,
        Name: menuItem.name,
        Description: menuItem.description,
        Type: menuItem.type,
        Price: menuItem.priceEuros,
        ImageLink: imageLink
    });

    //for each menuItem created, associate it to the tags it has
    for (let tag of menuItem.tags) {
        await TaggedItem.create({
            MI_ID: menuItemCreated.dataValues.MI_ID,
            Tag: tag
        });
    }


    const menu = await Menu.findOne({
        attributes: ['Name', 'Description'],
        where: {
            Menu_ID: menuID
        }
        ,
        include: [{
            model: TaggedMenu,
            attributes: ['Tag']
        }
            , {
                model: MenuItem,
                attributes: ['Name', 'Description', 'Type', 'Price', 'ImageLink'],
                include: [{
                    model: TaggedItem
                    , attributes: ['Tag']
                    , include: [{model: Tag, as: 'Tags'}]
                }]
            }
        ]

    });

    console.log('sending 200');
    res.status(200).send(menu);


});

//Edit a menuItem
router.put('/:menuID/menuItem/:menuItemID', auth, isOwner, findRestaurant, async (req, res) => {
    console.log('In PUT /api/user/owner/restaurant/menu/{menuID}/menuItem/{menuItemID}');
    const menuID=req.params.menuID;
    const menuItemID=req.params.menuItemID;
    const menuItem=req.body;
    const imageLink=AWS_IMAGE_STORAGE + menuItem.imageID;

    console.log('body is ' + JSON.stringify(menuItem));


    const menuItemFound=await MenuItem.findOne({
        where: {
            MI_ID: menuItemID,
            Menu_ID: menuID
        }
    });

    if(menuItem==null){
        res.status('400').send('No such element');
    }

    //update menuItem
    await menuItemFound.update({
        Name: menuItem.name,
        Description: menuItem.description,
        Type: menuItem.type,
        Price: menuItem.priceEuros,
        ImageLink: imageLink
    });

    //update tags - delete previous and set new
    await TaggedItem.destroy({
        where: {
            MI_ID: menuItemID
        }
    });
    for (let tag of menuItem.tags) {
        await TaggedItem.create({
            MI_ID: menuItemID,
            Tag: tag
        });
    }


    const menu = await Menu.findOne({
        attributes: ['Name', 'Description'],
        where: {
            Menu_ID: menuID
        }
        ,
        include: [{
            model: TaggedMenu,
            attributes: ['Tag']
        }
            , {
                model: MenuItem,
                attributes: ['Name', 'Description', 'Type', 'Price', 'ImageLink'],
                include: [{
                    model: TaggedItem
                    , attributes: ['Tag']
                    , include: [{model: Tag, as: 'Tags'}]
                }]
            }
        ]

    });

    console.log('sending 200');
    res.status(200).send(menu);

});

//Delete a menuItem
router.delete('/:menuID/menuItem/:menuItemID', auth, isOwner, findRestaurant, async (req, res) => {
    console.log('In DELETE /api/user/owner/restaurant/menu/{menuID}/menuItem/{menuItemID} ');
    const menuID = req.params.menuID;
    const menuItemID = req.params.menuItemID;

    const menuItemFound = await MenuItem.findOne({
        where: {
            MI_ID: menuItemID,
            Menu_ID: menuID
        }
    });

    if (menuItemFound == null) {
        res.status(400).send('No such element');
    }

    await menuItemFound.destroy();
    res.status(200).send('deleted');
});

module.exports = router;