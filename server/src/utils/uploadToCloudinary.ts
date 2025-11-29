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
