import { Request, Response } from 'express'

import Manifest from '../models/manifest.model'
import dotenv from 'dotenv';
dotenv.config();

import cloudinary from 'cloudinary'

cloudinary.v2.config({

    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_APY_KEY,
    api_secret: process.env.CLOUDINARY_APY_SECRET

})


export class DeleteFileService {


    /**
    Eliminar archivo por ID
    */
    static deleteFile = async (req: Request, res: Response) => {

        try {

            const { _id } = req.params
            const file = await Manifest.findByIdAndDelete(_id);
            //@ts-ignore
            const result = await cloudinary.v2.uploader.destroy(file.public_id)
            return res.status(200).json({
                result,
                message: "archivo eliminado satisfactoriamente"
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