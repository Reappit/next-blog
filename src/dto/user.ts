import { z } from 'zod';
import { selectUserSchema } from '@/db/schema';

export const UserDto = selectUserSchema;

export type UserDto = z.infer<typeof selectUserSchema>;
