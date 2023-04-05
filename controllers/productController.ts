import { ProductRepositoryImpl } from '../repositories/productRepositoryImpl';
import ProductDTO from "../dtos/productDTO";
import {Request, Response} from "express";

const productRepository = new ProductRepositoryImpl();

class productController {
  public getProducts = async (req: Request, res: Response) => {
    try {
      const products = await productRepository.getAll();

      if (!products) {
        return res.status(404).json({message: 'Products not found'});
      }

      res.status(200).json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting products.' });
    }
  };

  public getProductById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const product = await productRepository.getById(id);

      if (!product) {
        return res.status(404).json({message: 'Product not found'});
      }

      res.status(200).json(product);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting product by ID.' });
    }
  };

  public getProductByTitle = async (req: Request, res: Response) => {
    try {
      const title = req.params.title;

      const product = await productRepository.getByTitle(title);

      if (!product) {
        return res.status(404).json({message: 'Product not found by title'});
      }

      res.status(200).json(product);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting product by title.' });
    }
  };

  public updateProduct = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { title, description, price, image } = req.body;

      const product = await productRepository.getById(id);

      if (!product) {
        return res.status(404).json({message: 'Product not found.'});
      }

      const newProduct = new ProductDTO(product.id, title || product.title, description || product.description, price || product.price, image || product.image );

      await productRepository.update(newProduct);

      res.status(200).send(`Product modified with ID: ${id}`);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating product.' });
    }
  };

  public postProduct = async (req: Request, res: Response) => {
    try {
      const { title, description, price, image } = req.body;

      const existingProduct = await productRepository.getByTitle(title);

      if (existingProduct) {
        res.status(400).send(`Product with title ${title} already exists.`);
        return;
      }

      const product = new ProductDTO(null, title, description, price, image);
      await productRepository.create(product);

      res.status(201).send(`Product was added`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error creating product');
    }
  };

  public deleteProduct  = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const user = await productRepository.getById(id);

      if (!user) {
        return res.status(404).json({ message: 'Product not found.' });
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