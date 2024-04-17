const express= require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors')
const jwt = require('jsonwebtoken')
const secret= 'jhiqdidjikjdijdncjbjdqhvidhdihdqihjqdhocdqhic'
const cookieParser = require('cookie-parser');

const app =express();
const mongoose=require('mongoose');
const User=require('./models/User');
const salt = bcrypt.genSaltSync(10);

app.use(express.json());
app.use(cors({credentials: true, origin: 'http//localhost:3000' }))
app.use(cookieParser());

mongoose.connect('mongodb+srv://fifkirne1:<2yBCc3ku7JaMg1PH>@cluster0.rzndzxl.mongodb.net/');

app.post ('/register', async (req ,res)=>{
    const {username ,passeword }= req.body; 
    try{
    const userDoc =  await User.create({ 
        username, 
        passeword: bcrypt.hashSync(passeword, salt), });
    res.json(userDoc);
    } catch(e){
        res.status(400).json(e);
    }
} );

app.post ('/login', async (req ,res)=>{
    const {username ,passeword }= req.body; 
    const userDoc= await User.find({username});
    const passok =  bcrypt.compareSync(passeword, userDoc.passeword);
    if(passok){
        //loged in
        jwt.sign({ username, id:userDoc._id}, secret , {} , (err , token )=>{
            if(err) throw err;
            res.cookie('token' , token).json({
                id:userDoc._id,
                username,
            });

        });

    }
    else{
        res.status(400).json("wrong credentials");
    }

} );

app.get('/profile' , (req , res )=>{
    const {token}= req.cookies;
    jwt.verify(token , secret , {} , (err , info) =>{
        if(err) throw err;
        res.json(info);
    });
});

app.post('/logout', (req ,res) => {
    res.cookie('token','').json('ok');

});


app.listen(4000,()=>{
    console.log('>>> Open http://127.0.0.1:%s/ in your browser.','4000'); 
});
