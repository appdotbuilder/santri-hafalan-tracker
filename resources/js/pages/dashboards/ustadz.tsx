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

interface Progress {
    juz: number;
    is_completed: boolean;
}

interface TahfidzRecord {
    id: number;
    juz: number;
    page: number;
    type: string;
    score: number | null;
    recorded_date: string;
}

interface Student {
    id: number;
    name: string;
    email: string;
    progress: Progress[];
    tahfidz_records: TahfidzRecord[];
}

interface RecentRecord {
    id: number;
    juz: number;
    page: number;
    type: string;
    score: number | null;
    recorded_date: string;
    santri: {
        name: string;
    };
}

interface Stats {
    total_students: number;
    total_records: number;
    records_today: number;
    average_score: number | null;
}

interface Props {
    user: User;
    students: Student[];
    recentRecords: RecentRecord[];
    stats: Stats;
    [key: string]: unknown;
}

export default function UstadzDashboard({ user, students, recentRecords, stats }: Props) {
    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'tahfidz': return 'Tahfidz';
            case 'tahsin': return 'Tahsin';
            case 'tasmi': return 'Tasmi\'';
            default: return type;
        }
    };

    const getCompletedJuz = (progress: Progress[]) => {
        return progress.filter(p => p.is_completed).length;
    };

    return (
        <AppShell>
            <Head title="Dashboard Ustadz" />
            
            <div className="p-6 space-y-6">
                {/* Welcome Header */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
                    <h1 className="text-2xl font-bold mb-2">
                        🕌 Assalamu'alaikum, Ustadz {user.name}!
                    </h1>
                    <p className="text-green-100">
                        Barakallahu fiikum atas dedikasi dalam membimbing para santri
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <span className="text-xl">👥</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Santri Binaan</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.total_students}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <span className="text-xl">📚</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Input</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.total_records}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-orange-100 rounded-lg">
                                <span className="text-xl">📅</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Hari Ini</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.records_today}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <span className="text-xl">⭐</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Rata-rata Nilai</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {stats.average_score ? Math.round(stats.average_score) : 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Aksi Cepat</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link href="/tahfidz/create">
                            <Button className="w-full justify-start" size="lg">
                                <span className="mr-2">📝</span>
                                Input Tahfidz Baru
                            </Button>
                        </Link>
                        <Link href="/tahfidz">
                            <Button variant="outline" className="w-full justify-start" size="lg">
                                <span className="mr-2">📋</span>
                                Lihat Semua Data
                            </Button>
                        </Link>
                        <Link href="/reports">
                            <Button variant="outline" className="w-full justify-start" size="lg">
                                <span className="mr-2">📊</span>
                                Laporan Progres
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Students List */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6 border-b">
                            <h3 className="text-lg font-semibold text-gray-900">👨‍🎓 Santri Binaan</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4 max-h-96 overflow-y-auto">
                                {students.length > 0 ? students.map((student) => (
                                    <div key={student.id} className="border border-gray-100 rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <p className="font-medium">{student.name}</p>
                                                <p className="text-sm text-gray-600">{student.email}</p>
                                            </div>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                {getCompletedJuz(student.progress)} Juz
                                            </span>
                                        </div>
                                        
                                        {student.tahfidz_records.length > 0 && (
                                            <div className="mt-3 pt-3 border-t border-gray-100">
                                                <p className="text-xs text-gray-500 mb-2">Setoran Terakhir:</p>
                                                <div className="space-y-1">
                                                    {student.tahfidz_records.slice(0, 2).map((record) => (
                                                        <div key={record.id} className="flex justify-between text-xs">
                                                            <span>
                                                                {getTypeLabel(record.type)} - Juz {record.juz}, Hal. {record.page}
                                                            </span>
                                                            {record.score && (
                                                                <span className="font-medium">
                                                                    {record.score}
                                                                </span>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )) : (
                                    <div className="text-center text-gray-500 py-8">
                                        <span className="text-4xl block mb-2">👥</span>
                                        <p>Belum ada santri binaan</p>
                                        <p className="text-sm">Hubungi admin untuk assignment santri</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6 border-b">
                            <h3 className="text-lg font-semibold text-gray-900">🕒 Aktivitas Terbaru</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4 max-h-96 overflow-y-auto">
                                {recentRecords.length > 0 ? recentRecords.map((record) => (
                                    <div key={record.id} className="border border-gray-100 rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    {getTypeLabel(record.type)}
                                                </span>
                                                <p className="font-medium mt-1">
                                                    {record.santri.name}
                                                </p>
                                            </div>
                                            {record.score && (
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    record.score >= 80 
                                                        ? 'bg-green-100 text-green-800'
                                                        : record.score >= 70
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {record.score}
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            <p>Juz {record.juz}, Halaman {record.page}</p>
                                            <p>{new Date(record.recorded_date).toLocaleDateString('id-ID')}</p>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center text-gray-500 py-8">
                                        <span className="text-4xl block mb-2">📝</span>
                                        <p>Belum ada aktivitas</p>
                                        <p className="text-sm">Mulai input data tahfidz santri</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Motivational Section */}
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg p-6 text-white">
                    <div className="text-center">
                        <span className="text-3xl block mb-3">🌟</span>
                        <p className="text-lg italic mb-2">
                            "مَنْ عَلَّمَ عِلْمًا فَلَهُ أَجْرُ مَنْ عَمِلَ بِهِ لَا يَنْقُصُ مِنْ أَجْرِ الْعَامِلِ شَيْئًا"
                        </p>
                        <p className="text-emerald-100">
                            "Barangsiapa mengajarkan ilmu, maka dia mendapat pahala orang yang mengamalkannya, 
                            tanpa mengurangi pahala orang yang mengamalkannya sedikitpun"
                        </p>
                        <p className="text-sm text-emerald-200 mt-2">- HR. Ibnu Majah</p>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}