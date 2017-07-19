const request = require('request');
const cheerio = require('cheerio');

module.exports = function (app) {
    app.get('/',(req,res)=>{
        res.render('home', {});
    });

    request('http://reddit.com', (err, res, body)=>{
        if(!err && res.statusCode == 200){
            // console.log(err);
            let $ = cheerio.load('<div id="siteTable"></div>');
            let urls = [];
            console.log('------');
            console.log($);
            $('a.title').each(()=>{
                // let url = this.attr('href');
                // urls.push(url);
            });
            // console.log(urls);
        }
    });
};