/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const fsmvuders= sequelize.define('fsmvuders', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		dersKodu: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'ders_kodu'
		},
		dersAd: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'ders_ad'
		},
		grupBilgisi: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'grup_bilgisi'
		},
		kontenjan: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'kontenjan'
		},
		teoriSaat: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'teori_saat'
		},
		labSaat: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'lab_saat'
		},
		kredi: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'kredi'
		},
		akts: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'akts'
		},
		online: {
			type: DataTypes.STRING(15),
			allowNull: true,
			defaultValue: 'evet',
			field: 'online'
		}
	}, {
		tableName: 'fsmvuders',timestamps: false
	});
	return fsmvuders;
};
