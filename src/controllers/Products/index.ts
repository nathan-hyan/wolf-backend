import createError from '@helpers/createError';
import { ErrorResponse } from '@interfaces/error';
import Products from '@models/Products';
import { NextFunction, Request, Response } from 'express';

const getProducts = (req: Request, res: Response, next: NextFunction) => {
  Products.find({ storeId: req.session.storeId })
    .then((response) => {
      res.send({ success: true, response });
    })
    .catch((err: ErrorResponse) => {
      createError(next, res, err.message, err.status);
    });
};

const getSingleProduct = (req: Request, res: Response, next: NextFunction) => {
  Products.findOne({ storeId: req.session.storeId, _id: req.params.id })
    .then((response) => {
      res.send({ success: true, response });
    })
    .catch((err: ErrorResponse) => {
      createError(next, res, err.message, err.status);
    });
};

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  const newProduct = new Products({ ...req.body, storeId: req.session.storeId });
  return newProduct
    .save()
    .then(() => {
      res.send({ success: true, message: 'Product created successfully' });
    })
    .catch((err) => {
      createError(next, res, err.message, err.status);
    });
};

const editProduct = (req: Request, res: Response, next: NextFunction) => {
  Products.findOneAndUpdate({ _id: req.params.id }, req.body).then((response) => {
    if (!response) {
      createError(next, res, 'Product not found', 404);
    } else {
      res.send({ success: true, response });
    }
  });
};

const deleteProduct = (req: Request, res: Response, next: NextFunction) => {
  Products.findOneAndDelete({ _id: req.params.id })
    .then((response) => {
      if (!response) {
        createError(next, res, 'Product not found', 404);
      } else {
        res.send({ success: true, response });
      }
    })
    .catch((err: ErrorResponse) => {
      createError(next, res, err.message, err.status);
    });
};

export default {
  getProducts,
  getSingleProduct,
  createProduct,
  editProduct,
  deleteProduct,
};
