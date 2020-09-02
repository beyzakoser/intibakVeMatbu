/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('ogretimelemaniders', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		ogretimElemaniId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'ogretimelemani',
				key: 'id'
			},
			field: 'OgretimElemani_id'
		},
		acilanDersId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'acilanders',
				key: 'id'
			},
			field: 'AcilanDers_id'
		}
	}, {
		tableName: 'ogretimelemaniders',timestamps: false
	});
};