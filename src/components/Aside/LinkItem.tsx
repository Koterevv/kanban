import Link from 'next/link'
import * as React from 'react'

interface Props {
  link: string
  children: React.ReactNode
  icon: string
}

export const LinkItem = ({link, children, icon}:Props) => {
  const Icon = icon

  return (
    <Link className='flex items-center gap-2 hover:bg-white/20 p-2 rounded-lg w-max' href={link}>
      <Icon/>
      {children}
    </Link>
  )
}
