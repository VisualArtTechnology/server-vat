const multer = require('multer')
const path = require('path')    
const imageFilter = function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
    return cb(null, true);
    } else {
    cb('Error: File harus berupa gambar dengan format jpeg, jpg, atau png!', false);
    }
}  

const storage = multer.diskStorage({
    destination : function(req,file,cb) {
        cb(null ,'./assets/Portofolio')
    },
    filename: function (req, file, cb) {
        // Menggunakan timestamp sebagai nama file untuk menghindari konflik
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
},
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
    fileFilter: imageFilter,
    });


const storageBlogs = multer.diskStorage({
    destination : function(req,file,cb) {
        cb(null ,'./assets/Blogs')
    },
    filename: function (req, file, cb) {
        // Menggunakan timestamp sebagai nama file untuk menghindari konflik
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
},
})

const uploadBlogs = multer({
    storage : storageBlogs,
    limits : {fileSize : 2 * 1024 * 1024},
    fileFilter : imageFilter
})
const storageProducts = multer.diskStorage({
    destination : function(req,file,cb) {
        cb(null ,'./assets/Products')
    },
    filename : function(req,file,cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
})

const uploadProducts = multer({
    storage : storageProducts,
    limits : {fileSize : 2 * 1024 * 1024},
    fileFilter : imageFilter
})
module.exports = {upload,uploadBlogs,uploadProducts}