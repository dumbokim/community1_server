const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const ComDb1 = require('./models/ComDb1');

// must
app.use(cors());
app.use(express.json());

// DB Connection
mongoose.connect(
  "mongodb://localhost:27017/community_db?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
  { useNewUrlParser: true,
    useUnifiedTopology: true }, // error occured before put this
);


// Sending Data from Front End
app.post('/addpost', async (req, res) => {

  // body means data object
  const title = req.body.title;
  const desc = req.body.description;
  const pwd = req.body.password;

  const posting = new ComDb1({title:title, description: desc, password:pwd});

  // use async to avoid error (wait until const friend rendered)
  await posting.save();
  res.send(posting);

})

// get data from db
app.get('/getlists', (req, res) => {
  ComDb1.find({}, (err, result) => {
    if(err) res.send(err);
    else res.send(result);
  });
})

// Server Port
app.listen(8000, () => {
  console.log('you are connected');
})