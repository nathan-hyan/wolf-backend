import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import createError from "@helpers/createError";
import _User from "@interfaces/users";
import Users from "@models/Users";
import { ObjectId } from "mongoose";
import { ErrorResponse } from "@interfaces/error";
import { MESSAGES } from "./constants";

declare module "express-session" {
  interface Session {
    isAuth: boolean;
    username: string;
    _id: string;
    storeId: ObjectId;
  }
}

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const userExist = await Users.findOne({ email: req.body.email });

  if (!!userExist) {
    createError(next, res, MESSAGES.alreadyExist, 409);
  } else {
    bcrypt.hash(req.body.password, 8, (hashError, hash) => {
      if (!hashError) {
        const newUser = new Users({ ...req.body, password: hash });

        return newUser
          .save()
          .then(async (response: _User) => {
            res.send({ success: true, response });
          })
          .catch((err: Error) => createError(next, res, err.message, 400));
      }

      return createError(next, res, hashError.message, 500);
    });
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const userExist = await Users.findOne({ email });

  if (!userExist) {
    return createError(next, res, MESSAGES.error, 401);
  }

  return bcrypt.compare(password, userExist.password, (error, response) => {
    if (!error && response) {
      req.session.isAuth = true;
      req.session.username = userExist.name;
      req.session._id = userExist._id;

      return res
        .status(200)
        .json({ success: true, username: userExist.name, id: userExist._id });
    }
    return createError(next, res, MESSAGES.error, 401);
  });
};

const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  req.session.destroy((err) => {
    if (err) createError(next, res, "jajaj", 500);
    res.send({ success: true });
  });
};

const deleteUser = (req: Request, res: Response) => {
  Users.findOneAndDelete({ _id: req.params.id }).then(() =>
    res.status(200).json({ success: true, message: "User deleted" })
  );
};

const editUser = (req: Request, res: Response, next: NextFunction) => {
  Users.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then((response) => {
      if (!response) {
        createError(next, res, "User not found", 404);
      } else {
        res.send({ success: true, response });
      }
    })
    .catch((err: ErrorResponse) => {
      createError(next, res, err.message, err.status);
    });
};

const checkUser = (req: Request, res: Response, next: NextFunction) => {
  res.send({ success: true, data: req.session });
};

export default {
  createUser,
  deleteUser,
  editUser,
  loginUser,
  logoutUser,
  checkUser,
};
