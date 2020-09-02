module.exports = function(sequelize, DataTypes) {
	return sequelize.define('somestr', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		donem: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'donem'
		},
		baslangicYil: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'baslangic_yil'
		},
		bitisYil: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'bitis_yil'
		}
	}, {
		tableName: 'somestr',timestamps: false
	});
};