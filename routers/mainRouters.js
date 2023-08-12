const router = require("express").Router();
const productController = require("../controllers/product-controller");
const cartController = require("../controllers/cart-controller");
const userController = require('../controllers/user-controller');
const checkAuth = require("../middlewares/checkAuth");
// const authMiddleware = require('../middlewares/auth-middleware');

///user///
router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.put('/update', userController.update);
router.get('/me', checkAuth.check, userController.getMe);
router.get('/refresh', userController.refresh);
router.get('/activate/:link', userController.activate);
///cart///
router.post('/cart', cartController.addOrder);
///product///
router.post('/product', productController.createProduct);
router.post('/product/rating', productController.addRating);

// router.get('/product', productController.getProducts);
// router.get('/products/page/:value', productController.getPages);
router.get('/product/:id', productController.getProductById);
router.get('/product/search/:paramsProduct', productController.searchProductByValue);
router.get('/products/label/:paramsProducts', productController.getAllProductsByLabel);




module.exports = router;