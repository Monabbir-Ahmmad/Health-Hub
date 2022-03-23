const express = require('express');

const router = express.Router();

const blogControllers = require('../controllers/blogControllers');
const checkAuth = require('../middleware/check-auth');
const fileUpload = require('../middleware/file-upload');

router.use(checkAuth);

router.post('/write', fileUpload.array('image'), blogControllers.createBlog);
router.post('/comment/:id', blogControllers.commentBlog);
router.post('/upvote/:id', blogControllers.upvoteBlog);


router.get('/:id', blogControllers.getBlog);
router.get('/doctor/:id', blogControllers.getBlogsOfUser);
router.get('/comment/:id', blogControllers.getComments);
router.get('/', blogControllers.getAllBlogs);



module.exports = router;