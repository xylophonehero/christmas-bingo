import type { ReactNode } from 'react';
import React from 'react'

interface Props {
  children: ReactNode
}

const Heading = ({ children }: Props) => {
  return (
    <h1 className="text-5xl font-extrabold tracking-tight text-[hsl(280,100%,70%)] sm:text-[5rem]">
      {children}
    </h1>
  )
}

export default Heading