const express = require('express');
require('dotenv').config();
const rateLimit = require('express-rate-limit');
const ejs = require('ejs');
const path = require('path')
const cors = require('cors');
const session = require('express-session');
const db = require('./server/models/db');
const User = require('./server/models/Users');
const shortId = require('shortid');
const Url = require('./server/models/urlShorts');
const urlRoute = require('./server/routes/urlRoute');
const userRoute = require("./server/routes/userRoutes");
const profileRoute = require('./server/routes/profileRoute');
const utils = require('./server/utils/util');
const {validateUrl} = require('./server/utils/util');
const qr = require('qrcode');
const userController = require('./server/controller/userController');
const QRCode = require('./server/models/qrCode');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = express.Router();


const app = express();


//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('dev'));
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

app.use((req, res, next) =>{        //this is the middleware that allows the server to accept requests from other servers
    res.locals.session = req.session.message;
    delete req.session.message;
    next();
});
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



// Assuming you have a route that handles the /profile endpoint
app.get('/profile', async (req, res) => {
    try {
      // Fetch the data from the database
      const shortUrls = await Url.find();
      const qrCodeDataUrl = 'data:image/png;base64,iVBORw0KG...';
  
      // Render the profile template and pass the data
      res.render('profile', {title: 'Twigs - Profile', shortUrls,  qrCodeDataUrl });
    } catch (error) {
      // Handle any errors
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
});
app.get('/:urlId', async (req, res) => {
    try {
      const url = await Url.findOne({ urlId: req.params.urlId });
  
      if (url == null) {
        return res.status(404).json('Url not found');
      }
  
      url.clicks++;
      await url.save();
  
      res.redirect(url.origUrl);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Server error',
      });
    }
  });
  
  
  

app.get('/500', (req, res) =>{
    res.render('500')
})

app.get('/400', (req, res) =>{
    res.render('400')
})

app.get('/401', (req, res) =>{
    res.render('401')
})

app.post('/shortUrls', async(req, res) =>{
    console.log(req.body);
    const origUrl = req.body.origUrl;

    //valid url
    if(utils.validateUrl(origUrl)){
        try{
            const url = await Url.findOne({origUrl});
            if(url){
                res.status(200).json(url)
            } else{
                const urlId = shortId.generate();
                const shortUrl = `${urlId}`
                const url = new Url({
                    origUrl,
                    shortUrl,
                    urlId,
                    date: new Date()
                })
                await url.save()
                .then((url) =>{
                    console.log(url)
                    res.status(200).json(url)
                })
            }
        } catch(err){
            console.log(err)
            res.status(500).json('Server error')
        }
    }
})

//let generate qr code
app.post('/qrCode', async(req, res) =>{
    const shortUrl = req.body.shortUrl;
    console.log(shortUrl)

    if(shortUrl){
        try{
            const qrCodeDataUrl = await qr.toDataURL(shortUrl);
            console.log(qrCodeDataUrl)
            res.status(200).json(qrCodeDataUrl)

        } catch(err){
            console.log(err)
            res.status(500).json('Server error')
        }
    }

})


// app.post('/scan',async function generateQRCodeForURL(url) {
//     try {
//       const qrCodeDataUrl = await QRCode.toDataURL(shortURL);
//       return qrCodeDataUrl;
//     } catch (err) {
//       console.error('Error generating QR code:', err);
//       throw err;
//     }
// })

// const originalURL = 'https://example.com'; // Replace with the original URL

// app.get('/generateQRCodeForURL,(origUrl)', async (req, res) => {
//     try {
//         const qrCodeDataUrl = await generateQRCodeForURL(origUrl);
//         res.send(qrCodeDataUrl);
//     } catch (err) {
//         console.error('Error generating QR code:', err);
//         res.status(500).send('Internal Server Error');
//     }
// });




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