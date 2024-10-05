import { Card } from '@prisma/client';
import { z } from 'zod';

import { UpdateCardOrder } from './schema';
import { ActionStateType } from '@/lib/create-safe-action';

export type InputType = z.infer<typeof UpdateCardOrder>;
export type ReturnType = ActionStateType<InputType, Card[]>;
