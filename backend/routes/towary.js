const router = require('express').Router();
let Towar = require('../models/towar');

//const checkAuth = require("../middleware/check-auth")

router.route('/').get((req, res) => {
  Towar.find()
    .then(towary => res.json(towary))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const nazwa_kremowki = req.body.nazwa_kremowki;
  const opis = req.body.opis;
  const ilosc = Number(req.body.ilosc);
  const date = Date.parse(req.body.date);

  const newTowar = new Towar({
    username,
    nazwa_kremowki,
    opis,
    ilosc,
    date,
  });

  newTowar.save()
  .then(() => res.json('Kremówka dodana!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Towar.findById(req.params.id)
    .then(towar => res.json(towar))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
  Towar.findByIdAndDelete(req.params.id)
    .then(() => res.json('Kremówka usunięta.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').patch((req, res) => {
  Towar.findById(req.params.id)
    .then(towar => {
      towar.username = req.body.username;
      towar.nazwa_kremowki = req.body.nazwa_kremowki;
      towar.opis = req.body.opis;
      towar.ilosc = Number(req.body.ilosc);
      towar.date = Date.parse(req.body.date);

      towar.save()
        .then(() => res.json('Kremówka zaaktualizowana!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;