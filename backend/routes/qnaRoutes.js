const express = require('express');

const router = express.Router();

const qnaControllers = require('../controllers/qnaControllers');
const checkAuth = require('../middleware/check-auth');


router.use(checkAuth);

router.get('/', qnaControllers.getAllQuestion);
router.get('/category', qnaControllers.getQuestionByCategory);
router.get('/user/:id', qnaControllers.getQuestionsOfAnUser);
router.get('/question/:id', qnaControllers.getAQuestion);
router.get('/answer/:id', qnaControllers.getAnAnswer);

router.post('/answer/:id', qnaControllers.answerQuestion);
router.post('/question', qnaControllers.askAQuestion);
router.post('/upvote/:id', qnaControllers.upvoteAnswer);







module.exports = router;