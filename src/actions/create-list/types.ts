import { List } from '@prisma/client';
import { z } from 'zod';

import { CreateList } from './schema';
import { ActionStateType } from '@/lib/create-safe-action';

export type InputType = z.infer<typeof CreateList>;
export type ReturnType = ActionStateType<InputType, List>;
