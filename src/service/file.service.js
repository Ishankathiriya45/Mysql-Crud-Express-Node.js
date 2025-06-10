const fs = require("fs");
const path = require("path");
const { generateFileName, getFileUrl } = require("../util/common.util");

class FileService {
    uploadFile = async (file, folderName, storageType) => {
        try {
            if (storageType == "disk") {
                if (!file) {
                    throw new Error("No file provided");
                }

                let uploadDir = path.join(__dirname, "../../public/upload", folderName)

                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true })
                }

                let fileName = generateFileName(file.originalname)
                let filePath = path.join(uploadDir, fileName)

                await fs.promises.writeFile(filePath, file.buffer);
                
                return { fileName, location: getFileUrl(folderName, fileName) }
            }
        } catch (error) {
            throw new Error(`File upload failed: ${error.message}`);
        }
    }
}

module.exports = FileService;