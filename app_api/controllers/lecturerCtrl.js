const Lecturer = require("../models/lecturer");
const Project = require('../models/project');
const Student = require('../models/student');

const updateInfo = (req, res) => {
    const { mail } = req.payload;
    const { vnumail, birthday, phone, note, password } = req.body;

    if (!vnumail) return res.status(400).json({ message: "vnumail is required" });
    // if(!birthday) return res.status(400).json({message: "birthday is required"});
    if (!phone) return res.status(400).json({ message: "phone is required" });
    if (!note) return res.status(400).json({ message: "note is required" });

    Lecturer.findOne({ mail }, (err, lecturer) => {
        if (err) return res.status(400).json(err);
        if (!lecturer) return res.status(400).json({ message: "no lecturer founded" });

        lecturer.vnumail = vnumail;
        if (birthday) lecturer.birthday = birthday;
        lecturer.phone = phone;
        lecturer.note = note;
        if (password) lecturer.password = password;

        lecturer.save(err => {
            if (err) return res.status(400).json(err);

            return res.status(200).json({ message: "success" });
        })
    });
}

const getListStudentFollow = async (req, res) => {

    const { mail } = req.payload;
    if (!mail) return res.status(500).json({ message: 'internal error' });

    try {
        // const { listProject } = await Lecturer
        //     .findOne({ mail })
        //     .select('listProject')
        //     .populate({
        //         path: 'listProject',
        //         populate: {
        //             path: 'students.'
        //         }
        //     })
        //     .exec();

        const { listProject }
            = await Lecturer
                .findOne({ mail })
                .populate('listProject')
                .exec();

        const listId
            = listProject
                .map(p => p.students.map(s => s.studentId))
                .reduce((acc, cur) => [...acc, ...cur])
        console.log(listId)


        const students
            = await Student
                .find({ _id: { "$in": listId } })
                .exec();

        if (!students || !students.length)
            return res.status(404).json({ message: "no student found" });
        return res.status(200).json({ students });
    } catch (e) {
        return res.status(400).json(e);
    }


    // Lecturer.findOne({ mail }, (err, lecturer) => {
    //     if (err) return res.status(400).json(err);
    //     if (!lecturer) return res.status(500).json({ message: 'internal error' });

    //     const students = [];
    //     const listProject = lecturer.listProject;

    //     listProject.map(async (p) => {
    //         return new Promise((resolve, reject) => {
    //             try {
    //                 const project = await Project.findById(p).exec();
    //                 const listStudentId = project.students;
    //                 const _students = [];

    //                 listStudentId.forEach(async (s) => {
    //                     const student = await Student.findById(s.studentId).exec();


    //                 })
    //             } catch (e) {
    //                 reject(e);
    //             }
    //         })
    //     })


    // })

    // res.status(200).json({students});

}

module.exports = {
    updateInfo,
    getListStudentFollow
}