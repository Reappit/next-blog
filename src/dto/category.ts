import { z } from 'zod';
import { selectCategorySchema } from '@/db/schema';

export const CategoryDto = selectCategorySchema;

export type CategoryDto = z.infer<typeof CategoryDto>;
