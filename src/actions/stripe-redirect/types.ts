import { z } from 'zod';

import { StripeRedirect } from './schema';
import { ActionStateType } from '@/lib/create-safe-action';

export type InputType = z.infer<typeof StripeRedirect>;
export type ReturnType = ActionStateType<InputType, string>;
