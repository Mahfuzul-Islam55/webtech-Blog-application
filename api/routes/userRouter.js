const {RegisterUser,getUserProfile,getUsers,updateUserProfile,deleteUser,loginUser} =require('../controllers/userController');

const router=require('express').Router();
const {checkToken}=require('../middlewares/validateToken');

router.post('/',RegisterUser);
router.post('/login',loginUser);
router.put('/',checkToken,updateUserProfile);
router.get('/profile',checkToken,getUserProfile);


router.get('/',checkToken,getUsers);
router.delete('/',checkToken,deleteUser);


module.exports=router;
