/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('insans', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		ad: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'ad'
		},
		soyad: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'soyad'
		},
		tc: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: true,
			field: 'tc'
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'createdAt'
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'updatedAt'
		}
	}, {
		tableName: 'insans'
	});
	
};
