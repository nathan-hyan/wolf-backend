import express from 'express';
import Sells from '@controllers/Sells';
import isAuth from 'middlewares/isAuth';

const router = express.Router();

router.get('/get', isAuth as never, Sells.getSellList);
router.get('/getSingle/:id', isAuth as never, Sells.getSell);
router.post('/create', isAuth as never, Sells.createSell);
router.put('/edit/:id', isAuth as never, Sells.editSell);
router.delete('/delete/:id', isAuth as never, Sells.deleteSell);

export = router;
