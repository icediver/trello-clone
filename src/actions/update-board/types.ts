import { Board } from '@prisma/client';
import { z } from 'zod';

import { UpdateBoard } from './schema';
import { ActionStateType } from '@/lib/create-safe-action';

export type InputType = z.infer<typeof UpdateBoard>;
export type ReturnType = ActionStateType<InputType, Board>;
