'use strict'
const express = require('express');
const { check } = require('express-validator');
const doctorControllers = require('../controllers/doctor-controllers');
const checkAuth = require('../middleware/check-auth');
const filesUpload = require('../middleware/file-upload');
const chatController = require('../controllers/chatController');

const router = express.Router();
router.post(
    '/signup', filesUpload.array('image'), [
    check('name').notEmpty(),
    check('email').isEmail(),
    check('medicalId').notEmpty(),
    check('password').isLength({ min: 6 }),
], doctorControllers.signup);

router.post('/login', [
    check('email').isEmail(),
    check('password').isLength({ min: 6 }),
], doctorControllers.login);


router.get('/profile/:id', doctorControllers.getProfile);

router.use(checkAuth);

router.patch('/:doctorId', doctorControllers.editInfo);

router.put('/:doctorId', doctorControllers.changePassword);

router.get('/find', doctorControllers.getDoctors);


router.get('/find/:doctorId', doctorControllers.getDoctor);

router.get('/appointments', doctorControllers.getAllAppointments);

router.get('/:id', doctorControllers.getAllAppointments);

router.get("/chatInfo/:id", chatController.getChatInfo);

module.exports = router;