const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

// express app
const app = express()

// Link for the connection to the database
const dbConnect = 'mongodb+srv://silvertheo:121292@cluster0.xxiai.mongodb.net/nodejs-ninja?retryWrites=true&w=majority'
mongoose.connect(dbConnect, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((results) => {
    // listen for requests
    app.listen(3000)
    console.log('connected to the db')
  })
  .catch((err) => {
    console.log(err)
  })

// Middleware & static files.
app.use(express.static('public'))
app.use(express.urlencoded( { extend: true } ))

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
   const blog = new Blog({
      title: 'new blog2',
      snippet: 'about my new blog',
      body: 'more about my new blog'

   })
   // the method save() sends the data to the mongoDB
   blog.save()
   .then((result) => {
      res.send(result)
   })
   .catch((err) => {
      console.log(err);
      
   })
})

app.get('/all-blogs', (req, res) => {
   Blog.find()
   .then((result) => {
      res.send(result)
   })
   .catch((err) => {
      console.log(err);
      
   })
})

app.get('/single-blog', (req, res) => {
   Blog.findById('5f64cd2d63cedf3524235a45')
   .then((result) => {
      res.send(result)
   })
   .catch((err) => {
      console.log(err);
      
   })
})

// register view engine
app.set('view engine', 'ejs')
// app.set('views', 'myviews');

// routes
app.get('/', (req, res) => {
   res.redirect('/blogs');
 });

app.get('/blogs', (req, res) => {
   Blog.find().sort({ createdAt: -1 })
     .then(result => {
       res.render('index', { blogs: result, title: 'All blogs' });
     })
     .catch(err => {
       console.log(err);
     });
 });

 app.post('/blogs', (req, res) => {    
    const blog = new Blog( req.body )
   //  save to the dataBase
   blog.save()
   .then((result) => {
      res.redirect('/blogs')
   })
   .catch(err => {
      console.log(err);
    });
})
 

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' })
})

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' })
})

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' })
})
