import express from 'express'
import multer from 'multer'
import MyRestaurantController from '../controllers/MyRestaurantController'
import { jwtCheck, jwtParse } from '../middleware/auth'
import { validateMyRestaurantRequest } from '../middleware/validation'

const router = express.Router()

//Multer get field with the name 'imageFile' from Api call
//then store image in the memory
//then create req.file (here put all info about the image)
//then pass to the controller

const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, //5mb
    }
})


router.get("/order",jwtCheck, jwtParse, MyRestaurantController.getMyRestaurantOrders)
router.patch("/order/:orderId/status",jwtCheck, jwtParse, MyRestaurantController.updateOrderStatus)
router.get("/",jwtCheck, jwtParse, MyRestaurantController.getMyRestaurant)
router.post("/",upload.single("imageFile"), validateMyRestaurantRequest, jwtCheck, jwtParse, MyRestaurantController.createMyRestaurant)
router.put("/",upload.single("imageFile"), validateMyRestaurantRequest, jwtCheck, jwtParse,MyRestaurantController.updateMyRestaurant)
export default router