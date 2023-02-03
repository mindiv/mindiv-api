import { z } from 'zod';

const dataInputFromUser = z.string().min(8).max(16);
dataInputFromUser.parse('Hello');
