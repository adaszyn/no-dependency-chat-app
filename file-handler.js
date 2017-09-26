const path = require('path')
const fs = require('fs')
const mime = require('mime')

const staticDir = path.join(__dirname, 'static')

function fileHandler (req, res, {pathname}) {
    const filePath = path.join(staticDir, getPathWithExtension(pathname))
    fs.exists(filePath, function (exists) {
        if (!exists) {
            res.writeHead(404, {
                'content-type': 'text/plain'
            })
            res.end('No such file!')
        }
        fs.readFile(filePath, function (err, data) {
            if (err) {
                return res.writeHead(501)
            }
            return res.end(data)

        })
    })
}

function getPathWithExtension (requestedPath) {
    const parts = requestedPath.split('.')
    if (parts.length === 1) {
        return path.join(requestedPath, 'index.html')
    }
    return requestedPath
}

module.exports = fileHandler