const request = require('request');
const cheerio = require('cheerio');
// const db = require("../models");

module.exports = function (app) {
    app.get('/', (req, res) => {
        eyeBleachRequest(res,(data)=>{
            let hbsObj = {
                reddit: data
            };
            console.log(hbsObj);
            res.render('home',hbsObj);
        });
        
    });

    app.get('/scrape', (req, res) => {
        eyeBleachRequest(res);
    });

    let eyeBleachRequest = (res,cb) => {
        let url = 'https://www.reddit.com/r/eyebleach';
        let eyeBleachArr = [];
        request(url, (error, response, body) => {
            const $ = cheerio.load(body);
            $('div.thing').each((i, element) => {
                let title = $(element).children("div.entry").children("div.top-matter").children("p.title").children().contents().get(0).nodeValue;
                let thumbnail = $(element).children("a").children("img").attr("src");
                let url = $(element).attr("data-url");
                let dataId = $(element).attr("data-fullname");
                eyeBleachArr.push({
                    "title": title,
                    "thumbnail": thumbnail,
                    "url": url,
                    "id": dataId
                });
            });
            cb(eyeBleachArr);
        });

    };
};