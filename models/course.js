module.exports = (sequelize, DataTypes) => {
	const Course = sequelize.define("Course", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		teacherId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "Teachers",
				key: "id",
			},
		},
	});

	Course.associate = models => {
		Course.belongsTo(models.Teacher, {
			foreignKey: "teacherId",
			as: "teacher",
		});
	};

	return Course;
};
