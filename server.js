const mongoose = require('mongoose')
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const port = 3000;

const FridgeSeed = require('./models/fridgeItems.js')
const FridgeItem = require('./models/fridgeSchema.js')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true }));
app.use(express.json())
app.use(methodOverride('_method'));

app.get('/myfridge/fridgeseed', (req, res)=>{
    FridgeItem.create(FridgeSeed).then(()=>{
        res.send(FridgeSeed)
    
    })
})
// HOME
app.get('/myfridge', (req, res)=>{
    FridgeItem.find({}).then((allFridgeItems) => {
        res.render('index.ejs', {fridgeItems: allFridgeItems})
    })
  })


// SHOW
app.put('/myfridge/:id', (req, res) => {
    FridgeItem.findByIdAndUpdate(req.params.id, req.body).then((updatedItem) => {
        res.redirect('/myfridge')
    })
  })


// DELETE
app.delete('/myfridge/:id', (req, res) => {
    FridgeItem.findByIdAndRemove(req.params.id).then(() => {
        res.redirect('/myfridge')
    })
  })
  
// EDIT
app.get('/myfridge/:id/edit', (req, res)=>{
    FridgeItem.findById(req.params.id).then((currentItem) => {
        res.render('editFridge.ejs', {
            item: currentItem
        })
    })
  })

// NEW
app.get('/myfridge/new', (req, res) => {
    res.render('new.ejs')
})

app.post('/myfridge', (req, res) => {
    FridgeItem.create(req.body).then(() => {
        res.redirect('/myfridge')
    })
  })

// SHOW
app.get('/myfridge/:id/show', (req, res) => {
    FridgeItem.findById(req.params.id).then((currentItem) => {
        res.render('show.ejs', {
            items: currentItem
    })
  })
})




// LISTEN
app.listen(port, () => {
    console.log(`Grocery app listening on port: ${port}`)
  });
  mongoose.connect('mongodb://localhost:27017/fridgeitem')