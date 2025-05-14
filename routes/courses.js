const express = require("express");
const router = express.Router();
const { Course } = require("../models");

router.get("/", async (req, res) => {
	try {
		const courses = await Course.findAll();
		res.status(200).json(courses);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.get("/:courseId", async (req, res) => {
	try {
		const course = await Course.findByPk(req.params.courseId);
		if (!course) {
			return res.status(404).json({ error: "Course not found" });
		}
		res.status(200).json(course);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.post("/", async (req, res) => {
	try {
		const course = await Course.create(req.body);
		res.status(201).json(course);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.put("/:courseId", async (req, res) => {
	try {
		const [updated] = await Course.update(req.body, {
			where: { id: req.params.courseId },
		});
		if (updated) {
			const updatedCourse = await Course.findByPk(req.params.courseId);
			return res.status(200).json(updatedCourse);
		}
		throw new Error("Course not found");
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.delete("/:courseId", async (req, res) => {
	try {
		const deleted = await Course.destroy({
			where: { id: req.params.courseId },
		});
		if (deleted) {
			return res.status(204).send();
		}
		throw new Error("Course not found");
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
