import express from 'express';
import Stores from '@controllers/Stores';
import isAuth from 'middlewares/isAuth';

const router = express.Router();

router.get('/get', isAuth as never, Stores.getAllStores);
router.get('/getSingle/:id', isAuth as never, Stores.getSingleStore);
router.post('/create', isAuth as never, Stores.createStore);
router.put('/edit/:id', isAuth as never, Stores.editStore);
router.delete('/delete/:id', isAuth as never, Stores.deleteStore);

export = router;
