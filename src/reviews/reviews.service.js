const knex = require('../db/connection');
const mapProperties = require('../utils/map-properties');

const addCriticInfo = mapProperties({
  preferred_name: 'critic.preferred_name',
  surname: 'critic.surname',
  organization_name: 'critic.organization_name',
});

function read(reviewId) {
  return knex('reviews')
    .select('*')
    .where({ review_id: reviewId })
    .first();
}

function update(updatedReview) {
  return knex('reviews')
    .select('*')
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview);
}

function updateReviewWithCritics(reviewId) {
  return knex('reviews as r')
    .join('critics as c', 'r.critic_id', 'c.critic_id')
    .select('*')
    .where({ review_id: reviewId })
    .first()
    .then((result) => {
      const updatedReview = addCriticInfo(result);
      return updatedReview;
    })
    .catch(function(error) { console.error(error) });
}

function destroy(reviewId) {
  return knex('reviews')
    .where({ review_id: reviewId })
    .del();
}

module.exports = {
  update,
  updateReviewWithCritics,
  read,
  destroy,
};



 










// const knex = require('../db.connection');

// function read(reviewId) {
//     return knex('reviews')
//         .select('review_id')
//         .where('review_id', reviewId)
//         .first();
// }

// function updateReview(update) {
//     return knex('reviews')
//         .select('*')
//         .where({ review_id: update.review_id })
//         .update(update, '*');
// }

// function deleteReview(review_id) {
//     return knex('reviews')
//         .where({ review_id })
//         .del();
// }

// module.exports = {
//     read,
//     updateReview,
//     deleteReview,
// }
  