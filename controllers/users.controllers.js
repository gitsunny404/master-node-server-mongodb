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

export const createUser = async (req, res) => {
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
  };

  export const getAllUsers = async (req, res) => {
    try {
      const users = await userModal.find();
      res.send(users);
    } catch (error) {
      res.status(500).send('Something failed.');
    }
  };

  export const getUserByID = async (req, res) => {
    const userID = req.params.id;
    try {
      const user = await userModal.findById(userID);
      if (!user) return res.status(404).send('User not found.');
      res.send(user);
    } catch (ex) {
      res.status(500).send('Something failed.');
    }
  };

  export const deleteUserByID = async (req, res)=>{
    const userID = req.params.id;
    try {
        const user = await userModal.findByIdAndRemove(req.params.id);
        if (!user) return res.status(404).send('User not found.');
        res.send(`User with the user id ${userID} has been deleted successfully`);
      } catch (ex) {
        res.status(500).send('Something failed.');
      }
    };

    export const updateUserDataByID = async (req, res)=>{
        const userID = req.params.id;
        try {
            const user = await userModal.findByIdAndUpdate(userID, req.body, { new: true });
            if (!user) return res.status(404).send('User not found.');
            res.send(`User with the user id : ${userID} has been updated successfully...`);
          } catch (ex) {
            res.status(500).send('Something failed.');
          }
        };
