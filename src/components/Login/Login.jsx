import './login.css'
import { useState } from "react";
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import upload from '../../lib/upload';

const Login = () => {

  const [avatar, setAvatar] = useState({
    file: null,
    url: ""
  })

  const [loading, setLoading] = useState(false);

  const handleAvatar = e => {
    if (e.target.files[0]) {

      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      })
    }
  }

  const handleLogin = async(e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.target); //This FormData object collects all the form's input data.
    const { email, password } = Object.fromEntries(formData); //Converting the FormData object to a plain object using Object.fromEntries().

    try {

      await signInWithEmailAndPassword(auth, email, password);
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    finally{
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    setLoading(true);

    const formData = new FormData(e.target); //This FormData object collects all the form's input data.
    const { username, email, password } = Object.fromEntries(formData); //Converting the FormData object to a plain object using Object.fromEntries().

    try {

      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Default image URL if no file is selected
      const defaultImageUrl = "./avatar.png";
      
      let imgUrl;
      
      // Check if an avatar file is selected and upload it
      if (avatar.file != null) {

        imgUrl = await upload(avatar.file);
      }

      else {

        imgUrl = await upload(defaultImageUrl);
      }

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
      });

      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });

      toast.success("Account created successfully!")

    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }finally{
      setLoading(false)
    }

  };

  return (
    <div className='login'>
      <div className="item">
        <h2>Welcome back,</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder='Password' name="password" />
          <button disabled={loading}>Sign In</button>
          <span>Or</span>
          <button style={{cursor: 'not-allowed', backgroundColor: 'rgba(6, 6, 126, 0.651)'}}>Sign In with <img src="./google-icon.png" alt="" /></button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="" />
            <div className='text'>Upload an image</div></label>
          <input type="file" id='file' style={{ display: "none" }} onChange={handleAvatar} />
          <input type="text" placeholder="Username" name="username" />
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button disabled={loading}>Sign Up</button>
          <span>Or</span>
          <button style={{cursor: 'not-allowed', backgroundColor: 'rgba(6, 6, 126, 0.651)'}}><div>Sign Up with</div> <img src="./google-icon.png" alt="" /></button>
        </form>
      </div>
    </div>
  )
}

export default Login 