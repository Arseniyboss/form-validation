import * as z from 'zod'
import { ControllerRenderProps } from 'react-hook-form'
import { formSchema } from './validation/schema'

export type Values = z.infer<typeof formSchema>
export type Field = ControllerRenderProps<Values, keyof Values>
