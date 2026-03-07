import { useState } from "react"
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import API_URL from '../config'

export function RegisterForm ({onSubmit}) {
  const [userId, setUserId] = useState()
  const [pass, setPass] = useState("")
  const [username, setUsername] = useState("")
  const [status, setStatus] = useState()
  const [isOpen, setIsOpen] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    if (!pass || !username) {
      alert("Username and password are required")
      return
    }

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: pass })
      })

      if (response.status !== 401) {
        const data = await response.json()
        setIsOpen(false)
      } else {
        alert("Failed to login, incorrect username or password")
        setPass("")
        setUsername("")
      }
    } catch (err) {
      console.error(err)
    }

    setPass("")
    setUsername("")
  }

  return (
    <div>
      <Button onClick={() => setIsOpen(true)} className='cursor-pointer'>Register</Button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="fixed inset-0 bg-black/30" style={{ zIndex: 1000 }} aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 1001 }}>
        <DialogPanel className='bg-white'>
          <DialogTitle>Register</DialogTitle>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
            
            <input
                placeholder="Password"
                type="password"
                value={pass}
                onChange={e => setPass(e.target.value)}
                required
            />

            <Button type="submit">Register</Button>
            </form>
        </DialogPanel>
      </div>
      </Dialog>
    </div>
  )


}

