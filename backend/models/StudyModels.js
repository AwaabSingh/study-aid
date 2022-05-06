import mongoose from 'mongoose'

const studySchema = mongoose.Schema({
     courseCode: {
         type: String,
         required: [true, 'Please add the Course code']
     },
     topic: {
         type: String,
         require: [true, 'Please add a Topic ']
     },
     duration: {
         type: String
     },
     user:{
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'User'
     }
}, {
    timestamps: true
})

const Study = mongoose.model('Study', studySchema);

export default Study;
