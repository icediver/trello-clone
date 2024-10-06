import { Card } from '@prisma/client';
import { z } from 'zod';

import { UpdateCard } from './schema';
import { ActionStateType } from '@/lib/create-safe-action';

export type InputType = z.infer<typeof UpdateCard>;
export type ReturnType = ActionStateType<InputType, Card>;
