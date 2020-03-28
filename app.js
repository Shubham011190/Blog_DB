//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
// var posts = [];
mongoose.connect("mongodb://localhost:27017/blogDB",{ useNewUrlParser: true, useUnifiedTopology: true  })
const blogSchema = {
  title: String,
  body:String
}

const Blog = mongoose.model("Blog",blogSchema)

const defBlog = new Blog({
  title:"Hello",
  body:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
})
defBlog.save();

app.get("/", function(req,res){
  res.render("home",{homecontent : homeStartingContent, postsVal: ""});
  // console.log(posts);
})

app.get("/contact",function(req,res){
  res.render("contact",{contactcon : contactContent});
})

app.get("/about",function(req,res){
  res.render("about",{aboutcon : aboutContent});
})

app.get("/compose",function(req,res){
  res.render("compose");
})

app.get("/notfound",function(req,res){
  res.render("notfound");
})

app.post("/compose",function(req,res){
  let inputval = req.body.textCompose;
  // var post = {
  //   titlePost : req.body.titleCompose,
  //   bodyPost : req.body.textCompose,
  // }
  // posts.push(post);
  const postNew = new Blog({
    title:req.body.titleCompose,
    body:req.body.textCompose
  })
  postNew.save();
  res.redirect("/");
})

app.get('/posts/:postname',function(req,res){
  const titleName = req.params.postname;

  posts.forEach(function(item){
    if(_.lowerCase(item.titlePost) == _.lowerCase(titleName)){
      res.render("post",{postNewTitle:item.titlePost, postNewBody:item.bodyPost})
    }
    // else
    //   {
    //     res.render("notfound");
    //   }
  })

})
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
