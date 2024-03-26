const {Blogs,categoryBlogs} = require('../models/index')
const {uploadBlogs} = require('../helpers/multerHelper')
const multer = require('multer')
const Fs = require('fs').promises
const fs = require('fs')
const path = require('path');
class Controller {
    static async getCategoryBlogs(req,res) {
        try {
            const data = await categoryBlogs.findAll()
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
        }
    }
    static async postCategoryBlogs(req,res) {
        try {
            const data = await categoryBlogs.create({
                name : req.body.name
            })
            res.status(201).json(data)
        } catch (error) {
            console.log(error);
        }
    }
    static async deleteCategoryPortofolio(req, res) {
      try {
        const data = await categoryBlogs.findOne({
          where: {
            id: req.params.id,
          },
        });
        if (!data) {
          throw {
            name: "Category Not found",
          };
        }
        await categoryBlogs.destroy({
          where: {
            id: req.params.id,
          },
        });
        res.status(200).json({
          msg: "Category deleted Successfuly",
        });
      } catch (error) {
        console.log(error);
      }
    }
    static async detailCategoryBlogs(req,res,next) {
      try {
          const {id} = req.params
          const data = await categoryBlogs.findByPk(id)
          if(!data) {
              throw {
                  name : 'category not found'
              }
          }
          res.status(200).json(data)
      } catch (error) {
          console.log(error);
          next(error)
      }
  }
  static async updateCategoryBlogs(req,res) {
    try {
        const {id} = req.params
        // console.log(id);
        const {name} = req.body
        const data = await categoryBlogs.findByPk(id)
        // console.log(data);
        if(!data) {
            throw {
                name : 'category not found'
            }
        }
        await categoryBlogs.update({
            name
        },{
            where : {id}
        })
        res.status(200).json({
            message : 'succes updated'
        })
    } catch (error) {
        console.log(error);
    }
  }
    static async getBlogs(req,res) {
        try {
            const data = await Blogs.findAll({
                include : [
                    categoryBlogs
                ]
            })
            
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
        }
    }
    static async postBlogs(req,res,err) {
        try {
          uploadBlogs.single('image')(req,res, async function(err) {
              console.log(err,'ni err');
                if (err instanceof multer.MulterError) {
                    return res.status(400).json({ error: 'Terjadi kesalahan dalam unggah file', details: err.message });
                  }            
                   else if (err) {
                    return res.status(500).json({ error: 'Terjadi kesalahan dalam menangani permintaan', details: err.message });
                  }
                // console.log(req.file);
                if(!req.file) {
                    return res.status(401).json({error : 'silahkan massukan image'})
                }
                const {name,details,categoryBlogId} = req.body
                if (!categoryBlogId) {
                  return res.status(400).json({ err: 'Category Product harus diisi' });
              }
  
                const data = await Blogs.create({
                    name : name,
                    details : details,
                    image : req.file.path,
                    categoryBlogId : categoryBlogId
                })
                res.status(201).json({
                    data
                })
            })
        } catch (error) {
            console.log(error)
           
        }
      }
      static async editBlogs(req, res, err) {
        try {
            uploadBlogs.single('image')(req, res, async function (err) {
                // Handle file upload errors
                if (err instanceof multer.MulterError) {
                    return res.status(400).json({ error: 'Terjadi kesalahan dalam unggah file', details: err.message });
                } else if (err) {
                    return res.status(500).json({ error: 'Terjadi kesalahan dalam menangani permintaan', details: err.message });
                }
    
                // Check if a new file was uploaded
                const newImage = req.file ? req.file.path : null;
    
             
                const data = await Blogs.findByPk(req.params.id);
    
      
                if (!data) {
                    return res.status(404).json({ error: 'Blogs tidak ditemukan' });
                }
    
                if (newImage && data.image) {
                    fs.unlinkSync(data.image);
                }
    
          
                const { name, details,  categoryBlogId } = req.body;
               
                data.name = name || data.name;
                data.details = details || data.details;
                data.image = newImage || data.image; 
                data.categoryBlogId = categoryBlogId || data.categoryBlogId;
    
                // Save the updated portfolio
                await data.save();
    
                res.status(200).json({
                    updatedBlogs: data
                });
            });
        } catch (error) {
            console.log(error, 'Error in editBlogs');
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    static async detailBlogs(req,res) {
      try {
        const {id} = req.params 
        const product = await Blogs.findByPk(id,{
          include : [
            categoryBlogs
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
      static async deleteBlogs(req, res, err) {
        try {
          const blogsId = req.params.id;
          const blogs = await Blogs.findByPk(blogsId);
      
          if (!blogs) {
            throw {
              name: 'Data Not found'
            };
          }
    
          await blogs.destroy();
      
     
          try {
            const imagePath = path.join(__dirname, '..', blogs.image); // adjust the path as needed
            await Fs.unlink(imagePath);
          } catch (error) {
            // Handle the case where the image file does not exist
            console.log('Image file not found:', error.message);
          }
      
          res.status(200).json({ message: 'Data Blogs berhasil dihapus' });
        } catch (error) {
          console.log(error.name);
          if (error.name === 'Data Not found') {
            res.status(404).json({ error: 'Data tidak ditemukan' });
          } else {
            res.status(500).json({ error: 'Terjadi kesalahan dalam menangani permintaan', details: error.message });
          }
        }
      }
      static async deleteCategoryBlogs(req, res) {
        try {
          const product = await categoryBlogs.findOne({
            where: {
              id: req.params.id,
            },
          });
          if (!product) {
            throw {
              name: "Category Not found",
            };
          }
          await categoryBlogs.destroy({
            where: {
              id: req.params.id,
            },
          });
          res.status(200).json({
            msg: "Category deleted Successfuly",
          });
        } catch (error) {
          console.log(error);
        }
      }
}

module.exports = Controller