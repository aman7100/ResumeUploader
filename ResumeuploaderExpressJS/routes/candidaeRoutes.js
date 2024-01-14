import express, { Router } from 'express';
const router=express.Router();
import CandidateProfileController from '../controllers/candidateProfileController.js';
import upload from '../middleware/upload-middleware.js'
router.use('/resume',upload.fields([{name:'pimage',maxCount:1},{name:'rdoc',maxCount:1}]))

router.post('/resume',CandidateProfileController.saveProfile)
router.get('/list',CandidateProfileController.profileList)

export default router;