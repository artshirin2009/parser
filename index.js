var Crawler = require("crawler");
var cheerio = require('cheerio')
var c = new Crawler({});
var phantom = require("phantom");
var _ph, _page, _outObj;

var aUrls = [];
var products = []
c.queue([{
    uri: 'https://rozetka.com.ua/ua/notebooks/c80004/filter/producer=asus/',
    callback: function (error, res, done) {
        var $ = cheerio.load(res.body)
        if (error) {
            console.log(error);
        } else {
            //console.log($('.g-i-tile-i-title a'))
            $('.g-i-tile-i-title a').each(function (i) {
                aUrls.push($(this).attr('href'))
            });
        }
        aUrls.forEach(function (url) {
            c.queue([{
                uri: url,
                callback: function (error, res, done) {
                    var $ = cheerio.load(res.body)
                    var product = {}
                    if (error) {
                        console.log(error);
                    } else {

                       product.name =  $('.detail-title.h1').text().trim();
                       product.description = $('.short-description').text().trim();
                       products.push(product)
                       
                    }
                    console.log(products)
                    done();
                }
            }])
        })
        
        
        done();
    }
}]);




// phantom.create().then(function(ph){
//     _ph = ph;
//     return _ph.createPage();
// }).then(function(page){
//     _page = page;
//     return _page.open('https://rozetka.com.ua/ua/notebooks/c80004/filter/producer=asus/');
// }).then(function(status){
//     return _page.property('content')
// }).then(function(content){
    
//     //console.log(content);
//     var $ = cheerio.load(content)
//     console.log($('.g-price-uah').text())
//     _page.close();
//     _ph.exit();
// }).catch(function(e){
//    console.log(e); 
// });



