const { createComfyEndpoint } = require('comfy-endpoint');

module.exports = function(app) {
    app.post('/comfy-endpoint', createComfyEndpoint);
}