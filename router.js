class Router {
    constructor() {
        this._routes = {}
    }
    _handleMethods(method, path, callback) {
        let methods = this._routes[path]
        if (methods && methods[method]) {
            return this
        }
        if (!methods) {
            this._routes[path] = {}
            methods = this._routes[path]
        }
        methods[method] = callback
        return this
    }

    _fallback(req, res) {
        res.writeHead(404)
        return res.end("No such method")
    }

    exectute(path, req, res) {
        const methods = this._routes[path]
        if (!methods) {
            return this._fallback(req, res)
        }
        switch (req.method) {
            case "GET":
                if (typeof methods.get !== "function") {
                    return this._fallback(req, res)
                }
                return methods.get(req, res)
            case "POST":
                return methods.post(req, res)
        }
    }
    get(path, callback) {
        return this._handleMethods('get', path, callback)
    }
    post(path, callback) {
        return this._handleMethods('post', path, callback)
    }
}

module.exports = {
    Router
}