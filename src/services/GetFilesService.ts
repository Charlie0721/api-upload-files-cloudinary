import { Request, Response } from 'express'
import Manifest from '../models/manifest.model'
import cloudinary from 'cloudinary'

cloudinary.v2.config({

    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_APY_KEY,
    api_secret: process.env.CLOUDINARY_APY_SECRET

})

export class GetFilesService {

    /**
      Obtener todos los archivos pdf
      */
    static getFiles = async (req: Request, res: Response):Promise<Response> => {

        try {

            const files = await Manifest.find()
            if (files.length > 0) {
                return res.json({
                    status: 200,
                    mesagge: "pdf found successfully",
                    files
                })
            }
            return res.json({
                status: 404,
                message: "files not found"
            })


        } catch (error) {
            console.log(error)
            return res.json({
                status: 500,
                error: error
            })
        }


    }


}