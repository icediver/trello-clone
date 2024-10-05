import { List } from '@prisma/client';
import { z } from 'zod';

import { UpdateListOrder } from './schema';
import { ActionStateType } from '@/lib/create-safe-action';

export type InputType = z.infer<typeof UpdateListOrder>;
export type ReturnType = ActionStateType<InputType, List[]>;
