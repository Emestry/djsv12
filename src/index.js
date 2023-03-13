const TesseractClient = require('./Structures/TesseractClient');
const config = require('../config.json');

const client = new TesseractClient(config);
client.start();
