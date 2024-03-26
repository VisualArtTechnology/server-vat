const { Portofolio, categoryPortofolio,Testimoni } = require("../models/index");
const {upload} = require('../helpers/multerHelper')
const multer = require('multer')
const Fs = require('fs').promises
const fs = require('fs')
const path = require('path');
class Controller {
  static async getCategoryPortofolio(req, res) {
    try {
      const data = await categoryPortofolio.findAll();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "internal server error",
      });
    }
  }
  static async postCategoryPortofolio(req, res) {
    try {
      const { name } = req.body;
      const data = await categoryPortofolio.create({
        name: name,
      });
      res.status(201).json({
        msg: "created succesfuly",
        data: data,
      });
    } catch (error) {
      console.log(error);
      if (error.name === "SequelizeValidationError") {
        const validationErrors = error.errors.map((err) => err.message);

        res.status(400).json(validationErrors);
      } else {
        console.error(error.message);
        res.status(500).json({ msg : 'internal server error'});
      }
    }
  }
  static async getPortofolio(req,res) {
    try {
        const data =await Portofolio.findAll({
            include : [
                categoryPortofolio,Testimoni
            ]
        })
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        
    }
  } 
  static async postPortofolio(req,res,err) {
    try {
      upload.single('image')(req,res, async function(err) {
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
            const {name,details,title,categoryPortofolioId} = req.body
            const data = await Portofolio.create({
                name : name,
                details : details,
                image : req.file.path,
                title : title,
                categoryPortofolioId : categoryPortofolioId
            })
            res.status(201).json({
                data
            })
        })
    } catch (error) {
        console.log(error,'ni dari cahtch');
       
    }
  }
  static async deletePortofolio(req, res, err) {
    try {
      const portofolioId = req.params.id;
      const portofolio = await Portofolio.findByPk(portofolioId);
  
      if (!portofolio) {
        throw {
          name: 'Data Not found'
        };
      }

      await portofolio.destroy();
  
 
      try {
        const imagePath = path.join(__dirname, '..', portofolio.image); // adjust the path as needed
        await Fs.unlink(imagePath);
      } catch (error) {
        // Handle the case where the image file does not exist
        console.log('Image file not found:', error.message);
      }
  
      res.status(200).json({ message: 'Data portofolio berhasil dihapus' });
    } catch (error) {
      console.log(error.name);
      if (error.name === 'Data Not found') {
        res.status(404).json({ error: 'Data tidak ditemukan' });
      } else {
        res.status(500).json({ error: 'Terjadi kesalahan dalam menangani permintaan', details: error.message });
      }
    }
  }
    static async detailPortofolio(req,res) {
      try {
        const {id} = req.params 
        const product = await Portofolio.findByPk(id,{
          include : [
            categoryPortofolio,Testimoni
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
  static async editPortofolio(req, res, err) {
    try {
        upload.single('image')(req, res, async function (err) {
            // Handle file upload errors
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ error: 'Terjadi kesalahan dalam unggah file', details: err.message });
            } else if (err) {
                return res.status(500).json({ error: 'Terjadi kesalahan dalam menangani permintaan', details: err.message });
            }

            // Check if a new file was uploaded
            const newImage = req.file ? req.file.path : null;

            // Get the existing portfolio data
            const data = await Portofolio.findByPk(req.params.id);

            // Check if the portfolio exists
            if (!data) {
                return res.status(404).json({ error: 'Portofolio tidak ditemukan' });
            }

            // Delete the old image file if a new file was uploaded
            if (newImage && data.image) {
                fs.unlinkSync(data.image);
            }

            // Update portfolio data with new information
            const { name, details, title, categoryPortofolioId } = req.body;
            data.name = name || data.name;
            data.details = details || data.details;
            data.image = newImage || data.image;
            data.title = title || data.title;
            data.categoryPortofolioId = categoryPortofolioId || data.categoryPortofolioId;

            // Save the updated portfolio
            await data.save();

            res.status(200).json({
                updatedPortofolio: data
            });
        });
    } catch (error) {
        console.log(error, 'Error in editPortofolio');
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


  
  static async deleteCategoryPortofolio(req, res) {
    try {
      const product = await categoryPortofolio.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!product) {
        throw {
          name: "Category Not found",
        };
      }
      await categoryPortofolio.destroy({
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
  static async detailCategory(req,res,next) {
    try {
        const {id} = req.params
        const data = await categoryPortofolio.findByPk(id)
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
static async updateCategory(req,res) {
  try {
      const {id} = req.params
      // console.log(id);
      const {name} = req.body
      const data = await categoryPortofolio.findByPk(id)
      // console.log(data);
      if(!data) {
          throw {
              name : 'category not found'
          }
      }
      await categoryPortofolio.update({
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


}

module.exports = Controller;
