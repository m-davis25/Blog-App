const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/Users');
const bcrypt = require ('bcrypt');
const Post = require('./models/Post');
const jwt = require('jsonwebtoken');
const cookieParser = require ('cookie-parser');
const  multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');



const salt = bcrypt.genSaltSync(10);
const secret = 'fdsfdngnklfsdngoirngo';

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));



mongoose.connect('mongodb+srv://blogUser:EcmhakSudSX5QF7J@cluster0.mueekux.mongodb.net/')


app.post('/register', async (req, res) => {
    const {username, password} = req.body;
    try{
        const userDoc = await User.create({
            username, 
            password: bcrypt.hashSync(password,salt),
        })
        res.json(userDoc);
    } catch(e) {
        res.status(400).json(e)
    }
});


app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        jwt.sign({username, id:userDoc._id}, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id:userDoc._id,
                username,
            });
        });
    } else {
        res.status(400).json('wrong credentials')
    }
});

app.get('/profile', (req, res) => {
    res.json(req.cookies);
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    })
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
})

app.post('/posts', uploadMiddleware.single('file'), async (req, res) => {
    const {originalname, path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);

    const {token} = req.cookies;

    jwt.verify(token, secret, {}, async (err,info) => {
        if (err) throw err;
        const {title,summary,content} = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover:newPath,
            author:info.id,
        });
      res.json(postDoc);
    });
});

app.get('/posts', async(req, res) => {
    res.json(
        await Post.find()
            .populate('author',['username'])
            .sort({createdAt: -1})
            .limit(20)
    );
});

app.get('/posts/:id', async (req, res) => {
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.json(postDoc);
})

app.put('/posts', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file){
        const {originalname, path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }
    const {token}= req.cookies;
    jwt.verify(token, secret, {}, async (err,info) => {
        if (err) throw err;
        const {id, title,summary,content} = req.body;
        const postDoc = await Post.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if (!isAuthor) {
            return res.status(400).json('You are not the author');
        }

        await postDoc.updateOne({
            title, 
            summary, 
            content,
            cover: newPath ? newPath : postDoc.cover,
        });
        res.json(postDoc);
    });
})

app.listen(8000, () => {
    console.log(`Server is running on port 8000`)
});

