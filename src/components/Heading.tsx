import type { ReactNode } from 'react';
import React from 'react'

type HeadingVariant = 'lg' | 'base'
interface Props {
  children: ReactNode
  variant?: HeadingVariant
}

const Heading = ({ children, variant = 'base' }: Props) => {
  return (
    <h1
      data-variant={variant}
      className="text-5xl data-[variant='lg']:text-7xl font-extrabold tracking-tight text-[hsl(280,100%,70%)]">
      {children}
    </h1>
  )
}

export default Heading