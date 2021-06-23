import createError from '@helpers/createError';
import { ErrorResponse } from '@interfaces/error';
import { Store } from '@interfaces/store';
import Stores from '@models/Stores';
import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';

const getSingleStore = (req: Request, res: Response, next: NextFunction) => {
  Stores.aggregate([
    {
      $match: { _id: Types.ObjectId(req.params.id) },
    },
    {
      $lookup: {
        from: 'Users',
        localField: 'users',
        foreignField: '_id',
        as: 'users',
      },
    },
  ])

    // Stores.findOne({ _id: req.params.id })
    //   .populate('Users')
    .then((response: any) => {
      res.send({ success: true, response });
    })
    .catch((err: ErrorResponse) => {
      createError(next, res, err.message, err.status);
    });
};
const getAllStores = (req: Request, res: Response, next: NextFunction) => {
  Stores.find()
    .then((response) => {
      res.send({ success: true, response });
    })
    .catch((err: ErrorResponse) => {
      createError(next, res, err.message, err.status);
    });
};
const createStore = (req: Request, res: Response, next: NextFunction) => {
  new Stores(req.body)
    .save()
    .then((response) => {
      res.send({ success: true, response });
    })
    .catch((err: ErrorResponse) => {
      createError(next, res, err.message, err.status);
    });
};
const editStore = (req: Request, res: Response, next: NextFunction) => {
  Stores.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then((response) => {
      res.send({ success: true, response });
    })
    .catch((err: ErrorResponse) => {
      createError(next, res, err.message, err.status);
    });
};
const deleteStore = (req: Request, res: Response, next: NextFunction) => {
  Stores.findOneAndDelete({ _id: req.params.id })
    .then((response) => {
      res.send({ success: true, response });
    })
    .catch((err: ErrorResponse) => {
      createError(next, res, err.message, err.status);
    });
};

export default {
  getSingleStore,
  getAllStores,
  createStore,
  editStore,
  deleteStore,
};
