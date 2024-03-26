const {Product,categoryProduct,Booking} = require('../models/index')
const {uploadProducts, uploadBlogs} = require('../helpers/multerHelper')
const multer = require('multer')
const Fs = require('fs').promises
const fs = require('fs')
const path = require('path');


class Controller {

    static async getAllCategoryProduct(req,res) {
        try {
            const data = await categoryProduct.findAll()
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
        }
    }
    static async getCategoryProductById(req,res) {
        try {
            const {id} = req.params
            const data = await categoryProduct.findByPk(id)
            if (!data) {
                throw {
                    name : 'Category Not found'
                }
            }
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
        }
    }
    static async postCategoryProduct(req,res) {
        try {
            const data = await categoryProduct.create({
                name : req.body.name
            })
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
        }
    }
    static async updateCategoryProduct(req,res) {
        const {id} = req.params
        const data = await categoryProduct.findByPk(id)

        if(!data) {
            throw {
                name : 'category Not found'
            }
        }
        await categoryProduct.update({
            name : req.body.name
        }, {
            where : {id}
        })
        res.status(201).json({
            message : 'updated successfuly',
        })
    }
    static async deleteCategoryProducts(req,res) {
        const {id} = req.params
        const data = await categoryProduct.findByPk(id)

        if(!data) {
            throw {
                name : 'category Not found'
            }
        }
         await categoryProduct.destroy({
            where : {id}
        })
        
        res.status(200).json({
            message : `Delete ${data.name} successfuly`
        })
    }
    static async getAllProducts(req, res) {
        try {
            const page = parseInt(req.query.page) || 1; // Mengambil nomor halaman dari query string, defaultnya 1 jika tidak ada
            const limit = parseInt(req.query.limit) || 9; // Mengambil jumlah item per halaman dari query string, defaultnya 10 jika tidak ada
    
            const offset = (page - 1) * limit; // Menghitung offset untuk query
    
            const data = await Product.findAndCountAll({
                include: [categoryProduct, Booking],
                limit: limit,
                offset: offset
            });
    
            const totalPages = Math.ceil(data.count / limit); // Menghitung total halaman berdasarkan jumlah data dan limit
    
            const response = {
                totalProducts: data.count,
                totalPages: totalPages,
                currentPage: page,
                products: data.rows
            };
    
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    static async getAllProductsAdmin(req,res) {
        try {
            const data = await Product.findAll({
                include : [
                    categoryProduct
                ]
            })
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
        }
    }
    static async postProduct(req,res,err) {
        try {
          uploadProducts.single('imgProduct')(req,res, async function(err) {
              console.log(err,'ni err');
                if (err instanceof multer.MulterError) {
                    return res.status(400).json({ error: 'Terjadi kesalahan dalam unggah file', details: err.message });
                  }
                
                   else if (err) {
                    return res.status(500).json({ error: 'Terjadi kesalahan dalam menangani permintaan', details: err.message });
                  }
                if(!req.file) {
                    return res.status(401).json({error : 'silahkan massukan image'})
                }
                const {name,details,categoryProductId,projectResults,status} = req.body
              
                const data = await Product.create({
                    name : name,
                    details : details,
                    imgProduct : req.file.path,
                    categoryProductId : categoryProductId,
                    projectResults : projectResults,
                    status : status
                })
                res.status(201).json({
                    data
                })
            })
        } catch (error) {
            console.log(error,'ni dari cahtch');
           
        }
      }
      static async getProductById(req,res) {
        try {
          const {id} = req.params 
          const product = await Product.findByPk(id,{
            include : [
              categoryProduct,Booking
          ]
          })
          if(!product) {
              throw {
                name : 'Product Not found'
              }
          }
          res.status(200).json(product)
        } catch (error) {
          console.log(error);
        }
      }
      static async deleteProduct(req, res, err) {
        try {
          const Id = req.params.id;
          const data = await Product.findByPk(Id);
      
          if (!data) {
            throw {
              name: 'Data Not found'
            };
          }
    
          await data.destroy();
      
     
          try {
            const imagePath = path.join(__dirname, '..', data.imgProduct); // adjust the path as needed
            await Fs.unlink(imagePath);
          } catch (error) {
            // Handle the case where the image file does not exist
            console.log('Image file not found:', error.message);
          }
      
          res.status(200).json({ message: 'Data data berhasil dihapus' });
        } catch (error) {
          console.log(error.name);
          if (error.name === 'Data Not found') {
            res.status(404).json({ error: 'Data tidak ditemukan' });
          } else {
            res.status(500).json({ error: 'Terjadi kesalahan dalam menangani permintaan', details: error.message });
          }
        }
      }
      static async editProducts(req, res, err) {
        try {
            uploadProducts.single('imgProduct')(req, res, async function (err) {
                if (err instanceof multer.MulterError) {
                    return res.status(400).json({ error: 'Terjadi kesalahan dalam unggah file', details: err.message });
                } else if (err) {
                    return res.status(500).json({ error: 'Terjadi kesalahan dalam menangani permintaan', details: err.message });
                }
                const newImage = req.file ? req.file.path : null;
                    const data = await Product.findByPk(req.params.id);
                if (!data) {
                    return res.status(404).json({ error: 'Portofolio tidak ditemukan' });
                }

                if (newImage && data.imgProduct) {
                    fs.unlinkSync(data.imgProduct);
                }
                const { name, details, projectResults, categoryProductId,status } = req.body;
                data.name = name || data.name;
                data.details = details || data.details;
                data.imgProduct = newImage || data.imgProduct   ;
                data.projectResults = projectResults || data.projectResults
                data.categoryProductId = categoryProductId || data.categoryProductId;
                data.status = status || data.status
    

                await data.save();
    
                res.status(200).json({
                    updatedProduct: data
                });
            });
        } catch (error) {
            console.log(error, 'Error in edit Product');
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = Controller