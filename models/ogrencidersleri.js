/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('ogrencidersleri', {
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
		dersAdi: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'ders_adi'
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
		basariNotu: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'basari_notu'
		},
		ogrenciId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'ogrenci',
				key: 'id'
			},
			field: 'Ogrenci_id'
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
		tableName: 'ogrencidersleri',timestamps: false
	});
};
