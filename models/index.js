const { Sequelize } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: path.join(__dirname, "../database.sqlite"),
	logging: false,
});

const Teacher = require("./teacher")(sequelize, Sequelize.DataTypes);
const Course = require("./course")(sequelize, Sequelize.DataTypes);

Teacher.associate({ Course });
Course.associate({ Teacher });

module.exports = {
	sequelize,
	Teacher,
	Course,
};
