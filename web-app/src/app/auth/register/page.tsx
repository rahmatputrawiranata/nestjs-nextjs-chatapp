'use client'
import { useRouter } from 'next/navigation';
import React, {useState} from 'react';

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log({ username, password, email})
    }

    const router = useRouter()

    return (
        <div className="bg-radial-gradient-form flex flex-col h-full p-5">
            <div className='flex mb-2'>
                <button onClick={() => router.back()} className="text-white">Back</button>
            </div>
            <div>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                    />
                    <button type="submit">Register</button>
                </form>h
            </div>
        </div>
    )
}

export default RegisterPage;