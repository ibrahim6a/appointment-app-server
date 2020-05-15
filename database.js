const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;


let mongoUser;
let mongoPassword;

if (process.env.NODE_ENV === undefined) {
   const config = require('./config');
   mongoUser = config.mongoUser,
   mongoPassword = config.mongoPassword

} else if (process.env.NODE_ENV === 'production') {
    mongoUser = process.env.mongoUser,
    mongoPassword = process.env.mongoPassword;
}


const mongoUrl = `mongodb+srv://${mongoUser}:${mongoPassword}@cluster0-wvxxp.mongodb.net/cms?retryWrites=true&w=majority`; 

const client = new MongoClient(mongoUrl, { useUnifiedTopology: true });

let db = null;

function connectToMongo(appStart) {
    client.connect( (error, result) => {
        if (error) {
            console.log(`Unable To Connect To Mongo`);
        } else {
            db = result.db('appointments-app');
            console.log(`Mongo Connected`);
            appStart();
            return db;
        }
    });
}

function getDb() {
    if (db === null || db === undefined) {
        connectToMongo();
    } else {
        return db;
    }
}

function saveAppointment (appointment) {
    getDb().collection('appointments').insertOne({firstName: appointment.firstName, lastName: appointment.lastName, date: appointment.date});
}

function saveAvailablity (availability) {
    getDb().collection('appointments').insertOne({date: availability.date, slots: availability.slots});
}


function getAppointments (callback) {
    getDb().collection('appointments').find({}).toArray( (error, data) => {
        if (error) {
            console.log(error);
            callback('There is an error');
        } else {
            callback(data);
        }
    })
}


module.exports = {
    connectToMongo: connectToMongo,
    getAppointments: getAppointments,
    saveAppointment: saveAppointment,
    saveAvailablity: saveAvailablity
}