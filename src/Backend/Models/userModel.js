const mongoose=require("mongoose");
const skillSchema=new mongoose.Schema(
    {
        Empid: { type: String, required: true},
        skillName:{type: String, required: true},
        Proficiency:{type:String,required: true}
    }
)
const projectExperienceSchema = new mongoose.Schema({
    Empid: { type: String, required: true},
    projectName: {
        type: String,
        required: true
    },
    projectType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    Status:{type:String,required: true}
});

const certificateSchema = new mongoose.Schema({
    Empid: { type: String, required: true },
    certificateName: {
        type: String,
        required: true
    },
    issuingOrganization: {
        type: String,
        required: true
    },
    issueDate: {
        type: Date,
        required: true
    }
    ,
    ExpireDate: {
        type: Date,
        required: true
    },
    credentialID: {type:String,required: true},
    Status:{type:String,required: true}

});

skillSchema.index({ Empid: 1, skillName: 1 }, { unique: true });
const ProjectExperience = mongoose.model('ProjectExperience', projectExperienceSchema);
const skillDetails = mongoose.model("skillDetails", skillSchema);
const Certificate = mongoose.model('Certificate', certificateSchema);
exports.modules = { skillDetails,ProjectExperience,Certificate };

