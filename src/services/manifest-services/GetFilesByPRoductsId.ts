
import { Request, Response } from 'express'
import Manifest from '../../models/manifest.model';
import cloudinary from 'cloudinary'

cloudinary.v2.config({

  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_APY_KEY,
  api_secret: process.env.CLOUDINARY_APY_SECRET

})

export class GetFilesByPRoductsId {

  static getFiles = async (req: Request, res: Response) => {
    const manifestPosId: string[] = (req.params.manifestPosId as string).split(",");
    const manifestPosIdNumbers: number[] = [];
    manifestPosId.forEach((id: string) => {
      const parsedId = Number(id);
      if (!isNaN(parsedId)) {
        manifestPosIdNumbers.push(parsedId);
      }
    });
    if (manifestPosIdNumbers.length === 0) {
      res.status(400).send('Invalid manifestPosId parameter');
      return;
    }
    try {
      const response = await Manifest.find({
        manifestPosId: { $in: manifestPosIdNumbers, $ne: [manifestPosId[0]] }
      }).exec();
      res.send(response);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }

   
  }

}