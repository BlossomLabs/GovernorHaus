import React from 'react'
import { SITE_EMOJI } from '@/utils/site'
import { Connect } from './Connect'

export function Header() {
  return (
    <header className='navbar flex justify-between p-4 pt-0'>
      <a href='/'>
        <h1 className='text-xl font-bold'>{SITE_EMOJI}</h1>
      </a>

      <div className='flex gap-2'>
        <Connect />
      </div>
    </header>
  )
}