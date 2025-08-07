import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface User {
    id: number;
    name: string;
    email: string;
    role: {
        name: string;
        display_name: string;
    };
}

interface ActivityRecord {
    id: number;
    juz: number;
    page: number;
    type: string;
    score: number | null;
    recorded_date: string;
    santri: {
        name: string;
    };
    ustadz: {
        name: string;
    };
}

interface ProgressOverview {
    id: number;
    juz: number;
    is_completed: boolean;
    last_updated: string;
    santri: {
        name: string;
    };
}

interface Stats {
    total_santri: number;
    total_ustadz: number;
    total_records: number;
    records_today: number;
}

interface Props {
    user: User;
    stats: Stats;
    recentActivity: ActivityRecord[];
    progressOverview: ProgressOverview[];
    [key: string]: unknown;
}

export default function AdminDashboard({ user, stats, recentActivity, progressOverview }: Props) {
    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'tahfidz': return 'Tahfidz';
            case 'tahsin': return 'Tahsin';
            case 'tasmi': return 'Tasmi\'';
            default: return type;
        }
    };

    return (
        <AppShell>
            <Head title="Dashboard Admin" />
            
            <div className="p-6 space-y-6">
                {/* Welcome Header */}
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                    <h1 className="text-2xl font-bold mb-2">
                        👨‍💼 Dashboard Administrator
                    </h1>
                    <p className="text-purple-100">
                        Selamat datang, {user.name}! Kelola sistem tahfidz dengan mudah dan efisien.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <span className="text-xl">👨‍🎓</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Santri</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.total_santri}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <span className="text-xl">👨‍🏫</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Ustadz</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.total_ustadz}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-orange-100 rounded-lg">
                                <span className="text-xl">📚</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Records</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.total_records}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <span className="text-xl">📅</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Hari Ini</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.records_today}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Management Actions */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">🛠️ Manajemen Sistem</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link href="/admin/santri">
                            <Button className="w-full justify-start" size="lg" variant="outline">
                                <span className="mr-2">👨‍🎓</span>
                                Kelola Santri
                            </Button>
                        </Link>
                        <Link href="/admin/ustadz">
                            <Button className="w-full justify-start" size="lg" variant="outline">
                                <span className="mr-2">👨‍🏫</span>
                                Kelola Ustadz
                            </Button>
                        </Link>
                        <Link href="/admin/assignments">
                            <Button className="w-full justify-start" size="lg" variant="outline">
                                <span className="mr-2">🔗</span>
                                Assignment
                            </Button>
                        </Link>
                        <Link href="/admin/reports">
                            <Button className="w-full justify-start" size="lg" variant="outline">
                                <span className="mr-2">📊</span>
                                Laporan
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Import/Export Section */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">📁 Import & Export</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link href="/admin/import">
                            <Button className="w-full justify-start" size="lg">
                                <span className="mr-2">📥</span>
                                Import Data Excel
                            </Button>
                        </Link>
                        <Link href="/admin/export/excel">
                            <Button variant="outline" className="w-full justify-start" size="lg">
                                <span className="mr-2">📊</span>
                                Export Excel
                            </Button>
                        </Link>
                        <Link href="/admin/export/pdf">
                            <Button variant="outline" className="w-full justify-start" size="lg">
                                <span className="mr-2">📄</span>
                                Export PDF
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Activity */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6 border-b">
                            <h3 className="text-lg font-semibold text-gray-900">🕒 Aktivitas Terbaru</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4 max-h-96 overflow-y-auto">
                                {recentActivity.length > 0 ? recentActivity.map((activity) => (
                                    <div key={activity.id} className="border border-gray-100 rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    {getTypeLabel(activity.type)}
                                                </span>
                                                <p className="font-medium mt-1">
                                                    {activity.santri.name}
                                                </p>
                                            </div>
                                            {activity.score && (
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    activity.score >= 80 
                                                        ? 'bg-green-100 text-green-800'
                                                        : activity.score >= 70
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {activity.score}
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            <p>Juz {activity.juz}, Halaman {activity.page}</p>
                                            <p>Ustadz: {activity.ustadz.name}</p>
                                            <p>{new Date(activity.recorded_date).toLocaleDateString('id-ID')}</p>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center text-gray-500 py-8">
                                        <span className="text-4xl block mb-2">📊</span>
                                        <p>Belum ada aktivitas</p>
                                        <p className="text-sm">Data akan muncul setelah ada input</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Progress Overview */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6 border-b">
                            <h3 className="text-lg font-semibold text-gray-900">🏆 Pencapaian Terbaru</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4 max-h-96 overflow-y-auto">
                                {progressOverview.length > 0 ? progressOverview.map((progress) => (
                                    <div key={progress.id} className="border border-gray-100 rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <p className="font-medium">{progress.santri.name}</p>
                                                <p className="text-sm text-gray-600">
                                                    Menyelesaikan Juz {progress.juz}
                                                </p>
                                            </div>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                ✅ Selesai
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            <p>{new Date(progress.last_updated).toLocaleDateString('id-ID')}</p>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center text-gray-500 py-8">
                                        <span className="text-4xl block mb-2">🏆</span>
                                        <p>Belum ada pencapaian</p>
                                        <p className="text-sm">Pencapaian juz akan muncul di sini</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* System Health */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
                    <div className="text-center">
                        <span className="text-3xl block mb-3">⚙️</span>
                        <h3 className="text-xl font-bold mb-2">Status Sistem</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div className="bg-white bg-opacity-20 rounded-lg p-4">
                                <p className="font-semibold">Server</p>
                                <p className="text-green-200">✅ Online</p>
                            </div>
                            <div className="bg-white bg-opacity-20 rounded-lg p-4">
                                <p className="font-semibold">Database</p>
                                <p className="text-green-200">✅ Terhubung</p>
                            </div>
                            <div className="bg-white bg-opacity-20 rounded-lg p-4">
                                <p className="font-semibold">Backup</p>
                                <p className="text-green-200">✅ Terkini</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}