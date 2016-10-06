var express = require('express');
var router = express.Router();
var Calificaciones = require('../models/calificaciones_math');
var async = require('async');

router.get('/', function(req, res, next) {
  Calificaciones.find({}, function (err, response) {
    if (err) {
      return next(err);
    }
    var mediaGeometrica = 1;
    var mediaAritmetica = 0;
    var varianza = 0;
    var desviacion = 0;
    for (var i = 0; i < response.length; i ++) {
      mediaGeometrica *= response[i].calificacion;
      mediaAritmetica += response[i].calificacion;
      varianza += Math.pow(response[i].calificacion, 2);
    }

    mediaAritmetica /= response.length;

    for (var i = 0; i < response.length; i ++) {
      desviacion += Math.pow((response[i].calificacion - mediaAritmetica), 2);
    }

    desviacion /= response.length;

    res.render('calificaciones', { 
      tamano: response.length,
      media_geometrica: Math.pow(mediaGeometrica, 1/response.length),
      media_aritmetica: mediaAritmetica,
      varianza: (varianza/response.length) - Math.pow(mediaAritmetica, 2),
      desviacion_estandar: Math.pow(desviacion, 0.5),
      datos: response
    });
  });
});

router.post('/nuevos', function (req, res, next) {
  Calificaciones.remove({}, function (errRemove, responseRemove) {
    if (errRemove) return next(errRemove);
    var cals = [];
    for (var i = 1; i <= 100; i++ ) {
      cals.push(i);
    }

    async.each(cals, function (cal, callback) {
      Calificaciones.create({
        id: cal,
        nombre: 'Nombre_alumno',
        calificacion: Math.floor(Math.random() * (11 - 0)) + 0,
        bimestre: 1
      }, function (errCalif, responseCalif) {
        if (errCalif) callback(errCalif);
        callback();
      })
    }, function (errAsync) {
      if (errAsync) return next(errAsync);
      res.send('se creado nuevos registros');
    });


  });
});

module.exports = router;
