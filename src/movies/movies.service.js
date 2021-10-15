const knex = require('../db/connection');
const mapProperties = require('../utils/map-properties');

const addCriticInfo = mapProperties({
  critic_id: 'critic.critic_id',
  preferred_name: 'critic.preferred_name',
  surname: 'critic.surname',
  organization_name: 'critic.organization_name',
});

function list(is_showing) {
  
  return knex('movies as m')
    .join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
    .select('m.*')
    .where({ 'mt.is_showing': true })
    .groupBy('m.movie_id');
}

function readMoviesById(movie_id) {
    return knex('movies')
        .select('*')
        .where('movie_id', movie_id)
        .first();
}

function theaterMoviesPlaying(movieId) {
  return knex('movies_theaters as mt')
    .join('theaters as t', 'mt.theater_id', 't.theater_id')
    .select('*')
    .where({ movie_id: movieId, is_showing: true });
}

function readMovieReviews(movieId) {
    return knex('movies as m')
        .join('reviews as r', 'm.movie_id', 'r.movie_id')
        .join('critics as c', 'c.critic_id', 'r.critic_id')
        .select('*')
        .where({'r.movie_id': movieId})
        .then((reviews) => {
        const reviewsWithCriticInfo = []
        reviews.forEach((review) => {
          const addedCritic = addCriticInfo(review)
          reviewsWithCriticInfo.push(addedCritic)
        })
        return reviewsWithCriticInfo
        })
}

module.exports = {
    list,
    readMoviesById,
    theaterMoviesPlaying,
    readMovieReviews,
}










// const knex = require('../db/connection');

// function list() {
//     return knex('movies').select('*');
// }

// function read(is_showing) {
//     return knex('movies as m')
//         .join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
//         .join('theaters as t', 'mt.theater_id', 't.theater_id')
//         .select('m.movie_id')
//         .where('is_showing', is_showing)
//         .first();
// }

// function readMoviesById(movie_id) {
//     return knex('movies')
//         .select('*')
//         .where('movie_id', movie_id)
//         .first();
// }

// function theaterMoviesPlaying() {
//     return knex('movies as m')
//         .join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
//         .join('theaters as t', 'mt.theater_id', 't.theater_id')
//         .select('t.theater_id')
//         .where('is_showing: true')
//         .first();
// }

// function readMovieReviews() {
//     return knex('movies as m')
//         .join('reviews as r', 'm.movie_id', 'r.movie_id')
//         .join('critics as c', 'c.critic_id', 'r.critic_id')
//         .select('r.review_id')
//         .first();
// }

// module.exports = {
//     list,
//     read,
//     readMoviesById,
//     theaterMoviesPlaying,
//     readMovieReviews,
// }