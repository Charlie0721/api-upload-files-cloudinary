import { Schema, model } from 'mongoose'

const manifestPhoto = new Schema({

    purchaseNumber: {
        type: Number,
          },
    productId: {
        type: [Number],
    },
    imageURL: String,
    public_id: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

export default model('Manifest', manifestPhoto)