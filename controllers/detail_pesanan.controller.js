const detailModel = require(`../models/index`).detail
const md5 = require(`md5`)
const Op = require(`sequelize`).Op

// mendapatkan semua data
exports.getAllDetail = async (request, response) => {
    let details = await detailModel.findAll()
    return response.json({
        success: true,
        data: details,
        message: `All data have been loaded`
    })
}

// cari data
exports.findDetail = async (request, response) => {
    let keyword = request.params.key
    let details = await detailModel.findAll({
        where: {
            [Op.or]: [
                { detailID: { [Op.substring]: keyword } },
                { pesananID: { [Op.substring]: keyword } }
            ]
        }
    })
    return response.json({
        success: true,
        data: details,
        message: `All Users have been loaded`
    })
}

// penambahan data
exports.addDetail = (request, response) => {
    let newDetail = {
        pesananID: request.body.pesananID
    }

    detailModel.create(newDetail)
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
exports.updateDetail = (request, response) => {
    let dataDetail = {
        pesananID: request.body.pesananID
    }
    let pesananID = request.params.id
    pesananModel.update(dataPesanan, { where: { pesananID : pesananID } })
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
exports.deleteDetail = (request, response) => {
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


