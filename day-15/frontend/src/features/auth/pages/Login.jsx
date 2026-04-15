import React, { useState } from 'react'
import '../style/form.scss'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Login = () => {

  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [error, setError] = useState(null)

  const { loading, handleLogin } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      await handleLogin(username, password)
      navigate('/feed')
    } catch (err) {
      setError(err.message || "Invalid username or password")
    }
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            onInput={(e) => { setusername(e.target.value) }}
            type="text"
            name='username'
            placeholder='Enter username' />
          <input
            onInput={(e) => { setpassword(e.target.value) }}
            type="password"
            name='password'
            placeholder='Enter password' />
          {error && <p style={{ color: 'rgb(220, 50, 50)', fontSize: '0.85rem', marginTop: '-0.5rem' }}>{error}</p>}
          <button className='button primary-button' disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p>Don't have an account? <Link to="/register">Register.</Link></p>
      </div>
    </main>
  )
}

export default Login
