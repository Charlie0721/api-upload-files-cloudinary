import { Request, Response } from 'express'
import { SendDataManifest } from '../../interfaces/Send_Data.interface'
import Manifest from '../../models/manifest.model'
import dotenv from 'dotenv';
dotenv.config();
import * as fs from 'fs-extra'

import cloudinary from 'cloudinary'

cloudinary.v2.config({

    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_APY_KEY,
    api_secret: process.env.CLOUDINARY_APY_SECRET

})

export class UploadFileToCloudinaryService{

   /**
    Subir archivos
    */
    static uploadFiles = async (req: Request, res: Response):Promise<Response> => {

        try {
            const newFile: SendDataManifest = req.body
            //@ts-ignore
            const newPath = req.file && req.file.path;
          
            //@ts-ignore
            if (!newPath) {
                return res.status(400).json({ error: "Debe cargar un archivo PDF" });
            }

            //@ts-ignore
            const result = await cloudinary.v2.uploader.upload(newPath);
          
            const newManifest = new Manifest({
                purchaseNumber: newFile.purchaseNumber,
                productId: newFile.productId,
                imageURL: result.url,
                public_id: result.public_id,
                originalFileName:result.original_filename
            })
            //@ts-ignore
            await newManifest.save()
            //@ts-ignore
            await fs.unlink(req.file.path)

            return res.status(200).json({
                status: 200,
                mesagge: "pdf successfully uploaded to cloudinary",
                newManifest

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