
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


    const productId: string[] = (req.query.productId as string).split(",");
    const productIdNumbers: number[] = [];

    productId.forEach((id: string) => {
      const parsedId = Number(id);
      if (!isNaN(parsedId)) {
        productIdNumbers.push(parsedId);
      }
    });

    if (productIdNumbers.length === 0) {
      res.status(400).send('Invalid productId parameter');
      return;
    }

    try {
      const response = await Manifest.find({
        productId: { $in: productIdNumbers, $ne: [productId[0]] }
      }).exec();
      res.send(response);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }



  }







}