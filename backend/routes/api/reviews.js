// backend/routes/api/index.js
const express = require('express')
const {Spot, Booking, Review, ReviewImage, SpotImage, User} = require('../../db/models');
const router = express.Router();
// backend/routes/api/session.js
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { ExclusionConstraintError } = require('sequelize');



//create an image for review
//
//
//
router.post('/:reviewId/images', async (req, res) => {

const review = await Review.findByPk(req.params.reviewId)

if(!review) {
    res.status('404')
    return res.json({
        "message": "Review couldn't be found",
        "statusCode": 404
      })
}

console.log(review)
const currUser = req.user.id
const {url} = req.body
const reviewImg = await ReviewImage.create({url, reviewId: req.params.reviewId})

const imgReturn = reviewImg.toJSON()
delete imgReturn.reviewId
delete imgReturn.createdAt
delete imgReturn.updatedAt


res.json(imgReturn)
})






//get reviews of current user
///
//

router.get('/current', async (req, res) => {
    let currUser = req.user.id
    const allReviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [{model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']},
        {model:ReviewImage, attributes: ['id', 'url']},
        {model:User, attributes: ['id', 'firstName', 'lastName']}]
    })
    let reviewArr = []
    for (let i = 0; i < allReviews.length; i++) {

        let review = allReviews[i].toJSON()
        reviewArr.push(review)
        let spotId = review.Spot.id
        console.log(review)
        const spotImgs = await SpotImage.findAll({
            where: {
                spotId: spotId
            }
        })
        for (let i = 0; i < spotImgs.length; i++) {
            let spotImg = spotImgs[i].toJSON()
            let url = spotImg.url
            review.Spot.previewImage = url
        }
    }
    const finalReviews = {Reviews: reviewArr}
    res.json(finalReviews)

})




module.exports = router;