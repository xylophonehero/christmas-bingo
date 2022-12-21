import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

interface Props extends ComponentPropsWithoutRef<'input'> {
  label: string
}

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => (
  <label className="block flex flex-col gap-1 w-full">
    <span className="text-brand">{props.label}</span>
    <input ref={ref} {...props} className="block w-full p-2.5 rounded-md bg-gray-700 border-gray-600 sm:text-sm" />
  </label>
))
Input.displayName = 'Input'

export default Input