const express = require("express");
const router = express.Router();
const { Teacher } = require("../models");

router.get("/:teacherId", async (req, res) => {
	try {
		const teacher = await Teacher.findByPk(req.params.teacherId);
		if (!teacher) {
			return res.status(404).json({ error: "Teacher not found" });
		}
		res.status(200).json(teacher);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.post("/", async (req, res) => {
	try {
		const teacher = await Teacher.create(req.body);
		res.status(201).json(teacher);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.put("/:teacherId", async (req, res) => {
	try {
		const [updated] = await Teacher.update(req.body, {
			where: { id: req.params.teacherId },
		});
		if (updated) {
			const updatedTeacher = await Teacher.findByPk(req.params.teacherId);
			return res.status(200).json(updatedTeacher);
		}
		throw new Error("Teacher not found");
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.delete("/:teacherId", async (req, res) => {
	try {
		const deleted = await Teacher.destroy({
			where: { id: req.params.teacherId },
		});
		if (deleted) {
			return res.status(204).send();
		}
		throw new Error("Teacher not found");
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
