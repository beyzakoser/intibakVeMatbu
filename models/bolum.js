/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('bolum', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		bolumKodu: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'bolum_kodu'
		},
		bolumAdi: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'bolum_adi'
		}
	}, {
		tableName: 'bolum',timestamps: false
	});
};

