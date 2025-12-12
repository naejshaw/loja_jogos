"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', authController_1.register);
// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', authController_1.login);
exports.default = router;
