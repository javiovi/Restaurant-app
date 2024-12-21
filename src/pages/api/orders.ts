import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';


const orderSchema = z.object({
  products: z
    .array(
      z.object({
        id: z.number(), 
        quantity: z.number().min(1), 
      })
    )
    .nonempty(), 
  totalPrice: z.number().min(1), 
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
     
      const validatedBody = orderSchema.parse(req.body);
      const { products, totalPrice } = validatedBody;
    
   
      res.status(200).json({ message: 'Order created successfully', products, totalPrice });
    } catch (error) {
     
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid input', errors: error.errors });
      }
    
    
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
