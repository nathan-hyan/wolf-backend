/* eslint-disable no-underscore-dangle */
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import createError from "@helpers/createError";
import _User from "@interfaces/users";
import Users from "@models/Users";
import { ObjectId } from "mongoose";
import { ErrorResponse } from "@interfaces/error";
import Stores from "@models/Stores";
import { MESSAGES } from "./constants";

declare module "express-session" {
  interface Session {
    isAuth: boolean;
    storeId: ObjectId;
  }
}

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const userExist = await Users.findOne({ DNI: req.body.DNI });

    if (!userExist) {
      bcrypt.hash(req.body.password, 8, (hashError, hash) => {
        if (!hashError) {
          if (req.body.type !== 0) {
            if (!req.body.storeId) {
              return createError(next, res, "You must provide a StoreId", 400);
            }
            if (!req.body.storeBranch) {
              return createError(
                next,
                res,
                "You must provide a StoreBranch",
                400
              );
            }
          }

          const newUser = new Users({ ...req.body, password: hash });

          return newUser
            .save()
            .then(async (response: _User) => {
              if (req.body.storeId) {
                const CURRENT_STORE = await Stores.findOne({
                  _id: req.body.storeId,
                });

                if (req.body.type === 1) {
                  CURRENT_STORE!.admins.push(newUser._id);
                } else {
                  CURRENT_STORE!.users.push(newUser._id);
                }

                await Stores.findOneAndUpdate(
                  { _id: CURRENT_STORE!._id },
                  CURRENT_STORE!
                );
              }
              res.send({ success: true, response });
            })
            .catch((err: Error) => createError(next, res, err.message, 400));
        }

        return createError(next, res, hashError.message, 500);
      });
    } else {
      createError(next, res, MESSAGES.alreadyExist, 409);
    }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { DNI, password } = req.body;

  const userExist = await Users.findOne({ DNI });

  if (!userExist) {
    return createError(next, res, MESSAGES.error, 401);
  }

  return bcrypt.compare(password, userExist.password, (error, response) => {
    if (!error && response) {
      req.session.isAuth = true;
      req.session.storeId = userExist.storeId;
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

export default {
  createUser,
  deleteUser,
  editUser,
  loginUser,
  logoutUser,
};
