import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface User {
    id: number;
    name: string;
    email: string;
    role: {
        name: string;
        display_name: string;
    };
}

interface Props {
    [key: string]: unknown;
}

export default function Dashboard() {
    const { auth } = usePage<Props & { auth: { user: User } }>().props;
    const user = auth.user;

    // Redirect to role-specific dashboard based on user role
    React.useEffect(() => {
        if (user?.role?.name) {
            // This will be handled by the DashboardController
            // which renders the appropriate dashboard based on role
        }
    }, [user]);

    return (
        <AppLayout>
            <Head title="Dashboard" />
            <div className="p-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        Selamat datang di Sistem Tahfidz Digital
                    </h1>
                    <p className="text-gray-600">
                        Anda akan diarahkan ke dashboard yang sesuai dengan peran Anda...
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}