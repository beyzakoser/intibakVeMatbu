module.exports = function(sequelize, DataTypes) {
	return sequelize.define('mufredatders', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		mufredatId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'mufredat',
				key: 'id'
			},
			field: 'Mufredat_id'
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
		tableName: 'mufredatders',timestamps: false
	});
};