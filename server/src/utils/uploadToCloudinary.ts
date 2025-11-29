import cloudinary from "../config/cloudinary";
import fs from "fs";

interface UploadResult {
  url: string;
  public_id: string;
}

export const uploadToCloudinary = async (
  filePath: string,
  folder: string
): Promise<UploadResult> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "auto",
    });

    // Remove temp file after upload if it exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Cloudinary upload failed");
  }
};

export const uploadMultipleToCloudinary = async (
  filePaths: string[],
  folder: string
): Promise<UploadResult[]> => {
  const uploadPromises = filePaths.map((path) =>
    uploadToCloudinary(path, folder)
  );
  return Promise.all(uploadPromises);
};

// Upload buffer to Cloudinary (for multer memory storage)
export const uploadBufferToCloudinary = async (
  buffer: Buffer,
  folder: string,
  filename: string
): Promise<UploadResult> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
        public_id: filename,
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(new Error("Cloudinary upload failed"));
        } else if (result) {
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
          });
        }
      }
    );
    uploadStream.end(buffer);
  });
};

// Upload multiple buffers to Cloudinary
export const uploadMultipleBuffersToCloudinary = async (
  files: Array<{ buffer: Buffer; filename: string }>,
  folder: string
): Promise<UploadResult[]> => {
  const uploadPromises = files.map((file) =>
    uploadBufferToCloudinary(file.buffer, folder, file.filename)
  );
  return Promise.all(uploadPromises);
};

