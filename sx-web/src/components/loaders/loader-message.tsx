import React from 'react'
import './loader-message.scss'
import { twMerge } from 'tailwind-merge'

export default function LoaderMessage({ className }: { className?: string }) {
  return <div className={twMerge('loader', className)}></div>
}
