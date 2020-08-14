
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('bolumOgretimElemani', {
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
		tableName: 'BolumOgretimElemani',timestamps: false
	});
};