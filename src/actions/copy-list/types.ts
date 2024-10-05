import { List } from '@prisma/client';
import { z } from 'zod';

import { CopyList } from './schema';
import { ActionStateType } from '@/lib/create-safe-action';

export type InputType = z.infer<typeof CopyList>;
export type ReturnType = ActionStateType<InputType, List>;
