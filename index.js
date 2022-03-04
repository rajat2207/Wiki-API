const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

const app=express();

mongoose.connect("mongodb://localhost:27017/wikiDB",{useNewUrlParser:true});

const ArticleSchema= {
    title: String,
    content: String
}

const Article=mongoose.model("Article",ArticleSchema); 

app.listen(3000,function(){
    console.log("App running on port 3000");
})