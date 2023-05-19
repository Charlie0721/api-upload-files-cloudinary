import { Router } from 'express'

import { UploadFileToCloudinaryService } from '../services/manifest-services/UploadFileToCloudinaryService';
import { DeleteFileService } from '../services/manifest-services/DeleteFileService';
import { GetFileService } from '../services/manifest-services/GetFileService';
import {SearchFilesByProductsIDService  } from '../services/manifest-services/SearchFilesByProductsIDService';
import { GetFilesService } from '../services/manifest-services/GetFilesService';
import {SearchFileByNameService  } from '../services/manifest-services/SearchFileByNameService';
import {SignupService} from '../services/user-services/SignupService';
import {LoginService} from '../services/user-services/SigninService'
import {GetFilesByManifestId} from '../services/manifest-services/GetFilesByPRoductsId';
const router = Router()

router.post('/upload-file',UploadFileToCloudinaryService.uploadFiles )
router.post('/search-products-id/', SearchFilesByProductsIDService.searchByProductsID)
router.get('/get-files', GetFilesService.getFiles)
router.get('/get-file/:_id',GetFileService.getFile )
router.get('/get-file-by-name/',SearchFileByNameService.searchFileByName )
router.get('/get-files-by-manifestposid/:manifestPosId',GetFilesByManifestId.getFiles )
router.delete('/delete-file/:_id',DeleteFileService.deleteFile )
router.post('/signup', SignupService.signUp)
router.post('/signin', LoginService.signin)


export default router