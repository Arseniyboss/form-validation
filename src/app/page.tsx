'use client'

import { DefaultValues, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema } from '@/validation/schema'
import { Values } from '@/types'
import { Form, FormField } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import FormInput from '@/components/form/FormInput'
import FormSelect from '@/components/form/FormSelect'

const Home = () => {
  const defaultValues: DefaultValues<Values> = {
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
  }
  const accountTypes = [
    { value: 'personal', label: 'Personal' },
    { value: 'company', label: 'Company' },
  ]

  const resolver = zodResolver(formSchema)
  const form = useForm<Values>({ resolver, defaultValues })

  const accountType = form.watch('accountType')

  const onSubmit = (values: Values) => {
    console.log({ values })
    alert('Success!')
  }
  return (
    <main className="center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="form">
          <h1 className="text-3xl">Sign Up</h1>
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => <FormInput label="Email" type="email" field={field} />}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormInput label="Password" type="password" field={field} />
            )}
          />
          <FormField
            name="confirmPassword"
            control={form.control}
            render={({ field }) => (
              <FormInput label="Confirm Password" type="password" field={field} />
            )}
          />
          <FormField
            name="accountType"
            control={form.control}
            render={({ field }) => (
              <FormSelect
                label="Account Type"
                placeholder="Select an account type"
                options={accountTypes}
                field={field}
              />
            )}
          />
          {accountType === 'company' && (
            <FormField
              name="companyName"
              control={form.control}
              render={({ field }) => (
                <FormInput label="Company Name" type="text" field={field} />
              )}
            />
          )}
          <Button>Sign Up</Button>
        </form>
      </Form>
    </main>
  )
}

export default Home
