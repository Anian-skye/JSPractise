/**
 * Created by sky on 2018/9/3.
 */
let request = require("superagent");
let cheerio = require("cheerio");
let async = require("async");
let url = require("url");

// async.mapLimit(urls, 5, async function(url) {
//     const response = await fetch(url)
//     return response.body
// }, (err, results) => {
//     if (err) throw err
//     // results is now an array of the response bodies
//     console.log(results)
// });


let basicUrl = "https://cnodejs.org/";

request("GET",basicUrl).then(res=>{
    let links=  [];

    let $ = cheerio.load(res.text);
    let urls = $('.topic_title');
    urls.each((index,element)=>{
        let link = $(element).attr("href");
        link = url.resolve(basicUrl,link);
        links.push(link);
    });

    let finalResult = [];

    async.mapLimit(links,5,async (url)=>{
        await request('GET',url).then(rres=>{
           let $content = cheerio.load(rres.text);
           let title  = $content(".topic_full_title").text().trim();
           let href = url;
           let comment = $content(".markdown-text").text().trim();
           finalResult.push({
               'title':title,
               'href':href,
               'comment':comment
           });
        })

    },(err,results)=>{
        if(err)
            throw err;
        else
            console.log(finalResult);
    })

}).catch(err=>{
    console.log(err);
});

