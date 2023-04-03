import categoryDTO from "../dtos/categoryDTO";
import { CategoryRepositoryImpl } from '../repositories/categoryRepositoryImpl';

const categoryRepository = new CategoryRepositoryImpl();

class CategoryController {
  public getCategories = async (req: any, res: any) => {
    try {
      const categories = await categoryRepository.getAll();

      if (!categories) {
        return res.status(404).json({message: 'Categories not found'});
      }

      res.status(200).json(categories);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting categories.' });
    }
  };

  public getCategoryById = async (req: any, res: any) => {
    try {
      const id = parseInt(req.params.id);

      const category = await categoryRepository.getById(id);

      if (!category) {
        return res.status(404).json({message: 'Category not found'});
      }

      res.status(200).json(category);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting category by ID.' });
    }
  };

  public postCategory = async (req: any, res: any) => {
    const { name } = req.body;
    try {
      const category = new categoryDTO(null, name);
      const isExist = await categoryRepository.isExist(category);

      if (isExist) {
        res.status(400).send(`This category is already exist.`);
        return;
      }
      await categoryRepository.create(category);

      res.status(201).send(`Category was added`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error creating category');
    }
  };

  public updateCategory = async (req: any, res: any) => {
    try {
      const id = parseInt(req.params.id);
      const { name } = req.body;

      const category = await categoryRepository.getById(id);

      if (!category) {
        return res.status(404).json({message: 'Category not found.'});
      }

      const newCategory = new categoryDTO(category.id, name || category.name);

      await categoryRepository.update(newCategory);

      res.status(200).send(`Category modified with ID: ${id}`);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating category.' });
    }
  };

  public deleteCategory = async (req: any, res: any) => {
    const id = parseInt(req.params.id);

    try {
      const category = await categoryRepository.getById(id);

      if (!category) {
        return res.status(404).json({ message: 'Category not found.' });
      }

      await categoryRepository.delete(id);

      res.status(200).send(`Category deleted with ID: ${id}`);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting category.' });
    }
  };
}

export default new CategoryController();