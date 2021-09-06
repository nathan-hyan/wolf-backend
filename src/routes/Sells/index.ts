import express from 'express';
import Sells from '@controllers/Sells';
import isAuth from 'middlewares/isAuth';

const router = express.Router();

router.get('/get', isAuth as never, Sells.getSellList);
router.get('/getSingle/:id', isAuth as never, Sells.getSell);
router.post('/create', Sells.createSell);
router.put('/edit/:id', isAuth as never, Sells.editSell);
router.put('/toggleFinished/:id', isAuth, Sells.toggleFinished)
router.delete('/delete/:id', isAuth as never, Sells.deleteSell);

export = router;
