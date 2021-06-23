import express from 'express';
import Users from '@controllers/Users';
import isAuth from 'middlewares/isAuth';

const router = express.Router();

router.post('/create', Users.createUser);
router.put('/edit/:id', isAuth, Users.editUser);
router.delete('/delete/:id', isAuth, Users.deleteUser);

router.post('/auth/login', Users.loginUser);
router.post('/auth/logout', isAuth, Users.logoutUser);

export = router;
