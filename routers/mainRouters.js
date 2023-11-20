const router = require("express").Router();
const productController = require("../controllers/product-controller");
const cartController = require("../controllers/cart-controller");
const categoryController = require("../controllers/category-controller");
const userController = require('../controllers/user-controller');
const checkAuth = require("../middlewares/checkAuth");
const cloudinaryController = require('../controllers/cloudinary-controller');
// const authMiddleware = require('../middlewares/auth-middleware');

///user///
router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/me', checkAuth.check, userController.getMe);
router.get('/refresh', userController.refresh);
router.get('/activate/:link', userController.activate);
router.put('/update', userController.update);
///avatar///
// router.post('/avatar', checkAuth.check, userController.uploadAvatar);
// router.delete('/avatar', checkAuth.check, userController.deleteAvatar);
router.put('/avatar', checkAuth.check, userController.updateAvatar);
///////////////cloudinary/////////////
router.delete("/avatar/:id", cloudinaryController.delete)
///cart///
router.post('/cart', cartController.addOrder);
///category///
router.get('/category', categoryController.getAllCategory);
router.get('/category/:id', categoryController.getCategoryProductsById);
router.post('/category', categoryController.addCategory);
router.put('/category', categoryController.putCategory);
router.delete('/category', categoryController.deleteCategory);
///product///
router.post('/product', productController.createProduct);
router.post('/product/rating', productController.addRating);
router.post('/product/category', productController.addCategory);
router.get('/product/:id', productController.getProductById);
router.get('/product/search/:paramsProduct', productController.searchProductByValue);
router.get('/products/label/:paramsProducts', productController.getAllProductsByLabel);

module.exports = router;