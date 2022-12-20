import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

type Props = ComponentPropsWithoutRef<'input'>

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => (
  <input ref={ref} {...props} className="block w-full p-2.5 rounded-md bg-gray-700 border-gray-600 sm:text-sm" />
))
Input.displayName = 'Input'

export default Input