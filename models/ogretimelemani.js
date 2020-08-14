/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('ogretimElemani', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		unvan: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'unvan'
		},
		ad: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'ad'
		},
		soyad: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'soyad'
		},
		statu: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'statu'
		}
	}, {
		tableName: 'OgretimElemani',timestamps: false
	});
};
