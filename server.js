// express
const express = require('express');
const app = express();
app.use(express.json());
// must
const cors = require('cors');
app.use(cors());

const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express'); 
const AdminBroMongoose = require('@admin-bro/mongoose');

AdminBro.registerAdapter(AdminBroMongoose);

// mongoose 
const mongoose = require('mongoose');
const ComDb1 = require('./models/ComDb1'); // collection1


require('./models/ComDb1')

const run = async() => {

  // DB Connection
  const connection = await mongoose.connect(
    "mongodb://localhost:27017/community_db",
    { useNewUrlParser: true,   // error occured before 
      useUnifiedTopology: true, // put these two
      useCreateIndex: true,
      useFindAndModify: false },
  );

  const adminBro = new AdminBro({
    resources:[ComDb1],
    rootPath: '/admin',
  })

  const router = AdminBroExpress.buildRouter(adminBro); 
  app.use(adminBro.options.rootPath, router);


}

run()

/*
mongoose.connect(
  "mongodb://localhost:27017/community_db?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
  { useNewUrlParser: true,   // error occured before 
    useUnifiedTopology: true, // put these two
    useCreateIndex: true,
    useFindAndModify: false },
);
*/


// Sending Data from Front End
app.post('/addpost', async (req, res) => {
  // body means data object
  const title = req.body.title;
  const desc = req.body.description;
  const pwd = req.body.password;
  const posting = new ComDb1({title:title, description: desc, password:pwd});

  // use async to avoid error (wait until "const posting" rendered)
  await posting.save(); // await for "save()"? or "const posting"?
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
const port = 7456
app.listen(7456, () => {
  console.log(`you are connected localhost:${port}`);
})