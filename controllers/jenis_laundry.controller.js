const jenisModel = require(`../models/index`).jenis_laundry
const md5 = require(`md5`)
const Op = require(`sequelize`).Op
const express = require('express');

// mendapatkan semua data
exports.getAllJenis= async (request, response) => {
    let jenis = await jenisModel.findAll()
    return response.json({
        success: true,
        data: jenis,
        message: `All data have been loaded`
    })
}

// cari data
exports.findJenis = async (request, response) => {
    let keyword = request.params.key
    let jenis = await jenisModel.findAll({
        where: {
            [Op.or]: [
                { jenisID: { [Op.substring]: keyword } },
                { jenisCuci: { [Op.substring]: keyword } },
                { namaCuci: { [Op.substring]: keyword } },
                { harga: { [Op.substring]: keyword } },
            ]
        }
    })
    return response.json({
        success: true,
        data: jenis,
        message: `All Users have been loaded`
    })
}

// penambahan data
exports.addJenis = (request, response) => {
    let newJenis = {
        jenisCuci: request.body.jenisCuci,
        namaCuci: request.body.namaCuci,
        harga: request.body.harga
    }

    jenisModel.create(newJenis)
        .then(result => {
            return response.json({
                success: true,
                data: result,
                message: `New user has been inserted`
            })
        })
        .catch(error => {
            return response.json({ 
                success: false,
                message: error.message
            })
        })
}

// update data
exports.updateJenis = (request, response) => {
    let dataJenis = {
        jenisCuci: request.body.jenisCuci,
        namaCuci: request.body.namaCuci,
        harga: request.body.harga
    }
    let jenisID = request.params.id
    jenisModel.update(dataJenis, { where: { jenisID : jenisID } })
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
exports.deleteJenis = (request, response) => {
    let jenisID = request.params.id

    jenisModel.destroy({ where: { jenisID: jenisID } })
        .then(result => {
            return response.json({
                success: true,
                message: `udah kehapus cuy`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}

