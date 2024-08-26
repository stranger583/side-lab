import { NextResponse } from 'next/server';
import { generateToken } from '@/utils/jwt';

export async function POST(req: Request) {
    const { username, password } = await req.json();

    // 假設這裡有一個驗證邏輯
    if (username === 'test@gmail.com' && password === 'password') {
        const token = generateToken({ username });
        const response = NextResponse.json({ success: true });
        response.cookies.set('auth-token', token, { httpOnly: true });
        return response;
    }

    return NextResponse.json({ success: false, error: 'Invalid credentials' });
}
