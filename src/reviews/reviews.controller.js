const reviewsService = require('./reviews.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

function hasReviewId(req, res, next) {
    reviewsService
        .read(req.params.reviewId)
        .then((review) => {
            if(review) {
                res.locals.review = review;
                return next();
            }
            next({ status: 404, error: 'Review cannot be found.' })
        })
    .catch(next);
}

async function destroy(req, res) {
  await reviewsService.destroy(res.locals.review.review_id);
  res.sendStatus(204);
}

async function update(req, res) {
  const updatedReview = { ...res.locals.review, ...req.body.data };
  await reviewsService.update(updatedReview);
  const returnData = await reviewsService.updateReviewWithCritics(res.locals.review.review_id);
  res.json({ data: returnData });
}

module.exports = {
  delete: [asyncErrorBoundary(hasReviewId), asyncErrorBoundary(destroy)],
  update: [asyncErrorBoundary(hasReviewId), asyncErrorBoundary(update)],
};

















// const reviewsService = require('./reviews.service.js');


// function reviewExists(req, res, next) {
//     const { reviewId } = req.params;
  
//     const review = reviewsService.read(reviewId);
  
//     if (review) {
//       res.locals.review = review;
//       return next();
//     }
//     next({ status: 404, message: `Review cannot be found.` });
//   }
  

// // Verifies score and content from req.body
// function validateBody(req, res, next) {
//     const { data } = req.body;
//     const { data: { score, content } } = req.body;
  
//     const properties = ['score', 'content'];
  
//   //   checks to see if any property is missing or empty
//     for (property of properties) {
//       if (
//         !data.hasOwnProperty(property) ||
//         data[property] === "" ||
//         data[property] === null
//       ) {
//         return next({ status: 400, message: `Review must include a ${property} property` });
//       }
//     }
  
//     // set local variables to be used in other functions
//     res.locals.score = score;
//     res.locals.content = content;
  
//     return next();
//   };

// function updateReview(req, res) {
//     const update = {
//         ...res.locals.review,
//         ...req.body.data,
//         score: res.locals.score,
//         content: res.locals.content,
//     }

//     const data = reviewsService.updateReview(update);

//     res.json({ data });
// }

// function deleteReview(req, res) {
//     reviewsService
//         .deleteReview(res.locals.review.review_id)
//         .then(() => res.sendStatus(204))
//         .catch(next);
// }

// module.exports = {
//     updateReview: [reviewExists, validateBody, updateReview],
//     deleteReview: [reviewExists, deleteReview]
// }
  