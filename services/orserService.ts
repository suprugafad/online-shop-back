import { OrderRepositoryImpl } from '../repositories/orderRepositoryImpl';
import { ProductCategoryRepositoryImpl } from '../repositories/productCategoryRepositoryImpl';
import {CategoryRepositoryImpl } from '../repositories/categoryRepositoryImpl'
import ProductDTO from '../dtos/productDTO';
import CategoryDTO from '../dtos/categoryDTO';
import ProductCategoryDTO from '../dtos/productCategoryDTO';

const orderRepository = new OrderRepositoryImpl();
const productCategoryRepository = new ProductCategoryRepositoryImpl();
const categoryRepository = new CategoryRepositoryImpl();

type DBProduct = ProductDTO;
type DBProducts = DBProduct[];

export class OrderService {
  async getFavoriteCategories(userId: number): Promise<CategoryDTO[]> {
    try {
      const orders = await orderRepository.filterByParameter('userId', userId);

      const productIds: number[] = [];

      orders.forEach(order => {
        const products: DBProducts = order.products;

        products.forEach(product => {
          if (product.id) {
            productIds.push(product.id);
          }
        });
      });

      const favoriteCategories: CategoryDTO[] = [];

      for (const productId of productIds) {
        const categories: ProductCategoryDTO[] = await productCategoryRepository.filterByParameter('productId', productId);
        for (const category of categories) {
          if (!favoriteCategories.some(favCat => favCat.id === category.categoryId)) {
            const categoryTemp = await categoryRepository.getById(category.categoryId);
            if (categoryTemp) {
              favoriteCategories.push(categoryTemp);
            }
          }
        }
      }

      return favoriteCategories;
    } catch (err) {
      throw new Error(`Unable to get favorite categories for user ${userId}`);
    }
  };
}