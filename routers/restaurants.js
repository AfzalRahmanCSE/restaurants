const express=require('express')
const router=express.Router()

const {addRestaurant,getAllRestaurants,restaurantsNearBy}=require('./../controllers/restaurantController')

router.post('/addrestaurant',addRestaurant)
router.get('/getallrestaurants',getAllRestaurants)
router.get('/restaurantsnearby',restaurantsNearBy),

module.exports=router;