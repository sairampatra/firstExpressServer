import express from "express";

import v1Router from './v1Router.js'
const router = express.Router()
/**
 * @swagger
 * /users:
 *  get:
 *  summery: create a new post  
 *  description: Get all users
 *  responses:
 *     200:
 *      message: sucess
 */
router.use('/v1',v1Router)

export default router