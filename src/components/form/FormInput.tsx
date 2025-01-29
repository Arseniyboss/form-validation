import { HTMLInputTypeAttribute } from 'react'
import { Field } from '@/types'
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

type Props = {
  label: string
  type: HTMLInputTypeAttribute
  field: Field
}

const FormInput = ({ label, type, field }: Props) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input type={type} {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

export default FormInput
