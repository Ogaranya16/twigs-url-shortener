const express = require('express');
require('dotenv').config();
const rateLimit = require('express-rate-limit');
const ejs = require('ejs');
const path = require('path')
const cors = require('cors');
const session = require('express-session');
const helmet = require('helmet');
const cookieSession = require('cookie-session');
const db = require('./server/models/db');
const User = require('./server/models/Users');
const Url = require('./server/models/urlShorts');
const urlRoute = require('./server/routes/urlRoute');
const userRoute = require("./server/routes/userRoutes");
const profileRoute = require('./server/routes/profileRoute');
const {validateUrl} = require('./server/utils/util');
const userController = require('./server/controller/userController');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = express.Router();


const app = express();


//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
const limiter = rateLimit({
    max : 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!' 
})
app.use('/api', limiter);

app.use(cors({
    origin: '*',
}))
app.use(session ({
    secret:"secret",
    saveUninitialized: true,
    resave: false
}))
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());


app.use((req, res, next) =>{        //this is the middleware that allows the server to accept requests from other servers
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept, Authorization');
    if (req.method ==='OPTIONS') {
        res.header('Access-Control-Allow-Method', 'PUT, POST, PATCH, DELETE');
        return res.status(200).json({})
    }
    next();
});

//custom 404 page
// app.use((req, res, next) =>{
//     res.status(404).send('Page not found!')
// })

//custom error handler
// app.use((req, res, next) =>{
//     res.status(500).send('Internal Server Error')
// })

app.get('/', (req, res) =>{
    res.render('index', {title: 'Twigs - Home'});
});

app.get('/users', (req, res) =>{
    res.render('users', {title: 'Twigs - Users'});
    
})

app.get('/login', (req, res) =>{
    const session = req.session  //this is the session that allows the user to stay logged in
    if(session.userName){
        res.redirect('/profile');
    }
    res.render('login', {title: 'Twigs - Url login'});
})

app.get('/shortUrls',async (req, res) =>{
    const shortUrls =  await Url.find();
    res.render('shortUrls', {title: 'Twigs - Url Shortener', shortUrls: shortUrls});
})

app.get('/profile', (req, res) =>{
    res.render('profile', {title: 'Twigs - Profile'});
})

app.get('/500', (req, res) =>{
    res.render('500')
})

app.get('/400', (req, res) =>{
    res.render('400')
})

app.get('/401', (req, res) =>{
    res.render('401')
})


//view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')))



const route = require('./server/routes/userRoutes');

//routes
app.use('/', route);  //this is the route for the home page
app.use('/users', userRoute)  //this is the route for the users page
app.use('/shortUrls', urlRoute)  //this is the route for the url page
app.use('/profile', profileRoute)  //this is the route for the profile page')

// //home page
// app.get('/', (req, res) =>{
//     res.render('index');
// });




const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`Server started on port ${PORT}`);
});