import { Request, Response } from 'express'
import Manifest from '../models/manifest.model'

import cloudinary from 'cloudinary'

cloudinary.v2.config({

    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_APY_KEY,
    api_secret: process.env.CLOUDINARY_APY_SECRET

})
export class SearchFileByNameService {

    static searchFileByName = async (req: Request, res: Response) => {

        try {
            const originalFileName: string = req.query.originalFileName ? req.query.originalFileName.toString() : '';
            const response = await Manifest.find({

                originalFileName

            })
            if (response.length > 0) {

                return res.status(200).json({
                    message: "archivo encontrado satisfactoriamente",
                    response
                })

            } else {
                res.status(404).json({
                    message: "recurso no encontrado !"
                })
            }


        } catch (error) {
            console.log(error)
            return res.json(error)
        }


    }

}