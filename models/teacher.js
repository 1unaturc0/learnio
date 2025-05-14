module.exports = (sequelize, DataTypes) => {
	const Teacher = sequelize.define("Teacher", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isEmail: true,
			},
		},
	});

	Teacher.associate = models => {
		Teacher.hasMany(models.Course, {
			foreignKey: "teacherId",
			as: "courses",
		});
	};

	return Teacher;
};
