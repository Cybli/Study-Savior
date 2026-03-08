import { useState } from "react"
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import API_URL from '../config'

export function LoginForm({ onSubmit }) {
  const [pass, setPass] = useState("")
  const [username, setUsername] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    if (!pass || !username) {
      alert("Username and password are required")
      return
    }

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: pass })
      })

      const data = await response.json()

      if (response.ok) {
        setIsOpen(false)
        window.location.reload();
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
        <Button onClick={() => setIsOpen(true)} className='cursor-pointer'>Login</Button>

        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <div className="fixed inset-0 bg-black/30" style={{ zIndex: 1000 }} aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 1001 }}>
                <DialogPanel className='bg-white'>
                    <DialogTitle>Login</DialogTitle>
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

                        <Button type="submit" className='cursor-pointer'>Login</Button>
                    </form>
                </DialogPanel>
            </div>
        </Dialog>
    </div>
  )
}