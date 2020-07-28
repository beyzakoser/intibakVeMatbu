/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('ogretimelemani', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		unvanAdSoyad: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'unvan_ad_soyad'
		},
		statu: {
			type: DataTypes.STRING(45),
			allowNull: false,
			field: 'statu'
		},
		bolum: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'bolum'
		}
	}, {
		tableName: 'ogretimelemani',timestamps: false
	});
};
