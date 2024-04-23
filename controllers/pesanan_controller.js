const pesananModel = require(`../models/index`).pesanan
const detailPesananModel = require('../models').DetailPesanan;
const Op = require(`sequelize`).Op
const db = require("../db");

// mendapatkan semua data
exports.getAllPesanan = async (request, response) => {
    let pesanans = await pesananModel.findAll()
    return response.json({
        success: true,
        data: pesanans,
        message: `All data have been loaded`
    })
}

// cari data
exports.findPesanan = async (request, response) => {
    let keyword = request.params.key
    let pesanans = await pesananModel.findAll({
        where: {
            [Op.or]: [
                { pesananID: { [Op.substring]: keyword } },
                { namaCust: { [Op.substring]: keyword } },
                { alamat: { [Op.substring]: keyword } },
                { noTelp: { [Op.substring]: keyword } },
                { tgl: { [Op.substring]: keyword } },
                { tglPembayaran: { [Op.substring]: keyword } },
                { totalHarga: { [Op.substring]: keyword } }
            ]
        }
    })
    return response.json({
        success: true,
        data: pesanans,
        message: `All Users have been loaded`
    })
}

exports.addPesanan = (request, response) => {
    let date = new Date();
    let y = date.getFullYear();
    let m = ("0" + (date.getMonth() + 1)).slice(-2);
    let d = ("0" + date.getDate()).slice(-2);
    let h = ("0" + date.getHours()).slice(-2);
    let s = ("0" + date.getSeconds()).slice(-2);
    let i = ("0" + date.getMinutes()).slice(-2);
    let kodeInvoice = `TA${y}${m}${d}${s}${i}`;
    let tgl = `${y}-${m}-${d} ${h}:${i}:${s}`;

    const end_date = new Date();
    end_date.setDate(end_date.getDate() + 7);
    let y2 = end_date.getFullYear();
    let m2 = ("0" + (end_date.getMonth() + 1)).slice(-2);
    let d2 = ("0" + end_date.getDate()).slice(-2);
    let batasWaktu = `${y2}-${m2}-${d2} ${h}:${i}:${s}`;

    const data = {
        userID: request.body.userID,
        namaCust: request.body.namaCust,
        alamat: request.body.alamat,
        noTelp: request.body.noTelp,
        tgl: tgl,
        kodeInvoice: kodeInvoice,
        batasWaktu: batasWaktu,
        status: "baru",
        statusBayar: "belum"
    };

    // Tambahkan pesanan
    Pesanan.create(data)
        .then(result => {
            // Dapatkan harga jenis laundry
            return JenisLaundry.findByPk(request.body.jenisID);
        })
        .then(jenisLaundry => {
            const harga = jenisLaundry.harga;
            // Hitung total harga
            const totalHarga = harga * request.body.qty;
            // Tambahkan detail pesanan
            return DetailPesanan.create({
                pesananID: pesanan.pesananID,
                jenisID: request.body.jenisID,
                qty: request.body.qty,
                totalHarga: totalHarga
            });
        })
        .then(() => {
            response.json({
                message: "Data transaction inserted successfully."
            });
        })
        .catch(error => {
            console.error(error);
            response.status(500).json({
                error: "Internal server error"
            });
        });
};

/* 
exports.addPesanan = (request, response) => {
    let date = new Date();
    let y = date.getFullYear();
    let m = ("0" + (date.getMonth() + 1)).slice(-2);
    let d = ("0" + date.getDate()).slice(-2);
    let h = ("0" + date.getHours()).slice(-2);
    let s = ("0" + date.getSeconds()).slice(-2);
    let i = ("0" + date.getMinutes()).slice(-2);
    let kodeInvoice = `TA${y}${m}${d}${s}${i}`;
    let tgl = `${y}-${m}-${d} ${h}:${i}:${s}`;

    const date2 = new Date();
    date2.setDate(date2.getDate() + 7);
    let y2 = date2.getFullYear();
    let m2 = ("0" + (date2.getMonth() + 1)).slice(-2);
    let d2 = ("0" + date2.getDate()).slice(-2);
    let batasWaktu = `${y2}-${m2}-${d2} ${h}:${i}:${s}`;

    let data1 = {
        userID: request.body.userID,
        namaCust: request.body.namaCust,
        alamat: request.body.alamat,
        noTelp: request.body.noTelp,
        tgl: tgl,
        kodeInvoice: kodeInvoice,
        batasWaktu: batasWaktu,
        status: "baru",
        statusBayar: "belum"
    }
    let sql1 = "INSERT INTO pesanans SET ?";
    db.query(sql1, data1, (error, result) => {
        if (error) {
            throw error;
        } else {
            let sql2 = "SELECT * FROM jenis_laundries WHERE jenisID = ?";
            db.query(sql2, request.body.jenisID, (error, result) => {
                if (error) {
                    throw error;
                } else {
                    let harga = result[0].harga;
                    let sql4 = "SELECT * FROM pesanans WHERE kodeInvoice = ?";
                    db.query(sql4, kodeInvoice, (error, result) => {
                        if (error) {
                            throw error;
                        } else {
                            let totalHarga = harga * request.body.qty;
                            let data2 = {
                                pesananID: result[0].pesananID,
                                jenisID: request.body.jenisID,
                                qty: request.body.qty,
                                totalHarga: totalHarga
                            }
                            let sql3 = "INSERT INTO detail_pesanans SET ?";
                            db.query(sql3, data2, (error, result) => {
                                if (error) {
                                    throw error;
                                } else {
                                    response.json({
                                        message: "Data transaction inserted successfully."
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}
*/

exports.updateStatus = (request, response) => {
    let pesananID = request.body.pesananID;
    let data = {
        status: request.body.status
    }
    let sql = "update pesanans set ? where pesananID = ?";
    db.query(sql, [data, pesananID], (error, result) => {
        if (error) {
            throw error;
        } else {
            response.json({
                message: `Successfully update transaction where id = ${pesananID}.`,
                data
            })
        }
    })
}

exports.updatePayment = async (request, response) => {
    try {
        const date = new Date();
        const y = date.getFullYear();
        const m = ("0" + (date.getMonth() + 1)).slice(-2);
        const d = ("0" + date.getDate()).slice(-2);
        const h = ("0" + date.getHours()).slice(-2);
        const s = ("0" + date.getSeconds()).slice(-2);
        const i = ("0" + date.getMinutes()).slice(-2);
        const tglPembayaran = `${y}-${m}-${d} ${h}:${i}:${s}`;
        const pesananID = request.body.pesananID;

        // Update data pesanan
        await pesananModel.update({
            statusBayar: "dibayar",
            tglPembayaran: tglPembayaran
        }, {
            where: { pesananID: pesananID }
        });

        // Update data detail pesanan
        await detailPesananModel.update({
            totalBayar: request.body.totalBayar
        }, {
            where: { pesananID: pesananID }
        });

        response.json({
            message: `Successfully update transaction where id = ${pesananID}.`
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({
            error: "Internal server error"
        });
    }
};

/*
exports.updatePayment = (request, response) => {
    let date = new Date()
    let y = date.getFullYear();
    let m = ("0" + (date.getMonth() + 1)).slice(-2);
    let d = ("0" + date.getDate()).slice(-2);
    let h = ("0" + date.getHours()).slice(-2);
    let s = ("0" + date.getSeconds()).slice(-2);
    let i = ("0" + date.getMinutes()).slice(-2);
    let tglPembayaran = `${y}-${m}-${d} ${h}:${i}:${s}`;
    let pesananID = (request.body.pesananID);
    let data = {
        statusBayar: "dibayar",
        tglPembayaran: tglPembayaran
    }
    let sql = "update pesanans set ? where pesananID = ?";
    db.query(sql, [data, pesananID], (error, result) => {
        if (error) {
            throw error;
        } else {
            let data = {
                totalBayar: request.body.totalBayar
            }
            let sql = "update detail_pesanans set ? where pesananID = ?";
            db.query(sql, [data, pesananID], (error, result) => {
                if (error) {
                    throw error;
                } else {
                    response.json({
                        message: `Successfully update transaction where id = ${pesananID}.`
                    })
                }
            })
        }
    })
}
*/

// update data
exports.updatePesanan = (request, response) => {
    let dataPesanan = {
        namaCust: request.body.namaCust,
        alamat: request.body.alamat,
        noTelp: request.body.noTelp,
        staff: request.body.staff,
        jenisCuci: request.body.jenisCuci,
        tanggalMasuk: request.body.tanggalMasuk,
        tanggalKeluar: request.body.tanggalKeluar,
        lamaPengerjaan: request.body.lamaPengerjaan,
        totalHarga: request.body.totalHarga,
        keterangan: request.body.keterangan
    }
    let pesananID = request.params.id
    pesananModel.update(dataPesanan, { where: { pesananID: pesananID } })
        .then(result => {
            return response.json({
                success: true,
                message: `Data user has been updated`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}


// penghapusan data
exports.deletePesanan = (request, response) => {
    let pesananID = request.params.id

    pesananModel.destroy({ where: { pesananID: pesananID } })
        .then(result => {
            return response.json({
                success: true,
                message: `Data user has been deleted`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}


