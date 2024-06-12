
import db from '../db';

interface CartItem{
    userId:number,
    itemId:number,
    quantity:number,
    

}

interface cart1 extends CartItem{
    image:string,
    title:string,
    price:number
}

export const addItem = async(cartItem:CartItem):Promise<void>=>{
    await db('cart').insert(cartItem)
}

export const removeItem = async(userId:number,itemId:number):Promise<void>=>{
    await db('cart').where({userId,itemId}).del()
}

export const clearCart = async(userId:number):Promise<void>=>{
    await db('cart').where({userId}).del()
}

export const getAllItems = async (userId: number): Promise<cart1[]> => {
    
    
    const cartItems = await db('cart')
        .select('cart.userId', 'cart.itemId', 'cart.quantity', 'items.image', 'items.title', 'items.price')
        .join('items', 'cart.itemId', 'items.id')
        .where('cart.userId', userId);

    
    return cartItems.map((item: any) => ({
        userId: item.userId,
        itemId: item.itemId,
        quantity: item.quantity,
        image: item.image,
        title: item.title,
        price: item.price
    }));
};


