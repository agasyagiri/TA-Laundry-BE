const jenisModel = require(`../models/index`).jenis_laundry
const Op = require(`sequelize`).Op
const upload = require(`./upload_image`).single(`image`)
const path = require(`path`)
const fs = require(`fs`)

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
        upload(request, response, async error => {
            if (error) {
                return response.json({ message: error })
            }
            if (!request.file) {
                return response.json({ message: `Nothing to Upload` })
            }
            let newJenis = {
                jenisCuci: request.body.jenisCuci,
                namaCuci: request.body.namaCuci,
                harga: request.body.harga,
                image: request.file.filename

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
        })
}

// // update data
// exports.updateJenis = (request, response) => {
//     let dataJenis = {
//         jenisCuci: request.body.jenisCuci,
//         namaCuci: request.body.namaCuci,
//         harga: request.body.harga
//     }
//     let jenisID = request.params.id
//     jenisModel.update(dataJenis, { where: { jenisID : jenisID } })
//         .then(result => {
//             return response.json({
//                 success: true,
//                 message: `Data user has been updated`
//             })
//         })
//         .catch(error => {
//             return response.json({
//                 success: false,
//                 message: error.message
//             })
//         })
// }

exports.updateJenis = async (request, response) => {
    upload(request, response, async error => {
        if (error) {
            return response.json({ message: error })
        }
        
        let jenisID = request.params.id

        let dataJenis = {
            jenisCuci: request.body.jenisCuci,
            namaCuci: request.body.namaCuci,
            harga: request.body.harga

        }

        if (request.file) {
            const selectedJenis = await jenisModel.findOne({
                where: { jenisID : jenisID }
            })

            const oldImage = selectedJenis.image

            const pathImage = path.join(__dirname, `../image`, oldImage)

            if (fs.existsSync(pathImage)) {
                fs.unlink(pathImage, error => console.log(error))
            }

            dataJenis.image = request.file.filename    
        }

        jenisModel.update(dataJenis, { where: { jenisID : jenisID } })
            .then(result => {
                return response.json({
                    success: true,
                    message: `Data event has been updated`
                })
            })
            .catch(error => {
                return response.json({
                    success: false,
                    message: error.message
                })
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

