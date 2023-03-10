import { z } from 'zod';

export const createQuestionSchema = z.object({
  body: z.object({
    question: z.string({
      required_error: 'Question is required',
    }),
    options: z
      .array(
        z.string({
          required_error: 'Options are required',
        })
      )
      .length(4, { message: 'Max 4 options' }),
    correctOption: z.number({
      required_error: 'Correct option is required',
    }),
    category: z.string(),
    difficulty: z.enum(['easy', 'medium', 'hard']),
  }),
});
