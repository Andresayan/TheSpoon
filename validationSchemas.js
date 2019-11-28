const Joi = require('joi');
const schemas = {
    loginValidation: Joi.object().keys({
        username: Joi.string().regex(/^[a-zA-Z0-9]/).min(5),
        password: Joi.string().regex(/^[a-zA-Z0-9]/).min(5),
        isRestaurantOwner: Joi.boolean()
    }),
    registrationCustomerValidation: Joi.object().keys({
        username: Joi.string().regex(/^[a-zA-Z0-9]/).min(5),
        email: Joi.string().trim().email({minDomainAtoms: 2}).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]/).min(5).required(),
    }),
    registrationOwnerValidation: Joi.object().keys({
        username: Joi.string().regex(/^[a-zA-Z0-9]/).min(5),
        name: Joi.string().regex(/^[a-zA-Z]/).required(),
        surname: Joi.string().regex(/^[a-zA-Z]/).required(),
        email: Joi.string().trim().email({minDomainAtoms: 2}).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]/).min(5).required()
    }),
    addMenuValidation: Joi.object().keys({
        name: Joi.string().regex(/^[a-zA-Z0-9]/).required(),
        description: Joi.string().regex(/^[a-zA-Z0-9]/).required(),
        tags: Joi.array().items(Joi.string().regex(/^[a-zA-Z0-9]/))
    }),
    editMenuValidation: Joi.object().keys({
        name: Joi.string().regex(/^[a-zA-Z0-9]/).required(),
        description: Joi.string().regex(/^[a-zA-Z0-9]/).required(),
        tags: Joi.array().items(Joi.string().regex(/^[a-zA-Z0-9]/))
    })

    // define all the other schemas below

};
module.exports = schemas;