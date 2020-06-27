const { connect } = require('mongodb');

const MongoClient = require('mongodb').MongoClient;

const url = process.env.MONGO_URL || 'mongodb://localhost:27017'
const DB_NAME = 'GA'
const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology:true})
const COLLECTIONS = {
    USERS: 'users',
    INFOBANK: 'infoBank'
}

module.exports = {
    async connect () {
        const connection = await client.connect();
        console.log('Connected to MongoDB with this url : ' + url);
        const db = connection.db(DB_NAME);
        this.users = db.collection(COLLECTIONS.USERS);
        this.infoBank = db.collection(COLLECTIONS.INFOBANK);
    },
    disconnect () {
        console.log('closing connection')
        return client.close();
    },
};
