module.exports = function(sequelize, DataTypes) {
	return sequelize.define('mufredat', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		ad: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'ad'
		}
	}, {
		tableName: 'mufredat',timestamps: false
	});
};
