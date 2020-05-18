const express = require('express');
const database = require('./database');

const router = express.Router();

router.get('/', (request, response, next) => {
    console.log(request.body);
    database.getAppointments( (appointmentList) => {
        response.json(appointmentList);
    });
})


router.get('/date/:date', (request, response, next) => {
    let date = request.params.date;
    console.log(date);
    database.getAvailableSlots(date, (result) => {
        response.json(result);
    })
})


router.post('/', (request, response, next) => {
    console.log(request.body);
    database.saveAppointment(request.body);
    response.json(request.body);
})

router.delete('/', (request, response, next) => {
    console.log(request.body);
    response.json(request.body);
    database.deleteBooking(request.body._id);
})

module.exports.router = router; 