/* eslint-disable no-underscore-dangle */
import createError from '@helpers/createError';
import Products from '@models/Products';
import { Product } from '@interfaces/product';
import Sells from '@models/Sells';
import { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from '@interfaces/error';
import { sendMessage } from '@helpers/whatsapp';
import { buildWhatsAppMessage } from './utils';
import { CartItem } from '@interfaces/sells';

export async function checkForStock(cartProducts: CartItem[]) {
  const ALL_PRODUCTS = await Products.find({}, 'name stock');
  const found: Product[] = [];

  cartProducts.map((cartItem: CartItem): void => {
    const product = ALL_PRODUCTS.find(
      (item: Product) =>
        String(item!._id!) === String(cartItem.id) && item.stock >= cartItem.quantity
    )
    if(!!product) {found.push(product)};

    return;
  });

  return !!found.filter(Boolean).length && found.filter(Boolean).length === cartProducts.length;
}

async function subtractFromStock(productId: string, quantity: number) {
  const currentStock = await Products.findOne({ _id: productId }, 'stock');

  if(currentStock){
  Products.findOneAndUpdate({ _id: productId }, { stock: currentStock!.stock - quantity }).then(() => {
    return currentStock;
  });} return false;
}

const createSell = async (req: Request, res: Response, next: NextFunction) => {
  if (await checkForStock(req.body.products)) {
    req.body.products.map((current: CartItem) => subtractFromStock(current.id, current.quantity));

    new Sells(req.body)
      .save()
      .then(async (sellsCreationResponse) => {
        const message = await buildWhatsAppMessage(sellsCreationResponse)
        sendMessage(message)
        res.send({
          success: true,
          data: sellsCreationResponse,
        });

      })
      .catch((err) => createError(next, res, err.message, err.status));
  } else {
    createError(next, res, 'Not enough stock', 400);
  }
};

const getSell = (req: Request, res: Response, next: NextFunction) => {
  Sells.findOne({ _id: req.params.id })
    .then((response) => {
      res.send({ success: true, data: response });
    })
    .catch((err: ErrorResponse) => createError(next, res, err.message, err.status));
};

const getSellList = (req: Request, res: Response, next: NextFunction) => {
  Sells.find({})
    .then((response) => {
      res.send({ success: true, data: response });
    })
    .catch((err: ErrorResponse) => createError(next, res, err.message, err.status));
};

const editSell = (req: Request, res: Response, next: NextFunction) => {
  Sells.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then((response) => {
      res.send({ success: true, data: response });
    })
    .catch((err: ErrorResponse) => createError(next, res, err.message, err.status));
};

const deleteSell = (req: Request, res: Response, next: NextFunction) => {
  Sells.findOneAndDelete({ _id: req.params.id })
    .then((response) => {
      res.send({ success: true, data: response });
    })
    .catch((err: ErrorResponse) => createError(next, res, err.message, err.status));
};

export default {
  createSell,
  getSell,
  getSellList,
  editSell,
  deleteSell,
};
