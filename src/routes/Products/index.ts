import express from 'express';
import Products from '@controllers/Products';
import isAuth from 'middlewares/isAuth';

const router = express.Router();

router.get('/get', Products.getProducts);
router.get('/getSingle/:id', Products.getSingleProduct);
router.post('/create', isAuth as never, Products.createProduct);
router.put('/edit/:id', isAuth as never, Products.editProduct);
router.delete('/delete/:id', isAuth as never, Products.deleteProduct);

export = router;
