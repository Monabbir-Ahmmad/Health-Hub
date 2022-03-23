'use strict';
const express = require('express');
const { check } = require('express-validator');
const patientControllers = require('../controllers/patient-controllers');
const checkAuth = require('../middleware/check-auth');
const filesUpload = require('../middleware/file-upload');
const chatController = require('../controllers/chatController');

const router = express.Router();

router.post(
    '/signup', filesUpload.array('image'), [
    check('name').notEmpty(),
    check('email').isEmail(),
    check('password').isLength({ min: 6 }),
], patientControllers.signup);

router.post('/login', [
    check('email').isEmail(),
    check('password').isLength({ min: 6 }),
], patientControllers.login);

router.get('/profile/:id', patientControllers.getProfile);

router.use(checkAuth);

router
    .route('/:patientId')
    .patch(patientControllers.editInfo)
    .put([
        check('oldPassword').custom((value, { req }) => {
            if (value === req.body.newPassword) throw new Error('Same password');
            else return value;
        }),
    ], patientControllers.changePassword);


router.get('/appointments', patientControllers.getAllAppointments);

// id of doctor
router.get("/chatInfo/:id", chatController.getChatInfo);

module.exports = router;