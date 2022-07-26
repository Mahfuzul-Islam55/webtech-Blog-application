const {CreatePostByUser, getPostByUser,getAllPost,updateBlogPost,deleteBlogPost, getPostByUserName}=require('../controllers/postController');

const router=require('express').Router();
const {checkToken}=require('../middlewares/validateToken');


router.post('/',checkToken,CreatePostByUser);
router.get('/getPost',checkToken,getPostByUser);
router.get('/users/:username',checkToken,getPostByUserName);

router.get('/all',checkToken,getAllPost);

router.put('/:id',checkToken,updateBlogPost);
router.delete('/:id',checkToken,deleteBlogPost)

module.exports=router;