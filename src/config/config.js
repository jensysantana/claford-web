const path = require('path');

const configs = {
    HOST_NAME: 'mongodb://localhost:27017/marketstore',
    // HOST_NAME: 'mongodb+srv://satana:RyUUyGXJXpApSAEz@project-users.jxttd.mongodb.net/fakerusersflutter?retryWrites=true&w=majority',
    HOST_PORT: process.env.PORT || 4301,
    // BASE_PATH: path.normalize(path.resolve()),
    // // PUBLIC_PATH: `${path.resolve(__dirname, '../../')}\\`,
    // PUBLIC_PATH: `${path.normalize(path.resolve())}\\`,
    PUBLIC_PATH_SRC: function(uri) {
        if (uri) {
            return path.join(__dirname, uri);
        }
        return path.join(__dirname);
    },
    SERVER_URL: 'http://localhost:4300/',
    APP_NAME: 'Claford',
}

module.exports = configs;