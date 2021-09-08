import express from 'express';
import Sells from '@controllers/Sells';
import isAuth from 'middlewares/isAuth';

const router = express.Router();

router.get('/get', isAuth, Sells.getSellList);
router.get('/getSingle/:id', isAuth, Sells.getSell);
router.post('/create', Sells.createSell);
router.put('/edit/:id', isAuth, Sells.editSell);
router.put('/toggleFinished/:id', isAuth, Sells.toggleFinished)
router.delete('/delete/:id', isAuth, Sells.deleteSell);

export = router;
