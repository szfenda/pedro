'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Loader from '../components/ui/loader'

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      router.push('/discover')
    }, 1500)
    return () => clearTimeout(timer)
  }, [router])

  if (loading) return <Loader />
  return null
}