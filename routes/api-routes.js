const request = require('request');
const cheerio = require('cheerio');
// const db = require("../models");

module.exports = function (app) {
    app.get('/', (req, res) => {
        bloombergRequest(res);
    });

    app.get('/scrape', (req, res) => {
        bloombergRequest(res);
    });
    app.get('/test', (req,res)=>{
        console.log('test works');
    });
    
    let bloombergRequest = (res) => {
        let bloombergurls = [];
        request('https://www.bloomberg.com/technology', function (err, response, body) {
            if (!err && response.statusCode == 200) {
                let $ = cheerio.load(body);
                $('.story-list-article__content a').each(function (i, element) {
                    let url = $(element).attr('href');
                    let title = $(element).text();
                    bloombergurls.push({
                        url: url,
                        title: title
                    });
                });
                let hbsObj = {
                    bloomberg: bloombergurls
                }
                res.render('home', hbsObj);
            }
        });
    }
};