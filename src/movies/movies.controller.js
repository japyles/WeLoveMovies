const moviesService = require('./movies.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');


// Make middleware to test if movieId exists

function hasMovieId(req, res, next) {
    moviesService
        .readMoviesById(req.params.movieId)
        .then((movie) => {
            if(movie) {
                res.locals.movie = movie;
                return next();
            }
            next({ status: 404, error: 'Movie cannot be found.' })
        })
    .catch(next);
}

function list(req, res, next) {
    moviesService
        .list(req.query.is_showing)
        .then((data) => {
          res.json({data})})
        .catch(next);
}

async function readMoviesById(req, res) {
     const data = await moviesService.readMoviesById(res.locals.movie.movie_id)
     res.json({ data })
}

async function theaterMoviesPlaying(req, res) {
    const data = await moviesService.theaterMoviesPlaying(res.locals.movie.movie_id)
    res.json({ data })
}

async function readMovieReviews(req, res) {
    const data = await moviesService.readMovieReviews(res.locals.movie.movie_id)
    res.json({ data })
}

module.exports = {
    list,
    readMoviesById: [asyncErrorBoundary(hasMovieId), asyncErrorBoundary(readMoviesById)],
    theaterMoviesPlaying: [asyncErrorBoundary(hasMovieId), asyncErrorBoundary(theaterMoviesPlaying)],
    readMovieReviews: [asyncErrorBoundary(hasMovieId), asyncErrorBoundary(readMovieReviews)],
}










// const moviesService = require('./movies.service');


// // Make middleware to test if movieId exists
// function hasMovieId(req, res, next) {
//     moviesService
//         .readMoviesById(req.params.movieId)
//         .then((movie) => {
//             if(movie) {
//                 res.locals.movie = movie;
//                 return next();
//             }
//             next({ status: 404, error: 'Movie cannot be found.' })
//         })
//         .catch(next);
// }

// function list(req, res, next) {
//     moviesService
//         .list()
//         .then((data) => res.json({data}))
//         .catch(next);
// }

// function read(req, res) {
//     moviesService
//         .read(req.query.is_showing)
//         .then((movie) => res.json({movie}))
//         .catch(next)
// }

// function readMoviesById(req, res) {
//     const { movie: data } = res.locals;
//     res.json({ data })
//     // moviesService.readMoviesById(req.params.movieId)
//     //     .then((data) => res.json({data}))
//     //     .catch(next)
// }

// function theaterMoviesPlaying() {
//     moviesService.theaterMoviesPlaying(req.params.movieId)
//         .then((data) => res.json({data}))
//         .catch(next)
// }

// function readMovieReviews(req, res) {
//     movieService
//         .readMovieReviews(req.params.movie_id)
//         .then((review) => res.json({ review }))
//         .catch(next)
// }

// module.exports = {
//     list,
//     read,
//     readMoviesById: [hasMovieId, readMoviesById],
//     theaterMoviesPlaying,
//     readMovieReviews,
// }