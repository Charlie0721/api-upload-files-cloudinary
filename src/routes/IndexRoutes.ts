import { Router } from 'express'

import { UploadFileService } from '../services/SendFile.Service'
const router = Router()

router.post('/upload-file', UploadFileService.uploadFiles)
router.get('/get-files', UploadFileService.getFiles)
router.delete('/delete-file/:_id', UploadFileService.deleteFile)

export default router