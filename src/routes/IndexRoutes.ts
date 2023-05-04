import {Router} from 'express'

import { UploadFileService } from '../services/SendFile.Service'
const router=Router()

router.post('/upload-file',UploadFileService.uploadFiles )
router.get('/get-files',UploadFileService.getFiles )

export default router