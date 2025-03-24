'use client'

import React, { useEffect } from 'react'
import '@/i18n/i18next-config'

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>{children}</>
  )
} 