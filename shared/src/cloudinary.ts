// eslint-disable-next-line node/no-process-env
const cloudinaryCloudName = process.env.VITE_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME
const cloudinaryUrl = `https://res.cloudinary.com/${cloudinaryCloudName}/image/upload/`

type CloudinaryUploadType = {
  folder: string
  transformation: string
  format: string
  presents: Record<string, string>
}

export const cloudinaryUploadTypes = {
  avatar: {
    folder: 'avatars',
    transformation: 'w_400,h_400,c_fill',
    format: 'png',
    presents: {
      small: 'w_200,h_200,c_fill',
      medium: 'w_400,h_400,c_fill',
    },
  },
  image: {
    folder: 'images',
    transformation: 'w_1000,,h_1000,c_limit',
    format: 'jpg',
    presents: {
      preview: 'w_200,h_200,c_fit,q_80',
      large: 'w_1000,h_1000,c_limit,q_80',
    },
  },
} satisfies Record<string, CloudinaryUploadType>
