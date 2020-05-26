const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const towarSchema = new Schema({
    username: { type: String, required: true},
    nazwa_kremowki: { type: String, required: true},
    opis: {type: String, required: true},
    ilosc: { type: Number, required: true },
    date: { type: Date, required: true},
}, {
    timestamps: true,
});

const Towar = mongoose.model('Towar', towarSchema);

module.exports = Towar;