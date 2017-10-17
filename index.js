// import module
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// import Model
const User = require('./src/User');

// config app
// app.set('views', './views');
// app.set('view engine', 'ejs');

app.use(express.static('./public'));
// route app

app.get('/danhsach', (req, res)=>{
    User.find({})
        .then(result => res.json(result))
        .catch(err => res.json(err.message));
});
app.post('/themuser', (req, res)=>{
    const { username, password, fullname, age, address} = req.body;
    // console.log({ username, password, fullname, age, address});
    const user = new User({ username, password, fullname, age, address})
    user.save()
        .then(result => res.json(result))
        .catch(err => res.json(err.message));
});

app.post('/xoauser/:id', (req, res)=>{
    const { id } = req.params;
    console.log(id);
    User.findByIdAndRemove(id)
        .then(result => console.log('Delete user success'))
        .catch(err => console.log(err.message));
});


//Edit User
app.get('/suauser/:id', (req, res)=>{
    const { id } = req.params;
    // console.log({id});
    User.findById(id)
        .then(result => res.json(result))
        .catch(err => res.json(err));
}) ;

app.post('/suauser/:id', (req, res)=>{
    const id = req.params.id;
    const { username, password, fullname, age, address } = req.body;
    // console.log(id);
    User.findByIdAndUpdate(id, { username, password, fullname, age, address })
        .then(()=> console.log('Update Success'));
});



// app listen
// use mongoose
const uri = 'mongodb://localhost/demoapi';
mongoose.connect(uri, {useMongoClient: true});
mongoose.connection.once('open', ()=>{
    app.listen(3000, ()=> console.log('Server Started at port 3000'));
});

