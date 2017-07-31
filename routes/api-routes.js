const request = require('request');
const cheerio = require('cheerio');
const EyeBleach = require("../models/eyebleach.js");
const Note = require("../models/notes.js");

module.exports = function (app) {
    // Routes For Home Page
    app.get('/', (req, res) => {
        eyeBleachRequest((data) => {
            let hbsObj = {
                reddit: data
            };
            res.render('home', hbsObj);
        });

    });

    app.get('/scrape', (req, res) => {
        let previouslyScraped = req.query.urls;
        let newlyScraped = [];
        eyeBleachRequest((results) => {
            let eyeBleachRequestResults = [];
            results.forEach((data, i) => {
                eyeBleachRequestResults.push(data.url);
            });
            previouslyScraped.forEach((result, i) => {
                if (eyeBleachRequestResults.indexOf(result) === -1) {
                    newlyScraped.push(eyeBleachRequest);
                } else {}
            });
            let returnObj = {
                'newlyScraped': newlyScraped,
                'numOfItems': newlyScraped.length
            };
            res.send(returnObj);
        });
    });

    app.post('/favorite', (req, res) => {
        // savedItem is an object that contains title, url, thumbnail, & comments
        let savedItem = req.body;
        let favoriteEyeBleach = new EyeBleach(savedItem);

        getFavorites((data) => {
            let favoriteUrls = [];
            data.forEach((result) => {
                favoriteUrls.push(result.url);
            });
            // Checks if urls of favorited items match with something already favorited
            if (favoriteUrls.indexOf(savedItem.url) === -1) {
                console.log('not a match, saving');
                favoriteEyeBleach.save((err, doc) => {
                    if (err) {
                        console(err);
                    } else {
                        res.send(doc);
                    }
                });
            } else {
                console.log('match found, not saving');
            }
        });
    });

    // Routes For Favorites Page
    app.get('/favorites', (req, res) => {
        getFavorites((data) => {
            let hbsObj = {
                reddit: data
            };
            res.render('favorites', hbsObj);
        });
    });

    app.post('/delete', (req, res) => {
        console.log(req.body.url)
        EyeBleach.remove({
            url: req.body.url
        }, (error, doc) => {
            res.send('Deleted from favorites');
        });
    })

    // Get Notes
    app.get('/notes', (req, res) => {
        console.log(req.body);
        getNotes(req.query.url, (data) => {
            if (data.notes <= 0) {
                res.send('No notes found');
            } else {
                res.send(data.notes[0].note);
            }
        });
    });

    // Save notes
    app.post('/notes', (req, res) => {
        let note = {
            note: req.body.notes
        };
        let url = {
            url: req.body.url
        }
        console.log(url);
        let newNote = new Note(note);
        newNote.save((err, doc) => {
            console.log(doc);
            if (err) {
                console.log(err);
            } else {
                EyeBleach.findOneAndUpdate(url, {
                    'notes': doc._id
                }, (err, notedoc) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send(notedoc);
                    }
                });
            }
        });
    });

    // Cheerios Scrape and returns an array of objects
    let eyeBleachRequest = (cb) => {
        //Testing with 10 limit
        let scrapeUrl = 'https://www.reddit.com/r/eyebleach/?limit=10';
        let eyeBleachArr = [];
        request(scrapeUrl, (error, response, body) => {
            const $ = cheerio.load(body);
            $('div.thing').each((i, element) => {
                let title = $(element).children("div.entry").children("div.top-matter").children("p.title").children().contents().get(0).nodeValue;
                let thumbnail = $(element).children("a").children("img").attr("src");
                let url = $(element).attr("data-url");
                let upvotes = $(element).children('div.midcol').children('div.unvoted').contents().get(0).nodeValue;
                let comments = $(element).children("div.entry").children("div.top-matter").children("ul.flat-list").children('li.first').children('a').attr('href');
                if (eyeBleachArr.indexOf(url) === -1 && i !== 0 && i !== 1) {
                    eyeBleachArr.push({
                        "title": title,
                        "thumbnail": thumbnail,
                        "url": url,
                        "upvotes": upvotes,
                        "comments": comments
                    });
                }
            });
            cb(eyeBleachArr);
        });
    };

    // Query for favorites and returns array of objects via callback function
    let getFavorites = (cb) => {
        EyeBleach.find({}, (error, doc) => {
            cb(doc);
        });
    };

    let getNotes = (url, cb) => {
        EyeBleach.findOne({
                url: url
            })
            .populate('notes')
            .exec((error, doc) => {
                cb(doc);
            });
    };
};