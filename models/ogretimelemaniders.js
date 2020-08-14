/* jshint indent: 1 */


module.exports = function(sequelize, DataTypes) {
	return sequelize.define('ogretimElemaniDers', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		ogretimElemaniId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'OgretimElemani',
				key: 'id'
			},
			field: 'OgretimElemani_id'
		},
		dersId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'FsmvuDers',
				key: 'id'
			},
			field: 'Ders_id'
		}
	}, {
		tableName: 'OgretimElemaniDers',timestamps: false
	});
};
