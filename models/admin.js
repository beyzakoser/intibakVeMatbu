/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('admin', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		kullaniciAdi: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'kullanici_adi'
		},
		sifre: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'sifre'
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
		tableName: 'admin'
	});
};
