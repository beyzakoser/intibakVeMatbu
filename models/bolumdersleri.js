/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('bolumdersleri', {
		dersId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'fsmvuders',
				key: 'id'
			},
			field: 'Ders_id'
		},
		bolumId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'bolum',
				key: 'id'
			},
			field: 'Bolum_id'
		}
	}, {
		tableName: 'bolumdersleri'
	});
};
