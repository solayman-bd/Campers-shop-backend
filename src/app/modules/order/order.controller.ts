import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { orderServices } from './order.service';
import { Request, Response } from 'express';
const createAnOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await orderServices.createAnOrder(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Product created successfully....',
    data: result,
  });
});

export const orderController = { createAnOrder };
