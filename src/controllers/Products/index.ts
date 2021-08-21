import createError from "@helpers/createError";
import { ErrorResponse } from "@interfaces/error";
import Products from "@models/Products";
import { NextFunction, Request, Response } from "express";
import { INITIAL_RATING } from "./constants";
import { updateRating } from "./utils";

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
      response!.comments.sort((a, b) =>
        new Date(b.timestamp) > new Date(a.timestamp) ? 1 : -1
      );
      res.send({ success: true, response });
    })
    .catch((err: ErrorResponse) => {
      createError(next, res, err.message, err.status);
    });
};

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newProduct = new Products(req.body);
  return newProduct
    .save()
    .then(() => {
      res.send({ success: true, message: "Product created successfully" });
    })
    .catch((err) => {
      createError(next, res, err.message, err.status);
    });
};

const editProduct = (req: Request, res: Response, next: NextFunction) => {
  Products.findOneAndUpdate({ _id: req.params.id }, req.body).then(
    (response) => {
      if (!response) {
        createError(next, res, "Product not found", 404);
      } else {
        res.send({ success: true, response });
      }
    }
  );
};

const deleteProduct = (req: Request, res: Response, next: NextFunction) => {
  Products.findOneAndDelete({ _id: req.params.id })
    .then((response) => {
      if (!response) {
        createError(next, res, "Product not found", 404);
      } else {
        res.send({ success: true, response });
      }
    })
    .catch((err: ErrorResponse) => {
      createError(next, res, err.message, err.status);
    });
};

const rateProduct = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.rating > 5 || req.body.rating < 0) {
    return createError(next, res, "The score must be from 0 to 5", 400);
  }

  return Products.findOne({ _id: req.params.id }, "rating")
    .then((response) => {
      Products.findOneAndUpdate(
        { _id: req.params.id },
        {
          rating: updateRating(
            response ? response.rating : INITIAL_RATING,
            req.body.rating
          ),
        }
      )
        .then((response) => {
          res.send({ response, rating: req.body.rating });
        })
        .catch((err) => createError(next, res, err.message, err.status));
    })
    .catch((err) => createError(next, res, err.message, err.status));
};

const commentOnProduct = (req: Request, res: Response, next: NextFunction) => {
  return Products.findOne({ _id: req.params.id }, "comments").then(
    (response) => {
      const newComments = [
        ...response!.comments,
        { body: req.body.comment, timestamp: String(new Date()) },
      ];

      Products.findOneAndUpdate(
        { _id: req.params.id },
        { comments: newComments }
      )
        .then((response) => {
          res.send({ success: true, response });
        })
        .catch((err) => createError(next, res, err.message, err.status));
    }
  );
};

export default {
  getProducts,
  getSingleProduct,
  createProduct,
  editProduct,
  deleteProduct,
  rateProduct,
  commentOnProduct,
};
