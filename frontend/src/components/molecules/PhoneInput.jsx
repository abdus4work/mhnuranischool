
import 'react-phone-number-input/style.css'

import PhoneInput from 'react-phone-number-input'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export function PhoneNumberInput({ className, inputProps, field, ...props }) {
  return (
    <PhoneInput
      {...props}
      className={cn('flex items-center gap-2', className)}
      international
      defaultCountry="IN"
      countrySelectProps={{ className: '!text-sm' }}
      inputComponent={Input}
      numberInputProps={{
        ...inputProps,
        className: cn('flex-1', inputProps?.className),
      }}
      {...field}
      onChange={(value) => field.onChange(value)}
    />
  )
}
