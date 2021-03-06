const express      = require('express');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose     = require('mongoose');

const config = require('./config/config').get(process.env.NODE_ENV);

const { User } = require('./model/user');
const { Book } = require('./model/book');
const { auth } = require('./middleware/auth');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, {useNewUrlParser: true});

app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static('client/build'));

// GET //

app.get('/api/getBook', (req, res) => {

    let id = req.query.id;

    Book.findById(id, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc)
    })
})

app.get('/api/books', (req, res) => {

    let skip  = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    Book.find().skip(skip).sort({_id:order}).limit(limit).exec( (err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc)
    })

})

app.get('/api/getReviewer', (req, res) => {

    let id = req.query.id;

    User.findById(id, (err, doc) => {
        if (err) return res.status(400).send(err);

        res.json({
            name: doc.name,
            lastname: doc.lastname
        })
    })

})

app.get('/api/users', (req, res) => {

    User.find({}, (err, user) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(user);
    })

})

app.get('/api/user_posts', (req, res) => {

    Book.find({owner: req.query.user}).exec( (err, doc) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(doc);
    })

})

app.get('/api/logout', auth, (req, res) => {
    req.user.deleteToken(req.token, (err, user) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(user);
    });
})

app.get('/api/auth', auth, (req, res) => {
    res.json({
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname
    })
})

// POST // 

app.post('/api/book', (req, res) => {

    const book = new Book(req.body);

    book.save( (err, doc) => {
        if (err) return res.status(400).send(err);

        res.status(200).json({
            post:   true,
            bookId: doc._id
        })
    })
})

app.post('/api/register', (req, res) => {

    const user = new User(req.body);

    user.save( (err, doc) => {
        if (err) return res.json({success: false});

        res.status(200).json({
            success: true,
            user:    doc
        })
    })
})

app.post('/api/login', (req, res) => {
    User.findOne({'email': req.body.email}, (err, user) => {
        if (!user) return res.json({isAuth:false, message:'Auth failed, email not found'});

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({
                isAuth: false, 
                message: 'Wrong password'
            });

            user.generateToken( (err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie('auth', user.token).json({
                    isAuth: true, 
                    id: user._id,
                    email: user.email
                });
            });
        });
    })
})

// UPDATE //

app.post('/api/book_update', (req, res) => {

    Book.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, doc) => {
        if (err) return res.status(400).send(err);

        res.status(200).json({
            success: true,
            doc
        })
    })
})

// DELETE //

app.delete('/api/book_delete', (req, res) => {
    let id = req.query.id;

    Book.findByIdAndRemove(id, (err) => {
        if (err) return res.status(400).send(err);
        res.json(true);
    })
})

// SERVER //

if (process.env.NODE_ENV === 'production') {
    const path = require('path');

    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
    })
}

app.listen(config.PORT, () => {})