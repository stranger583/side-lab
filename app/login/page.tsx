'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('password');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        
        if (res.ok) {
            console.log('res',res)
            router.push('/protected');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            admin:
            <input
                type="text"
                className='border border-border'
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            password:
            <input
                type="password"
                className='border border-border'
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );
}
