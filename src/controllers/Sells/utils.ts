import { Purchase } from '@interfaces/sells';

export const buildWhatsAppMessage = async (purchase: Purchase) => {
    let items = [...purchase.products.map((product, index) => `${index + 1} - ${product.name} (Cantidad: ${product.quantity})`)]

    return `Hola! *${purchase.userInfo.name}* hizo una compra con los siguientes productos\n\n${items.join(`\n`)}\n\nMonto total de la compra: *$${purchase.amount}*\nContactarse con ${purchase.userInfo.whatsApp} para concretar la compra.`
}