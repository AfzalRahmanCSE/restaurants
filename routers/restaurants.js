const express=require('express')
const router=express.Router()

const {addRestaurant}=require('./../controllers/restaurantController')

router.post('/addrestaurant',addRestaurant)

module.exports=router;