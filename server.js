import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

// home page
app.get('/', (req, res)=>{
    res.send(`<h1>User page with mongoDB cloud database 😍 .</h1>`);
});

// custom routes
import router from './routes/users.routes.js';

const userRoute = router;

app.use('/users', userRoute);

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});