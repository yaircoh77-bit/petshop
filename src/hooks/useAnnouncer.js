import { useState } from 'react'

export function useAnnouncer() {
  const [message, setMessage] = useState('')

  const announce = (msg) => {
    setMessage('')
    setTimeout(() => setMessage(msg), 50)
  }

  return { message, announce }
}
