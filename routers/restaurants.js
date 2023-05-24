const express=require('express')
const router=express.Router()

const {addRestaurant,getAllRestaurants,restaurantsNearBy,addRating}=require('./../controllers/restaurantController')

router.post('/addrestaurant',addRestaurant)
router.get('/getallrestaurants',getAllRestaurants)
router.get('/restaurantsnearby',restaurantsNearBy)
router.post('/addrating/:restaurantId',addRating)

module.exports=router;