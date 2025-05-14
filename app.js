const express = require("express");
const app = express();
const { sequelize } = require("./models");

app.use(express.json());

// Routes
const coursesRouter = require("./routes/courses");
const teachersRouter = require("./routes/teachers");

app.use("/courses", coursesRouter);
app.use("/teachers", teachersRouter);

// Sync database and start server
sequelize
	.sync()
	.then(() => {
		console.log("Database synced");
	})
	.catch(error => {
		console.error("Database sync failed:", error);
	});

module.exports = app;
