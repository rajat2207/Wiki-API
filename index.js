const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

const app=express();

app.use(bodyParser.urlencoded({
    extended:true
}));

app.set('view engine','ejs');

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB",{useNewUrlParser:true});

const ArticleSchema= {
    title: String,
    content: String
}

const Article=mongoose.model("Article",ArticleSchema); 

app.get('/articles',function(req,res){
    Article.find({},function(err,results){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.send(results);
        }
    }); 
});

app.post("/articles",function(req,res){
    
    // console.log(req.body.title);
    // console.log(req.body.content);
    
    const newArticle= new Article({
        title:req.body.title,
        content:req.body.content
    });

    Article.insertMany({newArticle},function(err){
        if(err)
            console.log(err);
        else{
            res.send("Item successfully added!") 
        }
    })
})

app.delete("/articles",function(req,res){
    Article.deleteMany({},function(err){
        if(err){
            console.log(err);
        }else{
            res.send("All Items deleted!");
        }
    })
})

app.listen(3000,function(){
    console.log("App running on port 3000");
})