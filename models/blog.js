const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
   title: {
      type: String,
      required: true
   },
   snippet: {
      type: String,
      required: true
   },
   body: {
      type: String,
      required: true
   }
}, { timestamps: true });

// The name of the model must be the singular of the collection to the mongoDB
const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog;