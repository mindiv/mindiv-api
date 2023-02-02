import { z } from 'zod';

export const createGroupSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Group name is required',
    }),
    category: z.string({
      required_error: 'Group category id is required',
    }),
    collectionId: z.string({
      required_error: 'Group collection id is required',
    }),
    description: z.string({
      required_error: 'Group description is required',
    }),
    cover: z
      .string({
        required_error: 'Group cover is required',
      })
      .optional(),
    difficulty: z.enum(['easy', 'medium', 'hard']),
  }),
});
