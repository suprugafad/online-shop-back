import { ProductRepositoryImpl } from '../repositories/productRepositoryImpl';
import productDTO from "../dtos/productDTO";

const productRepository = new ProductRepositoryImpl();

class productController {
  public getProducts = async (req: any, res: any) => {
    try {
      const products = await productRepository.getAll();

      res.status(200).json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting products.' });
    }
  };

  public postProduct = async (req: any, res: any) => {
    const { title, description, price, image } = req.body;
    try {
      const product = new productDTO(null, title, description, price, image);
      await productRepository.create(product);

      res.status(201).send(`Product was added`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error creating product');
    }
  };
}

export default new productController();