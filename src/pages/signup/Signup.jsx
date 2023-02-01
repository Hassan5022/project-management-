//  styles
import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import './Signup.css';

const Signup = () => {

  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)
  const {signup, error, isPending} = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName, thumbnail)
  }

  const handleFileChange = (e) => {
    setThumbnail(null)
    setThumbnailError(null)
    let image = e.target.files[0]
    if (!image) {
      setThumbnailError("Please select a file")
      return
    }
    if (!image.type.includes("image")) {
      setThumbnailError("File must be an image")
      return
    }
    if (image.size >= 1000000) {
      setThumbnailError("Image size file must be less than 1MB")
      return
    }
    setThumbnail(image)
    setThumbnailError(null)
  }

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <label>
        <span>email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </label>
      <label>
        <span>Display Name:</span>
        <input
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
          required
        />
      </label>
      <label>
        <span>Profile Thumbnail:</span>
        <input
          type="file"
          required
          onChange={handleFileChange}
        />
        {thumbnailError && <div className='error'>{ thumbnailError }</div>}
      </label>
      {!isPending && <button className="btn">Sign up</button>}
      {isPending && <button className="btn" disabled>Loading</button>}
      {error && <div className='error'>{error }</div>}
    </form>
  )
}

export default Signup