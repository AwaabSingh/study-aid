import asyncHandler from 'express-async-handler'
import Study from '../models/StudyModels.js'
import User from '../models/UserModels.js'

/**
 * @desc Get study list
 * @route GET api/studies
 * @access Private
 */
const getStudies = asyncHandler( async (req, res) => {
    const study = await Study.find({ user: req.user.id})

    res.status(200).json(study)
})

/**
 * @desc Set study list
 * @route Post api/studies
 * @access Private
 */
 const setStudies = asyncHandler( async (req, res) => {
     const { courseCode, topic, duration } = req.body;
     if(!courseCode || !topic) {
         res.status(400)
         throw new Error ('Please add a course code & topic')
     }

     const study = await Study.create({
         courseCode,
         topic,
         duration,
         user: req.user.id
     })
    res.status(200).json(study)
})

/**
 * @desc Update study list
 * @route Put api/studies/:id
 * @access Private
 */
 const updateStudies = asyncHandler( async (req, res) => {
     const study = await Study.findById(req.params.id);

     if(!study) {
         res.status(400)
         throw new Error('Study not found')
     }

     //  check for user
    if(!req.user){
        req.status(401)
        throw new Error('User not found')
    }

    // check for owner study
    if(study.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
     const updateStudy = await Study.findByIdAndUpdate(req.params.id, req.body, { new: true})
    
    
     res.status(200).json(updateStudy)
})

/**
 * @desc Delete study list
 * @route Delete api/studies/:id
 * @access Private
 */
 const deleteStudies = asyncHandler( async (req, res) => {
     const study = await Study.findById(req.params.id)

     if(!study) {
         res.status(400)
         throw new Error('Study is not found')
     }

    //  check for user 
    if(!req.user) {
        res.status(401)
        throw new Error('User not authorized')
    }

    // Check for owner study
    if(study.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
      await study.remove()

    res.status(200).json({ id: req.params.id })
})

export {
    getStudies,
    setStudies,
    updateStudies,
    deleteStudies
}