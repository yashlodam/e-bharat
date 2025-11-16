import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Timestamp, collection, addDoc } from 'firebase/firestore';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import Loader from '../../components/loader/Loader.jsx';

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const navigate = useNavigate();

  const signup = async () => {
    if (!name || !email || !password) return toast.error("All fields are required");

    setLoading(true);
    try {
      const users = await createUserWithEmailAndPassword(auth, email, password);

      const user = {
        name,
        uid: users.user.uid,
        email: users.user.email,
        isAdmin: email === "vitthal2004@gmail.com",
        time: Timestamp.now()
      };

      await addDoc(collection(fireDB, "users"), user);

      toast.success("Signup Successfully");
      setName(""); setEmail(""); setPassword("");
      navigate("/login");

    } catch (error) {
      console.error(error);
      toast.error("Signup Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex justify-center items-center h-screen bg-gray-900'>
      {loading && <Loader />}
      <div className='bg-gray-800 px-10 py-10 rounded-xl drop-shadow-xl w-full max-w-md'>
        <h1 className='text-center text-white text-2xl mb-6 font-bold'>Signup</h1>

        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder='Name'
          className='bg-gray-700 mb-4 px-3 py-2 w-full rounded-lg text-white placeholder:text-gray-300 outline-none'
        />

        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='Email'
          className='bg-gray-700 mb-4 px-3 py-2 w-full rounded-lg text-white placeholder:text-gray-300 outline-none'
        />

        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='Password'
          className='bg-gray-700 mb-6 px-3 py-2 w-full rounded-lg text-white placeholder:text-gray-300 outline-none'
        />

        <button
          onClick={signup}
          className='bg-red-500 w-full text-white font-bold px-3 py-2 rounded-lg mb-4 hover:bg-red-600 transition duration-300'
        >
          Signup
        </button>

        <p className='text-white text-center mt-4'>
          Already have an account? <Link className='text-red-400 font-bold' to='/login'>Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup;
