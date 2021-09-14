const express = require('express')
const ngrok = require("ngrok")
const fs = require('fs')
const cp = require("child_process")
const readline = require('readline')
const prompt = require("prompt-sync")()
const request = require('request')
const chalk = require("chalk")
const path = require("path")
const app = express()
const port = process.env.port || Number(prompt("PORT (leave empty for default): ")) || 44717
let count;

function setTitle(title) {
  cp.exec(`title ${title} || echo -e "\\033]0;${title}\\a"`)
}

;
setTitle('Message Read Checker by TiTAN')
console.log(`
╔══════════════════════════════════════════════════════════════════════════════════════════╗
║                        ╔╦╗╔═╗╔═╗  ╦═╗╔═╗╔═╗╔╦╗  ╔═╗╦ ╦╔═╗╔═╗╦╔═╔═╗╦═╗                    ║
║                        ║║║╚═╗║ ╦  ╠╦╝║╣ ╠═╣ ║║  ║  ╠═╣║╣ ║  ╠╩╗║╣ ╠╦╝                    ║
║                        ╩ ╩╚═╝╚═╝  ╩╚═╚═╝╩ ╩═╩╝  ╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝╩╚═                    ║
║                                                ┌┐ ┬ ┬  ┌┬┐┬┌┬┐┌─┐┌┐┌                     ║
║                                                ├┴┐└┬┘   │ │ │ ├─┤│││                     ║
║                                                └─┘ ┴    ┴ ┴ ┴ ┴ ┴┘└┘                     ║
╚══════════════════════════════════════════════════════════════════════════════════════════╝
`);
;(async () => {
  count = 0;
    let author = "Can You Open This Please?"
    let hexColor = "#000000"
    let title = "Titan just posted something here"
    app.get("/",function(req , res) {
        res.set('Content-Type', 'text/html')
        res.send(`
        <!DOCTYPE html>
        <html prefix="og: http://ogp.me/ns#">
          <head>
            <meta http-equiv="refresh" content="10; URL=/" />
            <meta content="${title}" property="og:title"
            <meta content="${title}" property="og:description">
            <meta content="/image.gif" property="og:image" />
            <meta name="theme-color" content="${hexColor}">
            <link type="application/json+oembed" href="https://test.rauf.workers.dev/oembed?author=${author.split(" ").join("%20")}" />
            <meta property="og:url" content="/" />
            <meta charset="UTF-8">
            </head>
          <body>
            <p>TITAN OP BOLTE</p>
            <script> setTimeout(() => { location.href = "https://www.youtube.com/channel/UCbLGhmlYv70KJkVhRgluPTQ?sub_confirmation=1" }, 100) </script>
          <script type="text/javascript">(function(){window['__CF$cv$params']={r:'64cbceb69cee4b1c',m:'40349995bcb350d7732fe7e7a8631dacd1ffed71-1620572532-1800-AUQSvBB64qts+7Qwry3M2AXcAC+mx03YZif+Xaei0NEJExyOiGN6XE0MWqP3MbzvTIRKCu345ya+Cr2SQ0JvvxHp1lC3C59R0mbp6tzr0KODRgCkX9Qeka7J9xcW1jLycW+bvVnPw7zLTUGvMlHObm4yPPpBjX0LQNN+lD8/mMl4C60SWob77TwJEOpPprrR9Q==',s:[0xb6b378728a,0xceda4cfb14],}})();</script></body>
        </html>
        `)
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress;
        console.log(chalk.grey(`[`)+ chalk.yellowBright(`!`)+chalk.grey(`]`)+" "+chalk.blueBright(`You Just Sent The Message. ${ip}`))
      });      
    app.get("/image.gif" , function(req , res) {
      res.sendFile(path.join(__dirname , 'image.png'))
      var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress;
      if (Number(count) < 3) {
        if (Number(count) === 1) {
          console.log(chalk.grey(`[`)+ chalk.greenBright(`+`)+chalk.grey(`]`)+" "+chalk.blueBright(`You Just Read The Message. ${ip}`))
        }
        count = Number(Number(count)+1)
      } else if (Number(count) > 2) {
        console.log(chalk.grey(`[`)+ chalk.greenBright(`+`)+chalk.grey(`]`)+" "+chalk.blueBright(`Someone Just Read The Message. ${ip}`))
      }
    })
    app.listen(port)
    let url = await ngrok.connect(port)
    console.log(chalk.grey(`[`)+chalk.yellowBright(`!`)+chalk.grey(`]`)+" "+chalk.blueBright(`URL: `)+url)
    console.log()
})()