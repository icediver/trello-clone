import { Card } from '@prisma/client';
import { z } from 'zod';

import { CreateCard } from './schema';
import { ActionStateType } from '@/lib/create-safe-action';

export type InputType = z.infer<typeof CreateCard>;
export type ReturnType = ActionStateType<InputType, Card>;
