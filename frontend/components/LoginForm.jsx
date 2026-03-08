import { useState } from "react"
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import API_URL from '../config'

export function LoginForm({ onSubmit }) {
  // Login form state
  const [pass, setPass] = useState("")
  const [username, setUsername] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  // Register form state
  const [showRegister, setShowRegister] = useState(false)
  const [regPass, setRegPass] = useState("")
  const [regUsername, setRegUsername] = useState("")

  // Handle login form submission
  async function handleSubmit(e) {
    e.preventDefault()

    if (!pass || !username) {
      alert("Username and password are required")
      return
    }

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        credentials: 'include', // Require the auth cookie
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: pass })
      })

      const data = await response.json()

      if (response.ok) {
        setIsOpen(false)
        window.location.reload(); // Reload to updates logged-in state across the app
      } else {
        alert("Failed to login, incorrect username or password")
        setPass("")
        setUsername("")
      }
    } catch (err) {
      console.error(err)
    }

    //Clear fields after submission
    setPass("")
    setUsername("")
  }

  // Handle register form submission
  async function handleRegisterSubmit(e) {
    e.preventDefault()

    if (!regPass || !regUsername) {
      alert("Username and password are required")
      return
    }

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: regUsername, password: regPass })
      })

      if (response.ok) {
        alert("Successfully created account! You can now log in.")
        setShowRegister(false)  // Switch back to login view
        setRegPass("")
        setRegUsername("")
      } else {
        alert("Failed to register, username may already be taken")
        setRegPass("")
        setRegUsername("")
      }
    } catch (err) {
      console.error(err)
    }
  }

  //Styling
  const inputClass = "w-full px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
  const primaryBtn = "w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 cursor-pointer"

  return (
    <div>
        {/* Login button in the navbar */}
        <Button onClick={() => setIsOpen(true)} className='cursor-pointer text-white font-medium px-4 py-1.5 rounded-lg border border-white/40 hover:bg-white/20 transition-colors duration-200 text-sm'>Login</Button>

        {/* Modal dialog - both the login and register forms */}
        <Dialog open={isOpen} onClose={() => {
          setIsOpen(false); setShowRegister(false)}}>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" style={{ zIndex: 1000 }} aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 1001 }}>
                <DialogPanel className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-orange-600 to-orange-500 px-6 py-5">
                      <DialogTitle className="text-white text-xl font-bold">
                        {showRegister ? "Create Account" : "Welcome Back"}
                      </DialogTitle>
                      <p className="text-orange-100 text-sm mt-0.5">
                        {showRegister ? "Join Study Savior today" : "Sign in to Study Savior"}
                      </p>
                    </div>

                    {/* Form */}
                    <div className="px-6 py-6">
                      {!showRegister ? (
                        // Login form
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <input
                            className={inputClass}
                            placeholder="Username"
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                          />
                          <input
                            className={inputClass}
                            placeholder="Password"
                            type="password"
                            value={pass}
                            onChange={e => setPass(e.target.value)}
                            required
                          />
                          <Button type="submit" className={primaryBtn}>
                            Login
                          </Button>
                          {/* Link to switch to register */}
                          <p className="text-center text-sm text-gray-500">
                            Don't have an account?{" "}
                            <button
                              type="button"
                              onClick={() => setShowRegister(true)}
                              className="text-orange-500 hover:text-orange-600 font-medium cursor-pointer"
                            >
                              Register here
                            </button>
                          </p>
                        </form>
                      ) : (
                        // Register form
                        <form onSubmit={handleRegisterSubmit} className="space-y-4">
                          <input
                            className={inputClass}
                            placeholder="Username"
                            type="text"
                            value={regUsername}
                            onChange={e => setRegUsername(e.target.value)}
                            required
                          />
                          <input
                            className={inputClass}
                            placeholder="Password"
                            type="password"
                            value={regPass}
                            onChange={e => setRegPass(e.target.value)}
                            required
                          />
                          <Button type="submit" className={primaryBtn}>
                            Create Account
                          </Button>
                          {/* Link to switch back to login */}
                          <p className="text-center text-sm text-gray-500">
                            Already have an account?{" "}
                            <button
                              type="button"
                              onClick={() => setShowRegister(false)}
                              className="text-orange-500 hover:text-orange-600 font-medium cursor-pointer"
                            >
                              Login here
                            </button>
                          </p>
                        </form>
                      )}
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    </div>
  )
}