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

app.get('/myfridge', (req, res)=>{
    FridgeItem.find({}).then((allFridgeItems) => {
        res.render('index.ejs', {fridgeItems: allFridgeItems})
    })
  })






app.listen(port, () => {
    console.log(`Grocery app listening on port: ${port}`)
  });
  mongoose.connect('mongodb://localhost:27017/fridgeitem')