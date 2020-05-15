const express = require('express');
const database = require('./database');

const router = express.Router();

router.get('/', (request, response, next) => {
    console.log(request.body);
    database.getAppointments( (appointmentList) => {
        response.json(appointmentList);
    });
})

router.get('/:date', (request, response, next) => {
    let date = request.params.date;
    console.log(date);
    database.getAvailableSlots(date, (result) => {
        console.log(result);
        response.json(result);
    })
})

const mockAppointment = {
    firstName: 'John',
    lastName: 'Doe',
    date: new Date (2020, 04, 24),
    slot: {time: 9, available: false}
}

const mockAvailability = {
    date: new Date (2020, 04, 28),
    slots: [
        {time: 9, available: true}, {time: 10, available: true}, {time: 11, available: false}, {time: 12, available: false}, {time: 13, available: true}, {time: 14, available: false}
    ]
}


router.post('/', (request, response, next) => {
    console.log(request.body);
    database.saveAppointment(mockAppointment);
    response.json(request.body);
})

router.delete('/', (request, response, next) => {
    console.log(request.body);
    response.json(request.body);
})

module.exports.router = router; 