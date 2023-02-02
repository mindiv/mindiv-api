import { object, string } from 'zod';

export const createGroupSchema = object({
  body: object({
    name: string({
      required_error: 'Group name is required',
    }),
  }),
});
