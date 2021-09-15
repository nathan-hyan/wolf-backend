import express from 'express';
import Products from '@controllers/Products';
import isAuth from 'middlewares/isAuth';

const router = express.Router();

router.get('/get', Products.getProducts);
router.get('/getSingle/:id', Products.getSingleProduct);
router.post('/create', isAuth, Products.createProduct);
router.put('/edit/:id', isAuth, Products.editProduct);
router.put('/rate/:id', Products.rateProduct);
router.put('/comment/add/:id', Products.commentOnProduct);
router.delete('/comment/delete/:id/:comment_id', isAuth, Products.deleteCommentOnProduct);
router.delete('/delete/:id', isAuth, Products.deleteProduct);

export = router;
