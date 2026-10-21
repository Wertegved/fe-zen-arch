import { clsx } from 'ui/utils'
import type { Path } from 'react-hook-form'
import { getFormContext } from '../form'
import { getInputErrorId, InputError } from './error'
import { Label } from './label'

interface TextInputProps {
  name?: string
  id?: string
  label?: string
  description?: string
  wrapClass?: string
  value?: string | number
  className?: string
  type?: 'text' | 'number' | 'email' | 'url' | 'password' | 'tel'
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  'aria-invalid'?: React.AriaAttributes['aria-invalid']
  'aria-describedby'?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement> | undefined
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined
  ref?: React.Ref<HTMLInputElement>
}

export function Input({
  description,
  label,
  wrapClass,
  className,
  name,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedBy,
  ...props
}: TextInputProps) {
  const id = props.id ?? name
  const context = getFormContext<any>()
  const errorId = name ? getInputErrorId(name) : undefined
  const hasError = Boolean(name && context?.hooks.getFieldState(name as Path<any>).error)
  const describedBy = [ariaDescribedBy, hasError ? errorId : undefined].filter(Boolean).join(' ') || undefined

  return (
    <div className={wrapClass}>
      {label && (
        <Label className="mb-1.5 block" htmlFor={id}>
          {label}
        </Label>
      )}
      {description && <p className="text-xs text-gray-800">{description}</p>}
      <input
        className={clsx(
          'outline-focus-input w-full rounded-md border bg-inherit px-3 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        name={name}
        id={id}
        aria-invalid={context && name ? (ariaInvalid ?? hasError) : ariaInvalid}
        aria-describedby={describedBy}
        {...props}
      />
      <InputError<any> name={name} id={errorId} />
    </div>
  )
}
