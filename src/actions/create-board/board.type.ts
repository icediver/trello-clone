import { Board } from '@prisma/client';
import { z } from 'zod';

import { CreateBoard } from './schema';
import { ActionStateType } from '@/lib/create-safe-action';

export type InputType = z.infer<typeof CreateBoard>;
export type ReturnType = ActionStateType<InputType, Board>;
