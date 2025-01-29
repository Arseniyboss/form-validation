import * as z from 'zod'
import {
  EMAIL_REQUIRED,
  EMAIL_INVALID,
  PASSWORD_INVALID,
  PASSWORD_REQUIRED,
  PASSWORDS_DIFFERENT,
  ACCOUNT_TYPE_REQUIRED,
  COMPANY_NAME_REQUIRED,
} from './errors'

export const formSchema = z
  .object({
    email: z.string().min(1, EMAIL_REQUIRED).email(EMAIL_INVALID),
    password: z.string().min(1, PASSWORD_REQUIRED).min(6, PASSWORD_INVALID),
    confirmPassword: z.string().min(1, PASSWORD_REQUIRED).min(6, PASSWORD_INVALID),
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
