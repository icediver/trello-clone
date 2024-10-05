import { List } from '@prisma/client';
import { z } from 'zod';

import { UpdateList } from './schema';
import { ActionStateType } from '@/lib/create-safe-action';

export type InputType = z.infer<typeof UpdateList>;
export type ReturnType = ActionStateType<InputType, List>;
