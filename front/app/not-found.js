'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';

export default function NotFound() {
    const router = useRouter()
    const { isAdmin, isEmployee } = useAuth()

    useEffect(() => {
        if (isAdmin) {
            router.push("/admin/dashboard")
        } else if (isEmployee) {
            router.push("/employee/dashboard")
        } else {
            router.push("/user/home")
        }
    }, [])

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1>Oops! Page not found.</h1>
            <p>Redirecting to home page...</p>
        </div>
    );
}
