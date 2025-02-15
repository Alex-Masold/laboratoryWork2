import HttpStatusCodes from '@src/common/HttpStatusCodes';
import CustomerService from '@src/services/CustomerService';
import Customer from '@src/models/Customer';

import { IReq, IRes } from './common/types';
import check from './common/check';

// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(_: IReq, res: IRes) {
  const customers = await CustomerService.getAll();
  res.status(HttpStatusCodes.OK).json({ customers });
}

/**
 * Add one user.
 */
async function add(req: IReq, res: IRes) {
  const customer = check.isValid(req.body, 'customer', Customer.is);
  await CustomerService.addOne(customer);
  res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one user.
 */
async function update(req: IReq, res: IRes) {
  const customer = check.isValid(req.body, 'customer', Customer.is);
  await CustomerService.updateOne(customer);
  res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one user.
 */
async function delete_(req: IReq, res: IRes) {
  const id = check.isNum(req.params, 'id');
  await CustomerService.delete(id);
  res.status(HttpStatusCodes.OK).end();
}

// **** Export default **** //

export default {
  getAll,
  add,
  update,
  delete: delete_,
} as const;
