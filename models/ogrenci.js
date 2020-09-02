/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('ogrenci', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		ogrenciAd: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'ogrenci_ad'
		},
		ogrenciSoyad: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'ogrenci_soyad'
		},
		ogrenciMail: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'ogrenci_mail'
		},
		ogrenciFakulte: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'ogrenci_fakulte'
		},
		ogrenciBolum: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'ogrenci_bolum'
		},
		transkript: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'transkript'
		},
		universiteAdi: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'universite_adi'
		},
		talepTarih: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'talep_tarih'
		},
		girisYil: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'giris_yil'
		},
		basvuruTur: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'basvuru_tur'
		}
	}, {
		tableName: 'ogrenci',timestamps: false
	});
};