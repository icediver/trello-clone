import { Card } from '@prisma/client';
import { z } from 'zod';

import { DeleteCard } from './schema';
import { ActionStateType } from '@/lib/create-safe-action';

export type InputType = z.infer<typeof DeleteCard>;
export type ReturnType = ActionStateType<InputType, Card>;
