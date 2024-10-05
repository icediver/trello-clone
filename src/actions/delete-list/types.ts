import { List } from '@prisma/client';
import { z } from 'zod';

import { DeleteList } from './schema';
import { ActionStateType } from '@/lib/create-safe-action';

export type InputType = z.infer<typeof DeleteList>;
export type ReturnType = ActionStateType<InputType, List>;
