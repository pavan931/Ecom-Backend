import { Request,Response } from "express";
import { addItem,removeItem,getAllItems,clearCart } from "../repository/cartRepo";


interface AddToCart{
    userId:number
    itemId:number;
    quantity:number;
}

export const addCartItem = async(req:Request,res:Response) =>{
        const {itemId,quantity} = req.body
        const userId = Number(req.params.userId as string)
        console.log('hello');
        
        try{
            await addItem({
                userId, itemId, quantity,
            })

            res.status(200).send({success:true , message:"Item added to Cart Successfully"})
        }
        catch(err){
            console.error('Error adding item to cart :',err);
            res.status(500).send({success:false , message:"Failed to add item to cart"})

        }
    }
    

        export const removeCartItem = async(req:Request<{userId:number,itemId:number},{},AddToCart>, res:Response)=>{

            const {userId,itemId} = req.params
            try{
                await removeItem(userId,itemId)
                res.status(200).send({success:true,message:"Item removed from cart successfully"})

            }
            catch(err){
                console.error("Error removingitem from cart : ",err);
                res.status(500).send({success:false, message:"Failed to remove item from cart"})
                
            }
        }

        export const clearCartItems = async(req:Request<{userId:number},{},AddToCart>, res:Response)=>{
            const {userId} = req.params

            try{
                await clearCart(userId)
                res.status(200).send({success:true , message:"Cart Cleared successfully"})

            }
            catch(err){
                console.error('Error clearing cart:', err);
                res.status(500).send({ success: false, message: 'Failed to clear cart' });

            }
        }

        export const getAllItemsToCart = async(req:Request<{userId:number},{},AddToCart>,res:Response)=>{
            const {userId} = req.params

            try{
                const cartItems = await getAllItems(userId)
                res.status(200).send({success:true, cartItems})
            }
            catch(err){
                console.error('Error getting cart items:', err);
    res.status(500).send({ success: false, message: 'Failed to get cart items' });
            }

        }
        