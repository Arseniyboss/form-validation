import * as z from 'zod'
import {
  EMAIL_REQUIRED,
  EMAIL_INVALID,
  PASSWORD_REQUIRED,
  PASSWORD_LENGTH_INVALID,
  PASSWORD_PATTERN_INVALID,
  PASSWORDS_DIFFERENT,
  ACCOUNT_TYPE_REQUIRED,
  COMPANY_NAME_REQUIRED,
} from './errors'
import { PASSWORD_PATTERN } from './patterns'

export const formSchema = z
  .object({
    email: z.string().min(1, EMAIL_REQUIRED).email(EMAIL_INVALID),
    password: z
      .string()
      .min(1, PASSWORD_REQUIRED)
      .min(8, PASSWORD_LENGTH_INVALID)
      .regex(PASSWORD_PATTERN, PASSWORD_PATTERN_INVALID),
    confirmPassword: z.string().min(1, PASSWORD_REQUIRED),
    accountType: z.enum(['personal', 'company'], { message: ACCOUNT_TYPE_REQUIRED }),
    companyName: z.string().optional(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: PASSWORDS_DIFFERENT,
    path: ['confirmPassword'],
  })
  .refine((values) => values.accountType !== 'company' || !!values.companyName, {
    message: COMPANY_NAME_REQUIRED,
    path: ['companyName'],
  })
