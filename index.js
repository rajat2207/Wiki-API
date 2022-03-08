const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true });

const ArticleSchema = {
    title: String,
    content: String
}

const Article = mongoose.model("Article", ArticleSchema);

//////////////////////////Routing for all articles

app.route("/articles")
    .get(function (req, res) {
        Article.find({}, function (err, results) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.send(results);
            }
        });
    })
    .post(function (req, res) {

        // console.log(req.body.title);
        // console.log(req.body.content);

        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });


        newArticle.save(function (err) {
            if (!err) {
                res.send("Successfully added a new article.");
            } else {
                res.send(err);
            }
        })
    })
    .delete(function (req, res) {
        Article.deleteMany({}, function (err) {
            if (err) {
                console.log(err);
            } else {
                res.send("All Items deleted!");
            }
        })
    });

//////////////////////////Routing for specific article

app.route("/articles/:articleTitle")
    .get(function (req, res) {
        Article.findOne({
            title: req.params.articleTitle
        }, function (err, result) {
            if (err) {
                res.send(err);
            } else if (result) {
                res.send(result);
            } else {
                res.send("No Such Article Found");
            }
        })
    })
    .put(function (req, res) {
        Article.updateMany({ title: req.params.articleTitle },
            {
                title: req.body.title,
                content: req.body.content
            },
            { overwrite: true },
            function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.send("Item updated successfully");
                }
            })

    })

    .patch(function (req, res) {
        Article.updateMany(
            { title: req.params.articleTitle },
            {
                $set: req.body
            },
            function (err) {
                if (!err) {
                    res.send("Successfully Updated Article");
                } else {
                    res.send(err);
                }
            }
        )
    })

    .delete(function(req,res){
        Article.deleteMany({
            title:req.params.articleTitle
        },function(err){
            if(!err){
                res.send("Items deleted successfully!")
            }else{
                res.send(err);
            }
        })
    })

app.listen(3000, function () {
    console.log("App running on port 3000");
})