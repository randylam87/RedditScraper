const request = require('request');
const cheerio = require('cheerio');
const EyeBleach = require("../models/eyebleach.js");
const Note = require("../models/notes.js");

module.exports = function (app) {
    // Routes For Home Page
    app.get('/', (req, res) => {
        eyeBleachRequest(res, (data) => {
            let hbsObj = {
                reddit: data
            };
            res.render('home', hbsObj);
        });

    });

    app.get('/scrape', (req, res) => {
        let previouslyScraped = req.query.urls;
        let newlyScraped = [];
        eyeBleachRequest(res, (results) => {
            let eyeBleachRequestResults = [];
            results.forEach((data,i) => {
                console.log(`Currently scraped items: ${i} ${data.url} `);
                eyeBleachRequestResults.push(data.url);
            });
            previouslyScraped.forEach((result, i) => {
                if (eyeBleachRequestResults.indexOf(result) === -1) {
                    console.log(`${result} is not an index of recently scraped reddit data: ${eyeBleachRequestResults}
                    `);
                    newlyScraped.push(eyeBleachRequest);
                } else {
                    console.log(`${result} is an index of recently scraped data at index ${eyeBleachRequestResults.indexOf(result)}
                    `);
                }
            });
            console.log(`returning to client: ${newlyScraped}`);
            if (newlyScraped.length>0) {
                console.log('true');
                res.send(newlyScraped);
            } else {
                console.log('false');
                res.send('Nothing was returned');
            }
        });
    });


    // Routes For Favorites Page
    app.get('/favorites', (req, res) => {
        EyeBleach.find({}, (error, doc) => {
            let hbsObj = {
                reddit: doc
            };
            res.render('favorites', hbsObj);
        });
    });

    app.post('/favorite', (req, res) => {
        console.log(req.body);
        let favoriteEyeBleach = new EyeBleach(req.body);
        favoriteEyeBleach.save((err, doc) => {
            if (err) {
                console(err);
            } else {
                res.send(doc);
            }
        });
    });

    // Cheerios Scrape
    let eyeBleachRequest = (res, cb) => {
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
                let commentsUrl = $(element).children("div.entry").children("div.top-matter").children("ul.flat-list").children('li.first').children('a').attr('href');
                if (eyeBleachArr.indexOf(url) === -1 && i !== 0 && i !== 1) {
                    eyeBleachArr.push({
                        "title": title,
                        "thumbnail": thumbnail,
                        "url": url,
                        "upvotes": upvotes,
                        "commentsUrl": commentsUrl
                    });
                }
            });
            cb(eyeBleachArr);
        });
    };
};