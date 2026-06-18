import { cloudinaryUploadTypes } from '@ideanick/shared/src/cloudinary'
import { getKeysAsArray } from '@ideanick/shared/src/getKeysAsArray'
import z from 'zod'

export const ZPrepareCloudinaryUploadTrpcInput = z.object({
  type: z.enum(getKeysAsArray(cloudinaryUploadTypes)),
})
