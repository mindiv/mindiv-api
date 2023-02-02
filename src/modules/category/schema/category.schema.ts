import { object, string } from 'zod';

export const createCategorySchema = object({
  body: object({
    name: string({
      required_error: 'Category name is required',
    }),
    description: string({
      required_error: 'Category description is required',
    }),
    cover: string({
      required_error: 'Category cover is required',
    }).url('Not a valid url'),
  }),
});
