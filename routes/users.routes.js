import express from 'express';

const router = express.Router();

let users = [
    {
        "id":1,
        "name":"Sunny Kumar",
        "email":"mailsunny404+cloud@gmail.com",
        "gender":"MALE"
    }
];

router.get('/', (req, res)=>{
    // res.send("Get all the users method");
    // res.send(users);
    res.status(200).send(users);
});

import Joi from 'joi';
const schema = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    gender: Joi.string().required()
  });
router.post('/', (req, res)=>{
    const newUser = req.body;
    const { error } = schema.validate(newUser);
    if (error) {
         res.status(400).send(error.details[0].message);
        return;
    }
    // If validation passes, add the user to the database
     users.push(newUser);
     res.status(201).send(`User with name ${newUser.name} has been added successfully.`);
});

export default router;