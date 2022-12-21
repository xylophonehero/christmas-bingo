import type { ComponentPropsWithoutRef } from 'react';
import React, { forwardRef } from 'react'

type Props = ComponentPropsWithoutRef<'button'> & {
  round?: boolean
}

const Button = forwardRef<HTMLButtonElement, Props>(({ children, round, ...props }, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      data-round={round}
      className="rounded-full bg-white/10 px-6 py-3 data-[round]:px-3 font-semibold text-white no-underline hover:bg-white/20"
    >
      {children}
    </button>
  )
})
Button.displayName = 'Button'

export default Button