const http = require('http')
const PORT = process.env.PORT || 3000
const mime = require('mime')
const url = require('url')
const fileHandler = require('./file-handler')
const apiHandler = require('./api-handler')
const API_ROUTE = 'api'
const path = require('path')

function send404(req, res) {
    res.writeHead(404, {
        'Content-Type': 'text/plain'
    })
}

function sendFile(req, res, path) {
    response.writeHead(
        200, {
            "content-type": mime.lookup(path.basename(filePath))
        }
    );
    res.end()
}
http.createServer(urlMapper).listen(PORT)

function urlMapper (req, res) {
    const parsedUrl = url.parse(req.url)
    console.log(parsedUrl)
    const resources =  parsedUrl.pathname.split('/').filter(e => e)
    const [service, ...rest] = resources
    const apiSuffix = path.join(...rest)
    console.log(resources)
    if (service === API_ROUTE) return apiHandler(req, res, apiSuffix)
    return fileHandler(req, res, parsedUrl)
}



