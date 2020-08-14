/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('bolumDersleri', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		dersId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'FsmvuDers',
				key: 'id'
			},
			field: 'Ders_id'
		},
		bolumId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'Bolum',
				key: 'id'
			},
			field: 'Bolum_id'
		}
	}, {
		tableName: 'BolumDersleri',timestamps: false
	});
};