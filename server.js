const http = require('http')
const PORT = process.env.PORT || 3000
const mime = require('mime')
const url = require('url')
const fileHandler = require('./file-handler')
const apiHandler = require('./file-handler')
const API_ROUTE = 'api'

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
    const resources =  parsedUrl.pathname.split('/')
    const [service, ...rest] = resources
    if (service === API_ROUTE) return apiHandler(req, res)
    return fileHandler(req, res, parsedUrl)
}



