import { ProductRepositoryImpl } from '../repositories/productRepositoryImpl';
import productDTO from "../dtos/productDTO";
import ProductDTO from "../dtos/productDTO";

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

  public getProductById = async (req: any, res: any) => {
    try {
      const id = parseInt(req.params.id);

      const product = await productRepository.getById(id);

      if (!product) {
        return res.status(404).json({message: 'product not found'});
      }

      res.status(200).json(product);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting product by ID.' });
    }
  };

  public updateProduct = async (req: any, res: any) => {
    try {
      const id = parseInt(req.params.id);
      const { title, description, price, image } = req.body;

      const product = await productRepository.getById(id);

      if (!product) {
        return res.status(404).json({message: 'User not found.'});
      }

      const newProduct = new ProductDTO(product.id, title || product.title, description || product.description, price || product.price, image || product.image );

      await productRepository.update(newProduct);

      res.status(200).send(`Product modified with ID: ${id}`);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating product.' });
    }
  };

  public postProduct = async (req: any, res: any) => {
    try {
      const { title, description, price, image } = req.body;

      const existingProduct = await productRepository.getByTitle(title);

      if (existingProduct) {
        res.status(400).send(`Product with title ${title} already exists.`);
        return;
      }

      const product = new productDTO(null, title, description, price, image);
      await productRepository.create(product);

      res.status(201).send(`Product was added`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error creating product');
    }
  };

  deleteProduct  = async (req: any, res: any) => {
    try {
      const id = parseInt(req.params.id);

      const user = await productRepository.getById(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      await productRepository.delete(id);

      res.status(200).send(`Product deleted with ID: ${id}`);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting product.' });
    }
  };
}

export default new productController();