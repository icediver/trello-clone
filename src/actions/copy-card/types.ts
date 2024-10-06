import { Card } from '@prisma/client';
import { z } from 'zod';

import { CopyCard } from './schema';
import { ActionStateType } from '@/lib/create-safe-action';

export type InputType = z.infer<typeof CopyCard>;
export type ReturnType = ActionStateType<InputType, Card>;
