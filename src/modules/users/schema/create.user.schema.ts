import { object, string } from 'zod';

export const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: 'First name is required',
    }),
    lastName: string({
      required_error: 'Last name is required',
    }),
    email: string({
      required_error: 'Eamil is required',
    }).email('Not a valid email'),
    password: string({
      required_error: 'Password is required',
    }).min(5, 'Password is short - should be 5 chars minimum'),
  }),
});
