const request = require('request');
const cheerio = require('cheerio');

module.exports = function (app) {
    let bloombergurls = [];
    app.get('/', (req, res) => {
        let hbsObj = {
            bloomberg: bloombergurls
        }
        res.render('home', hbsObj);
    });

    request('https://www.bloomberg.com/technology', function (err, res, body) {
        if (!err && res.statusCode == 200) {
            let $ = cheerio.load(body);
            $('.story-list-article__content a').each(function (i, element) {
                let url = $(element).attr('href');
                let title = $(element).text();
                bloombergurls.push({
                    url: url,
                    title: title
                });
            });
        }
    });
};