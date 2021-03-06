
const express = require('express');
const router = express();
router.use(express.json());

const Menu = require('../models/menu.js');
const MenuItem = require('../models/menuItem.js');
const TaggedItem = require('../models/taggedItem.js');
const TaggedMenu = require('../models/taggedMenu.js');
const Restaurant = require('../models/restaurants.js');
const Tag = require('../models/tag.js');
const ItemReview = require('../models/itemReview.js');
const MenuReview = require('../models/menuReview.js');
const OpeningHours = require('../models/openingHours.js');


router.get('/:menuID', async (req, res) => {
    try {
        let menuInfo = await Menu.findOne({
            where: {
                Menu_ID: req.params.menuID
            },
            include: [{
                model: Restaurant,
                include: [{
                    attributes: ['Day', 'OpenTime', 'CloseTime'],
                    model: OpeningHours
                }]
            }, {
                model: TaggedMenu,
                attributes: ['Tag'],
                include: [{
                    model: Tag,
                    as: 'Tags'
                }]
            },{
                model: MenuReview,
                attributes: ['ServiceRating', 'QualityRating']
            }]
        });
        if (menuInfo === null) {
            return res.status(404).send('Menu with given menuID not found.');
        }
        const menuTags = formatTags(menuInfo.TaggedMenus);
        let menuItems = await MenuItem.findAll({
            where: {
                Menu_ID: menuInfo.Menu_ID
            },
            include: [{
                model: TaggedItem,
                attributes: ['Tag'],
                include: [{
                    model: Tag,
                    as: 'Tags'
                }]
            }, {
                model: ItemReview,
                attributes: ['ItemRating']
            }]
        });

        menuItems =  await menuItems.map ( mi => {
            const tags= formatTags(mi.TaggedItems);
            return {
                menuItemID: mi.MI_ID,
                name: mi.Name,
                description: mi.Description,
                type: mi.Type,
                priceEuros: mi.Price,
                rating: mi.Rating,
                imageLink: mi.ImageLink,
                tags: tags
            }
        });
        const openingHours =  await menuInfo.Restaurant.OpeningHours.map( oh => {
            return {
                day: oh.Day,
                openTime: oh.OpenTime,
                closeTime: oh.CloseTime
            }
        });
        const result = {
            restaurant: {
                restaurantName: menuInfo.Restaurant.Name,
                address: menuInfo.Restaurant.Address,
                city: menuInfo.Restaurant.City,
                country: menuInfo.Restaurant.Country,
                latitude: menuInfo.Restaurant.Latitude,
                longitude: menuInfo.Restaurant.Longitude,
                openingHours: openingHours
            },
            menuName: menuInfo.Name,
            description: menuInfo.Description,
            tags: menuTags,
            menuRating: menuInfo.Rating,
            menuItems,
        };

        res.status(200).send(result);
    } catch (error){
        console.log(error);
        res.status(500).send('Internal server error.');
    }
});

router.get('/:menuID/menuItem/:menuItemID/review', async (req, res) => {
    try{
        let itemReviews = await ItemReview.findAll({
            attributes: ['Username', 'ItemRating', 'Content', 'Date'],
            where: {
                MI_ID: req.params.menuItemID
            }
        });
        if (itemReviews.length <= 0) {
            return res.status(404).send('Menu item not found.');
        }
        itemReviews = await itemReviews.map( async ir => {
            return {
                username: ir.Username,
                rating: ir.ItemRating,
                content: ir.Content,
                Date: ir.Date
            }
        });
        itemReviews = await Promise.all(itemReviews);
        res.status(200).send(itemReviews)
    } catch (error){
        res.status(500).send('Internal server error.');
    }
});


const formatTags = (arr) => {
    if (arr.length < 1){
        return null;
    } else {
        for (let i = 0; i < arr.length; i++) {
            arr[i] = {
                name: arr[i].Tags.Name,
                color: arr[i].Tags.Color
            }
        }
        return arr;
    }
};

module.exports = router;