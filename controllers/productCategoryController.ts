import CategoryDTO from "../dtos/categoryDTO";
import ProductCategoryDTO from "../dtos/productCategoryDTO";
import { ProductCategoryRepositoryImpl } from "../repositories/productCategoryRepositoryImpl";
import CategoryRepositoryImpl from "../repositories/categoryRepositoryImpl";
import {ProductRepositoryImpl} from "../repositories/productRepositoryImpl";

const productCategoryRepository = new ProductCategoryRepositoryImpl();
const categoryRepository = new CategoryRepositoryImpl();
const productRepository = new ProductRepositoryImpl();

class ProductCategoryController {
  public getAllCategoryProduct = async (req: any, res: any) => {
    try {
      const productCategories = productCategoryRepository.getAll();

      res.status(200).json(productCategories);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting product_categories.' });
    }
  };

  public getProductsByCategoryId = async (req: any, res: any) => {
    try {
      const categoryId = parseInt(req.params.categoryId);

      const products = await productCategoryRepository.getProductsByCategoryId(categoryId);

      res.status(200).json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting products by category ID.' });
    }
  };

  public createProductCategory = async (req: any, res: any) => {
    try {
      const { categoryId, productId } = req.body;

      const existingProductCategory = await productCategoryRepository.getByProductIdAndCategoryId(productId, categoryId);

      if (existingProductCategory) {
        return res.status(400).json({ message: 'Product is already associated with the category' });
      }

      const productCategory = new ProductCategoryDTO(null, productId, categoryId);

      await productCategoryRepository.create(productCategory);

      res.status(201).send(`Product was added to the category`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error adding product to category');
    }
  };

  public deleteProductCategory = async (req: any, res: any) => {
    try {
      const id = parseInt(req.params.id);

      const userAddress = await productCategoryRepository.getById(id);

      if (!userAddress) {
        return res.status(404).json({message: 'product_category not found'});
      }

      await productCategoryRepository.delete(id);

      res.status(200).send(`product_category deleted with ID: ${id}`);
    } catch (err) {
      console.error(err);
      res.status(500).json({message: 'Error deleting product_category'});
    }
  }

  public deleteProductCategoriesByProductId = async (req: any, res: any) => {
    try {
      const { categoryId, productId } = req.params;

      const productCategory = await productCategoryRepository.getByProductIdAndCategoryId(parseInt(productId), parseInt(categoryId));

      if (!productCategory) {
        return res.status(404).json({ message: 'Product category not found' });
      }

      const id = productCategory.id;

      if (id) {
        await productCategoryRepository.delete(id);
      }

      res.status(200).send(`Product was removed from the category`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error removing product from category');
    }
  };

  public updateProductCategory = async (req: any, res: any) => {
    try {
      const { productId, categoryIds } = req.body;

      if (!categoryIds || categoryIds.length === 0) {
        return res.status(400).json({ message: 'At least one category ID must be provided' });
      }

      const existingCategories = await categoryRepository.getAll();

      const validCategoryIds = categoryIds.filter((categoryId: number) => {
        return existingCategories.find((category: CategoryDTO) => category.id === categoryId);
      });

      const product = await productRepository.getById(productId);

      if (!product) {
        return res.status(404).json({ message: 'product_category not found' });
      }

      await productCategoryRepository.deleteByProductId(productId);

      await Promise.all(validCategoryIds.map(async (categoryId: number) => {
        const productCategory = new ProductCategoryDTO(null, productId, categoryId);
        await productCategoryRepository.create(productCategory);
      }));

      res.status(200).send(`Product_categories were updated`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error updating product_categories');
    }
  };
}
