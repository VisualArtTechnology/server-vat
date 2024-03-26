const express = require('express')
const router = express.Router()
const ControllerPortofolio = require('../controllers/controllerPortofolio')
const path = require('path')
const ControllerBlogs = require('../controllers/controllerBlogs')
const ControllerProduct = require('../controllers/controllerProduct')
const ControllerAdmin = require('../controllers/controllerAdmin')
const ControllerTestimoni = require('../controllers/ControllerTestimonial')
const ControllerBooking = require('../controllers/ContollerBooking')
// portofolio
router.get('/', async (req, res) => {
    res.send('API server VAT');
});
router.get('/categoryPortofolio',ControllerPortofolio.getCategoryPortofolio)
router.post('/categoryPortofolio',ControllerPortofolio.postCategoryPortofolio)
router.get('/categoryPortofolio/:id',ControllerPortofolio.detailCategory)
router.delete('/categoryPortofolio/:id',ControllerPortofolio.deleteCategoryPortofolio)
router.put('/categoryPortofolio/:id',ControllerPortofolio.updateCategory)
router.get('/Portofolio',ControllerPortofolio.getPortofolio)
router.get('/Portofolio/:id',ControllerPortofolio.detailPortofolio)
router.post('/Portofolio',ControllerPortofolio.postPortofolio)
router.delete('/Portofolio/:id',ControllerPortofolio.deletePortofolio)
router.put('/Portofolio/:id',ControllerPortofolio.editPortofolio)



// blogs 
router.get('/categoryBlogs',ControllerBlogs.getCategoryBlogs)
router.post('/categoryBlogs',ControllerBlogs.postCategoryBlogs)
router.delete('/categoryBlogs/:id',ControllerBlogs.deleteCategoryBlogs)
router.get('/categoryBlogs/:id',ControllerBlogs.detailCategoryBlogs)
router.put('/categoryBlogs/:id',ControllerBlogs.updateCategoryBlogs )
router.get('/blogs',ControllerBlogs.getBlogs)
router.get('/blogs/:id',ControllerBlogs.detailBlogs)
router.post('/blogs',ControllerBlogs.postBlogs)
router.put('/blogs/:id',ControllerBlogs.editBlogs)
router.delete('/blogs/:id',ControllerBlogs.deleteBlogs)


// products 
router.get('/products',ControllerProduct.getAllProducts)
router.get('/adminProduct',ControllerProduct.getAllProductsAdmin)
router.get('/products/:id',ControllerProduct.getProductById)
router.post('/products',ControllerProduct.postProduct)
router.delete('/products/:id',ControllerProduct.deleteProduct)
router.put('/products/:id',ControllerProduct.editProducts)
router.get('/categoryProduct',ControllerProduct.getAllCategoryProduct)
router.get('/categoryProduct/:id',ControllerProduct.getCategoryProductById)
router.post('/categoryProduct',ControllerProduct.postCategoryProduct)
router.put('/categoryProduct/:id',ControllerProduct.updateCategoryProduct)
router.delete('/categoryProduct/:id',ControllerProduct.deleteCategoryProducts)

//testimonial 
router.get('/testimoni',ControllerTestimoni.getTestimoni)
router.get('/testimoni/:id',ControllerTestimoni.getTestimoniById)
router.put('/testimoni/:id',ControllerTestimoni.approvedTestimoni)
router.post('/testimoni',ControllerTestimoni.postTestimoni)

//admin 
router.post('/register',ControllerAdmin.registerAdmin)
router.post('/login',ControllerAdmin.Login)
//user 
router.post('/userRegister',ControllerAdmin.registerNgiClient)
router.post('/userLogin',ControllerAdmin.loginNgiClient)

router.get('/booking',ControllerBooking.getBooking)
router.post('/booking',ControllerBooking.postBooking)


module.exports = router 