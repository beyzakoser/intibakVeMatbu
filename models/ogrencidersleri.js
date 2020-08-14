/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('ogrenciDersleri', {
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
		dersAdi: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'ders_adi'
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
		basariNotu: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'basari_notu'
		},
		ogrenciId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'Ogrenci',
				key: 'id'
			},
			field: 'Ogrenci_id'
		},
		fsmvuDersId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'FsmvuDers',
				key: 'id'
			},
			field: 'FsmvuDers_id'
		}
	}, {
		tableName: 'OgrenciDersleri',timestamps: false
	});
};
