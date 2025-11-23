const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json()); 

mongoose.connect("mongodb://127.0.0.1:27017/studentdb")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    course: { type: String, required: true },
    age: Number,
    city: String,
    id: Number
});
const Student = mongoose.model("Student", studentSchema);


app.get("/students", async (req, res) => {
    const students = await Student.find();
    res.json(students);
});


app.post("/students", async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        const saved = await newStudent.save();
        res.json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


app.put("/students/:id", async (req, res) => {
    const updated = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(updated);
});


app.delete("/students/:id", async (req, res) => {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student Deleted" });
});


app.listen(8002, () => {
    console.log("Server running on port 8002");
});
