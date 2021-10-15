const router = require('express').Router();
const controller = require('./movies.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router
    .route('/')
    .get(controller.list)
    .all(methodNotAllowed);

router
    .route('/:movieId')
    .get(controller.readMoviesById)
    .all(methodNotAllowed);

router
    .route('/:movieId/theaters')
    .get(controller.theaterMoviesPlaying)
    .all(methodNotAllowed);

router
    .route('/:movieId/reviews')
    .get(controller.readMovieReviews)
    .all(methodNotAllowed);


module.exports = router;






// const router = require("express").Router();
// const controller = require("./movies.controller");
// const methodNotAllowed = require("../errors/methodNotAllowed");

// router
//     .route('/')
//     .get(controller.list)
//     .all(methodNotAllowed);

// router
//     .route('/:movieId')
//     .get(controller.readMoviesById)
//     .all(methodNotAllowed);

// router
//     .route('/:movieId/theaters')
//     .get(controller.theaterMoviesPlaying)
//     .all(methodNotAllowed);

// router
//     .route('/:movieId/reviews')
//     .get(controller.readMovieReviews)
//     .all(methodNotAllowed);


// module.exports = router;