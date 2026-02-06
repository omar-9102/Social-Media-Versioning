const cloudinary = require('../config/cloudinary');
const { Readable } = require('stream');
const fs = require('fs')

class CloudinaryStorage {
    async uploadStream(fileStream, options = {}) {
        return new Promise((resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream(
                { 
                    ...options, 
                    resource_type: 'auto',
                    // Optimization: Use 'async' to return response before transformations finish
                    async: true 
                },
                (err, result) => {
                    if (err) return reject(err);
                    resolve({
                        url: result.secure_url,
                        publicId: result.public_id,
                        type: result.resource_type === 'video' ? 'VIDEO' : 'IMAGE',
                    });
                }
            );

            fileStream.pipe(upload);
        });
    }

    // Modern .NET-like approach: Accept the stream directly from Multer
    async uploadFile(file, options = {}) {
        if (!file || !file.path) {
            throw new Error('Expected file.path from diskStorage');
        }

        // Creating a stream from the temp file
        const fileStream = fs.createReadStream(file.path);
        
        try {
            const result = await this.uploadStream(fileStream, options);
            
            // Cleanup: Use fs.promises for cleaner async code
            await fs.promises.unlink(file.path); 
            
            return result;
        } catch (error) {
            // Cleanup on failure to prevent disk bloat
            if (fs.existsSync(file.path)) await fs.promises.unlink(file.path);
            throw error;
        }
    }

    async delete(publicId) {
        return cloudinary.uploader.destroy(publicId);
    }
}

module.exports = new CloudinaryStorage();