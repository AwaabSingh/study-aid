import express from 'express';
import  {
    getStudies,
    setStudies,
    updateStudies,
    deleteStudies
} from '../controllers/studyController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/').get(protect,getStudies).post(protect, setStudies)
router.route('/:id').put(protect, updateStudies).delete(protect, deleteStudies)


export default router