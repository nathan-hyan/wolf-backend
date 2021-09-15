/* eslint-disable no-underscore-dangle */
import createError from "@helpers/createError";
import Products from "@models/Products";
import { Product } from "@interfaces/product";
import Sells from "@models/Sells";
import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "@interfaces/error";
import { sendPurchaseMail } from "@helpers/mailHandler";
import { HTTP_CODES } from "@constants/responseCodes";

interface CartProduct {
  id: string;
  quantity: number;
}

export interface CustomProductResponse {
  _id?: string;
  stock: number;
  name: string;
}

export async function checkForStock(cartProducts: CartProduct[]) {
  const ALL_PRODUCTS = await Products.find({}, "name stock");
  const found: Product[] = [];

  cartProducts.map((cartItem: CartProduct): void => {
    const product = ALL_PRODUCTS.find(
      (item: CustomProductResponse) =>
        item!._id!.toString() === cartItem.id.toString() &&
        item.stock >= cartItem.quantity
    );
    if (!!product) {
      found.push(product);
    }

    return;
  });

  return (
    !!found.filter(Boolean).length &&
    found.filter(Boolean).length === cartProducts.length
  );
}

async function subtractFromStock(productId: string, quantity: number) {
  const currentStock = await Products.findOne({ _id: productId }, "stock");

  if (currentStock) {
    Products.findOneAndUpdate(
      { _id: productId },
      { stock: currentStock!.stock - quantity }
    ).then(() => {
      return currentStock;
    });
  }
  return false;
}

const createSell = async (req: Request, res: Response, next: NextFunction) => {
  if (await checkForStock(req.body.products)) {
    req.body.products.map((current: CartProduct) =>
      subtractFromStock(current.id, current.quantity)
    );

    new Sells(req.body)
      .save()
      .then((sellsCreationResponse) => {
        sendPurchaseMail(
          req.body.userInfo.name,
          req.body.userInfo.whatsApp,
          req.body.products
        ).catch((err) => console.log("📧 >> Mail error! //", err.message));
        res.send({
          success: true,
          data: sellsCreationResponse,
        });
      })
      .catch((err) => createError(next, res, err.message, err.status));
  } else {
    createError(next, res, "No hay stock suficiente", HTTP_CODES.BAD_REQUEST.code);
  }
};

const getSell = (req: Request, res: Response, next: NextFunction) => {
  Sells.findOne({ _id: req.params.id })
    .then((response) => {
      res.send({ success: true, data: response });
    })
    .catch((err: ErrorResponse) =>
      createError(next, res, err.message, err.status)
    );
};

const getSellList = (req: Request, res: Response, next: NextFunction) => {
  Sells.find({})
    .then((response) => {
      res.send({ success: true, data: response });
    })
    .catch((err: ErrorResponse) =>
      createError(next, res, err.message, err.status)
    );
};

const editSell = (req: Request, res: Response, next: NextFunction) => {
  Sells.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then((response) => {
      res.send({ success: true, data: response });
    })
    .catch((err: ErrorResponse) =>
      createError(next, res, err.message, err.status)
    );
};

const deleteSell = (req: Request, res: Response, next: NextFunction) => {
  Sells.findOneAndDelete({ _id: req.params.id })
    .then((response) => {
      res.send({ success: true, data: response });
    })
    .catch((err: ErrorResponse) =>
      createError(next, res, err.message, err.status)
    );
};

const toggleFinished = (req: Request, res: Response, next: NextFunction) => {
  Sells.findOne({ _id: req.params.id })
    .then((response) => {
      Sells.findOneAndUpdate(
        { _id: req.params.id },
        { finished: !response?.finished }
      )
        .then((response) => res.send({ success: true, response }))
        .catch((err: ErrorResponse) =>
          createError(next, res, err.message, err.status)
        );
    })
    .catch((err: ErrorResponse) =>
      createError(next, res, err.message, err.status)
    );
};

export default {
  createSell,
  getSell,
  getSellList,
  editSell,
  deleteSell,
  toggleFinished,
};
