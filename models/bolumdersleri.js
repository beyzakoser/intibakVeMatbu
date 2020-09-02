/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('bolumdersleri', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		bolumId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'bolum',
				key: 'id'
			},
			field: 'Bolum_id'
		},
		fsmvuDersId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'fsmvuders',
				key: 'id'
			},
			field: 'FsmvuDers_id'
		}
	}, {
		tableName: 'bolumdersleri',timestamps: false
	});
};