import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
// mongodb uri
const uri = process.env.mongoURI;

// making connection to the mongodb database
mongoose.connect(uri, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

  // creating a schema/modal for the data saving
  const userSchema = {
    name: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true }
  };
  
  // creating an instance for the schema here usersDatabase is a new table
  const userModal = mongoose.model('usersDatabase', userSchema);

  // POST 1 DATA posting data to the database of mongodb
  router.post('/', async (req, res) => {
    // getting user data from the request which is given by user in the body as json
    const newUser = req.body;

    // creating an object of the schema
    const newUserData = new userModal({
      name: newUser.name,
      email: newUser.email,
      gender: newUser.gender
    });

    // Postman body json example
    // {
    //     "name":"Ravi Sharma",
    //     "email":"ravi@gmail.com",
    //     "gender":"MALE"
    // }

    try {
      await newUserData.save();
      res.status(201).send(`User with name ${newUserData.name} has been added successfully.`);
    } catch (error) {
      res.status(500).send('Something failed.');
    }
  });

  // GET ALL users from mongoDB database
  router.get('/', async (req, res) => {
    try {
      const users = await userModal.find();
      res.send(users);
    } catch (error) {
      res.status(500).send('Something failed.');
    }
  });

  // GET ONE user data with the help of ID generated by mongoDB itself
  router.get('/:id', async (req, res) => {
    const userID = req.params.id;
    try {
      const user = await userModal.findById(userID);
      if (!user) return res.status(404).send('User not found.');
      res.send(user);
    } catch (ex) {
      res.status(500).send('Something failed.');
    }
  });

//   let users = [
//     {
//         "id":1,
//         "name":"Sunny Kumar",
//         "email":"mailsunny404+cloud@gmail.com",
//         "gender":"MALE"
//     }
// ];

//   router.get('/', (req, res)=>{
//     // res.send("Get all the users method");
//     // res.send(users);
//     res.status(200).send(users);
// });


// import Joi from 'joi';
// const schema = Joi.object({
//     id: Joi.number().integer().required(),
//     name: Joi.string().min(3).max(30).required(),
//     email: Joi.string().email().required(),
//     gender: Joi.string().required()
//   });
// router.post('/', (req, res)=>{
//     const newUser = req.body;
//     const { error } = schema.validate(newUser);
//     if (error) {
//          res.status(400).send(error.details[0].message);
//         return;
//     }
//     // If validation passes, add the user to the database
//      users.push(newUser);
//      res.status(201).send(`User with name ${newUser.name} has been added successfully.`);
// });

export default router;