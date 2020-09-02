module.exports = function(sequelize, DataTypes) {
	return sequelize.define('acilanders', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		fsmvuDersId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'fsmvuders',
				key: 'id'
			},
			field: 'FsmvuDers_id'
		},
		somestrId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'somestr',
				key: 'id'
			},
			field: 'Somestr_id'
		}
	}, {
		tableName: 'acilanders',timestamps: false
	});
};
