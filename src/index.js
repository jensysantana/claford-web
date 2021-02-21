const app = require('./app');
const { HOST_PORT } = require('./config/config');
// const { connectionDb } = require('./db/database');

async function conectDb() {
    // await connectionDb();
    app.listen(HOST_PORT, () => console.log(`Server is listening on port ${HOST_PORT}`));
}

conectDb().then(() => {
    console.log(`Server conected on port: ${ HOST_PORT }`);
}).catch(err => console.error(err));

module.exports = app;