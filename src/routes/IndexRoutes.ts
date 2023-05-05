import { Router } from 'express'

import { UploadFileToCloudinaryService } from '../services/UploadFileToCloudinaryService';
import { DeleteFileService } from '../services/DeleteFileService';
import { GetFileService } from '../services/GetFileService';
import {SearchFilesByProductsIDService  } from '../services/SearchFilesByProductsIDService';
import { GetFilesService } from '../services/GetFilesService';
import {SearchFileByNameService  } from '../services/SearchFileByNameService';

const router = Router()

router.post('/upload-file',UploadFileToCloudinaryService.uploadFiles )
router.post('/search-products-id/', SearchFilesByProductsIDService.searchByProductsID)
router.get('/get-files', GetFilesService.getFiles)
router.get('/get-file/:_id',GetFileService.getFile )
router.get('/get-file-by-name/',SearchFileByNameService.searchFileByName )
router.delete('/delete-file/:_id',DeleteFileService.deleteFile )


export default router