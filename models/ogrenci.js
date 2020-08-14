/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('ogrenci', {
		id: {
			type: DataTypes.INTEGER(11),
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
		ogrenciNumara: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'ogrenci_numara'
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
			unique: true,
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
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'giris_yil'
		}
	}, {
		tableName: 'Ogrenci',timestamps: false
	});
};
