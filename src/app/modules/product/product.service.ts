import mongoose from 'mongoose';
import IProduct, {
  IGetProductsParams,
  IProductConditions,
} from './product.interface';
import ProductModel from './product.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createAProduct = async (payload: IProduct) => {
  try {
    // Create the product if payload is valid
    const result = await ProductModel.create(payload);
    return result;
  } catch (err) {
    // Handle errors appropriately
    if (err instanceof Error) {
      throw new Error(err.message); // If it's a standard Error object, throw its message
    } else {
      throw new Error('Unknown error occurred'); // Handle other types of errors
    }
  }
};

const getAllProducts = async () => {
  try {
    // Create the product if payload is valid
    const result = await ProductModel.find({}).sort({ _id: -1 });
    return result;
  } catch (err) {
    // Handle errors appropriately
    if (err instanceof Error) {
      throw new Error(err.message); // If it's a standard Error object, throw its message
    } else {
      throw new Error('Unknown error occurred'); // Handle other types of errors
    }
  }
};

const updateAProduct = async (
  productId: mongoose.Types.ObjectId,
  payload: Partial<IProduct>,
): Promise<IProduct | null> => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      { $set: payload },
      { new: true, lean: true },
    );

    if (!updatedProduct) {
      throw new AppError(httpStatus.NOT_FOUND, 'Product not found.');
    }

    return updatedProduct;
  } catch (err) {
    if (err instanceof AppError) {
      throw err;
    }
    throw new Error('An unknown error occurred');
  }
};

const deleteAProduct = async (productId: mongoose.Types.ObjectId) => {
  try {
    const product = await ProductModel.findById(productId).lean();
    if (!product) {
      throw new AppError(httpStatus.NOT_FOUND, 'Product not found.');
    }

    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    return deletedProduct;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message); // If it's a standard Error object, throw its message
    } else {
      throw new Error('Unknown error occurred'); // Handle other types of errors
    }
  }
};

const getASingleProduct = async (productId: mongoose.Types.ObjectId) => {
  try {
    const result = ProductModel.findById(productId);
    return result;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message); // If it's a standard Error object, throw its message
    } else {
      throw new Error('Unknown error occurred'); // Handle other types of errors
    }
  }
};

const getBestSellingProducts = async () => {
  try {
    const bestSellers = await ProductModel.find()
      .sort({ salesCount: -1 })
      .limit(5);
    return bestSellers;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message); // If it's a standard Error object, throw its message
    } else {
      throw new Error('Unknown error occurred'); // Handle other types of errors
    }
  }
};

const getAllCategories = async () => {
  try {
    const categoriesWithImages = await ProductModel.aggregate([
      {
        $group: {
          _id: '$category',
          image: { $first: '$images' },
        },
      },
      {
        $project: {
          image: { $arrayElemAt: ['$image', 0] },
        },
      },
    ]);
    return categoriesWithImages;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error('Unknown error occurred');
    }
  }
};

const getProductsByQuery = async (params: IGetProductsParams) => {
  const {
    searchItem,
    filterByCategory,
    filterByPriceRangeMin,
    filterByPriceRangeMax,
    sort,
    page = 1,
    limit = 10,
  } = params;

  try {
    // Build query conditions
    const conditions: IProductConditions = {};

    // Search by name or description
    if (searchItem) {
      conditions.$or = [
        { name: { $regex: new RegExp(searchItem, 'i') } },
        { description: { $regex: new RegExp(searchItem, 'i') } },
      ];
    }

    // Apply category filter if provided
    if (filterByCategory) {
      conditions.category = filterByCategory;
    }

    // Apply price range filters if provided
    if (filterByPriceRangeMin && filterByPriceRangeMax) {
      conditions.price = {
        $gte: parseInt(filterByPriceRangeMin),
        $lte: parseInt(filterByPriceRangeMax),
      };
    } else if (filterByPriceRangeMin) {
      conditions.price = { $gte: parseInt(filterByPriceRangeMin) };
    } else if (filterByPriceRangeMax) {
      conditions.price = { $lte: parseInt(filterByPriceRangeMax) };
    }

    // Sorting options
    // Sorting options
    const sortOption: { [key: string]: 1 | -1 } = {};
    if (sort === 'asc') {
      sortOption.price = 1; // Ascending by price
    } else if (sort === 'desc') {
      sortOption.price = -1; // Descending by price
    }

    // Pagination
    const skip = (page - 1) * limit;

    // Find products based on conditions, sorting, and pagination
    const products = await ProductModel.find(conditions)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    return products;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message); // If it's a standard Error object, throw its message
    } else {
      throw new Error('Unknown error occurred'); // Handle other types of errors
    }
  }
};

export const productServices = {
  createAProduct,
  getAllProducts,
  updateAProduct,
  deleteAProduct,
  getASingleProduct,
  getBestSellingProducts,
  getAllCategories,
  getProductsByQuery,
};
