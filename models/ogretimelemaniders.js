/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('ogretimelemaniders', {
		ogretimElemaniId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'ogretimelemani',
				key: 'id'
			},
			field: 'OgretimElemani_id'
		},
		dersId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'fsmvuders',
				key: 'id'
			},
			field: 'Ders_id'
		}
	}, {
		tableName: 'ogretimelemaniders',timestamps: false
	});
};
