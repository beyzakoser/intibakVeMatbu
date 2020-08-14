/* jshint indent: 1 */


module.exports = function(sequelize, DataTypes) {
	return sequelize.define('fsmvuDers', {
		id: {
			type: DataTypes.INTEGER(11),
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
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'teori_saat'
		},
		labSaat: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'lab_saat'
		},
		kredi: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'kredi'
		},
		akts: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'akts'
		},
		teoriOnline: {
			type: DataTypes.STRING(15),
			allowNull: true,
			defaultValue: 'evet',
			field: 'teori_online'
		},
		labOnline: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'lab_online'
		},
		donem: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'donem'
		}
	}, {
		tableName: 'FsmvuDers',timestamps: false
	});
};
