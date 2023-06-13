import { Request, Response } from 'express'
import Manifest from '../../models/manifest.model';

import cloudinary from 'cloudinary'

cloudinary.v2.config({

    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_APY_KEY,
    api_secret: process.env.CLOUDINARY_APY_SECRET

})


export class DonwloadManifestService {
    
    static downloadManifest=(req: Request, res: Response)=>{

        const public_id = req.params.public_id
        const downloadManifest= cloudinary.v2.url(public_id,{
            resource_type:"image",
            secure: true

        })
        res.json(downloadManifest)
    }

}