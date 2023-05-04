import { Request, Response } from 'express'
import { SendDataManifest } from '../interfaces/Send_Data.interface'
import Manifest from '../models/manifest.model'
import dotenv from 'dotenv';
dotenv.config();
import * as fs from 'fs-extra'

import cloudinary from 'cloudinary'

cloudinary.v2.config({

    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_APY_KEY,
    api_secret: process.env.CLOUDINARY_APY_SECRET

})
export class UploadFileService {


    static getFiles = async (req: Request, res: Response) => {

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


    static uploadFiles = async (req: Request, res: Response) => {

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
                public_id: result.public_id
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

    static deleteFile = async (req: Request, res: Response) => {

        try {

            const { _id } = req.params
            const file = await Manifest.findByIdAndDelete(_id);
            //@ts-ignore
            const result = await cloudinary.v2.uploader.destroy(file.public_id)
            return res.status(200).json({result,
            message:"archivo eliminado satisfactoriamente"})

        } catch (error) {
            console.log(error)
            return res.json({
                status: 500,
                error: error
            })
        }
    }

}


