import React, { useState } from 'react'
import '../style/form.scss'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Register = () => {
  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [error, setError] = useState(null)

  const { loading, handleRegister } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      await handleRegister(username, email, password)
      navigate('/')
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.")
    }
  }


  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            onInput={(e) => { setusername(e.target.value) }}
            type="text"
            name='username'
            placeholder='Enter username' />
          <input
            onInput={(e) => { setemail(e.target.value) }}
            type="text"
            name='email'
            placeholder='Enter email' />
          <input
            onInput={(e) => { setpassword(e.target.value) }}
            type="password"
            name='password'
            placeholder='Enter password' />
          {error && <p style={{ color: 'rgb(220, 50, 50)', fontSize: '0.85rem', marginTop: '-0.5rem' }}>{error}</p>}
          <button className='button primary-button' disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </main>
  )
}

export default Register
