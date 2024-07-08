import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse, { sendNotFoundResponse } from '../../utils/sendResponse';
import { productServices } from './product.service';
import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { IGetProductsParams } from './product.interface';
const createAProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await productServices.createAProduct(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Product created successfully....',
    data: result,
  });
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await productServices.getAllProducts();
  if (result.length == 0) {
    sendNotFoundResponse(res);
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All products fetched successfully..',
    data: result,
  });
});

const updateAProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId, updatedData } = req.body;
  // Check if the productId is a valid ObjectId
  if (!Types.ObjectId.isValid(productId)) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Invalid product ID.',
      data: null,
    });
  }
  const result = await productServices.updateAProduct(productId, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is updated Successfully..',
    data: result,
  });
});
const deleteAProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.body;
  // Check if the productId is a valid ObjectId
  if (!Types.ObjectId.isValid(productId)) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Invalid product ID.',
      data: null,
    });
  }
  const result = await productServices.deleteAProduct(productId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is deleted successfully.',
    data: result,
  });
});

const getASingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;

  // Check if the productId is a valid ObjectId
  if (!Types.ObjectId.isValid(productId)) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Invalid product ID.',
      data: null,
    });
  }

  const objectId = new Types.ObjectId(productId);
  const result = await productServices.getASingleProduct(objectId);

  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false, // Update this to false since the product was not found
      message: 'No product found.',
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved successfully.',
    data: result,
  });
});
const getBestSellingProducts = catchAsync(
  async (req: Request, res: Response) => {
    const result = await productServices.getBestSellingProducts();

    if (result.length == 0) {
      return sendNotFoundResponse(res);
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Best selling products are retrieved successfully.',
      data: result,
    });
  },
);

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await productServices.getAllCategories();

  if (result.length == 0) {
    return sendNotFoundResponse(res);
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories are retrieved successfully.',
    data: result,
  });
});

const getProductsByQuery = catchAsync(async (req: Request, res: Response) => {
  const {
    searchItem,
    filterByCategory,
    filterByPriceRangeMin,
    filterByPriceRangeMax,
    sort,
    page,
    limit,
  } = req.query;

  const params: IGetProductsParams = {
    searchItem: searchItem as string,
    filterByCategory: filterByCategory as string,
    filterByPriceRangeMin: filterByPriceRangeMin as string,
    filterByPriceRangeMax: filterByPriceRangeMax as string,
    sort: sort as 'asc' | 'desc',
    page: parseInt(page as string, 10) || 1, // Provide default value for page
    limit: parseInt(limit as string, 10) || 10, // Provide default value for limit
  };

  const products = await productServices.getProductsByQuery(params);
  if (!products || products.length == 0) {
    sendNotFoundResponse(res);
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All products fetched successfully..',
    data: products,
  });
});

export const productControllers = {
  createAProduct,
  getAllProducts,
  updateAProduct,
  deleteAProduct,
  getASingleProduct,
  getBestSellingProducts,
  getAllCategories,
  getProductsByQuery,
};
