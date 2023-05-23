import { ProductRepositoryImpl } from '../repositories/productRepositoryImpl';
import ProductDTO from "../dtos/productDTO";
import { Request, Response } from "express";
import * as fs from "fs";
const path = require("path");

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

  public getPaginated = async (req: Request, res: Response) => {
    try {
      const page = parseInt(String(req.query.page)) || 1;
      const limit = parseInt(String(req.query.limit)) || 8;
      const sort = String(req.query.sort);

      const products = await productRepository.getPaginated(page, limit, sort);
      const totalProducts = await productRepository.countAll();

      if (!products) {
        return res.status(404).json({ message: 'Products not found' });
      }

      res.status(200).json({ products, totalProducts });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting products.'});
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

  public getProductsByFilterWithPagination = async (req: Request, res: Response) => {
    const page = parseInt(String(req.query.page)) || 1;
    const limit = parseInt(String(req.query.limit)) || 8;
    const minPrice = parseInt(String(req.query.minPrice)) || 1;
    const maxPrice = parseInt(String(req.query.maxPrice)) || 1000;
    const manufacturers = String(req.query.manufacturers).split(',');
    const categories = String(req.query.categories).split(',');
    const sort = String(req.query.sort);

    try {
      const products = await productRepository.filterWithPagination({ minPrice, maxPrice, manufacturers, categories }, sort, page, limit);

      if (!products) {
        return res.status(404).json({ message: 'No products found within the specified filter.' });
      }

      res.status(200).json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting products by filter.' });
    }
  };

  public getAllManufacturers = async (req: Request, res: Response) => {
    try {
      const manufacturers = await productRepository.getAllManufacturers();

      if (!manufacturers) {
        return res.status(404).json({message: 'Manufacturers not found.'});
      }

      res.status(200).json(manufacturers);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting manufacturers.' });
    }
  };

  public updateProduct = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { title, manufacturer, description, price, amount } = req.body;

      const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
      const mainImage: string | null = files && files.mainImage ? files.mainImage[0].filename : null;
      const additionalImages = files && files.additionalImages ? files.additionalImages.map(image => image.filename) : null;

      const product = await productRepository.getById(id);

      if (!product) {
        return res.status(404).json({message: 'Product not found.'});
      }

      const newProduct = new ProductDTO(product.id, title || product.title,
        manufacturer || product.manufacturer,
        description || product.description, price || product.price,
        amount || product.amount, mainImage || product.mainImage,
        additionalImages || product.additionalImages);

      const oldImagePath = path.join(__dirname, "../assets/images/products", product.title);
      const newImagePath = path.join(__dirname, "../assets/images/products", newProduct.title);

      if (fs.existsSync(oldImagePath)) {
        try {
          fs.renameSync(oldImagePath, newImagePath);
        } catch (err) {
          console.error(`Error renaming folder: ${err}`);
        }
      }

      await productRepository.update(newProduct);

      res.status(200).send(`Product modified with ID: ${id}`);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating product.' });
    }
  };

  public postProduct = async (req: Request, res: Response) => {
    try {
      const { title, manufacturer, description, price, amount } = req.body;

      const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
      const mainImage: string | null = files && files.mainImage ? files.mainImage[0].filename : null;
      const additionalImages = files && files.additionalImages ? files.additionalImages.map(image => image.filename) : null;

      const existingProduct = await productRepository.getByTitle(title);

      if (existingProduct) {
        res.status(400).send(`Product with title ${title} already exists.`);
        return;
      }

      const product = new ProductDTO(null, title, manufacturer, description, price, amount, mainImage, additionalImages);

      await productRepository.create(product);
      const postedProduct: ProductDTO | null = await productRepository.getByTitle(title);

      res.status(201).json({ message: `Product was added`, id: postedProduct?.id });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error creating product');
    }
  };

  public deleteProduct = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const product = await productRepository.getById(id);

      if (!product) {
        return res.status(404).json({ message: 'Product not found.' });
      }

      const mainImage = product.mainImage;
      if (mainImage) {
        const mainImagePath = path.join(__dirname, "../assets/images/products", product.title, mainImage);
        fs.unlinkSync(mainImagePath);
      }

      const additionalImages = product.additionalImages;
      if (additionalImages) {
        additionalImages.forEach(image => {
          const imagePath = path.join(__dirname, "../assets/images/products", product.title, image);
          fs.unlinkSync(imagePath);
        });
      }

      if (fs.existsSync(path.join(__dirname, "../assets/images/products", product.title))) {
        fs.rmdirSync(path.join(__dirname, "../assets/images/products", product.title));
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