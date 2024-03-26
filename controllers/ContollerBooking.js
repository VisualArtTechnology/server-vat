const {Booking,Product} = require('../models/index')


class Controller {
 static async getBooking(req,res) {
    try {
        const data = await Booking.findAll({
            include : [
                Product
            ]
        })
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
    }
 }
 static async postBooking(req,res) {
    try {
        const {tanggal_booking,tanggal_kadaluarsa,name,email,wa,productId,nameEvent} = req.body
        const data = await Booking.create({
            tanggal_booking,tanggal_kadaluarsa,name,email,wa,productId,nameEvent
        })
        res.status(201).json(data)
    } catch (error) {
        console.log(error);
    }
 }
}

module.exports = Controller