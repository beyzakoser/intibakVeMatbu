
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('bolumogretimelemani', {
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
		tableName: 'bolumogretimelemani',timestamps: false
	});
};