import React from 'react';
import { Head } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface User {
    id: number;
    name: string;
    email: string;
    role: {
        name: string;
        display_name: string;
    };
}

interface TahfidzRecord {
    id: number;
    juz: number;
    page: number;
    type: string;
    score: number | null;
    notes: string | null;
    recorded_date: string;
    ustadz: {
        name: string;
    };
}

interface Progress {
    id: number;
    juz: number;
    total_pages: number;
    completed_pages: number;
    average_score: number | null;
    is_completed: boolean;
}

interface Stats {
    total_records: number;
    completed_juz: number;
    average_score: number | null;
    current_juz: number;
}

interface Props {
    user: User;
    recentRecords: TahfidzRecord[];
    progress: Progress[];
    stats: Stats;
    [key: string]: unknown;
}

export default function SantriDashboard({ user, recentRecords, progress, stats }: Props) {
    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'tahfidz': return 'Tahfidz';
            case 'tahsin': return 'Tahsin';
            case 'tasmi': return 'Tasmi\'';
            default: return type;
        }
    };

    const getProgressPercentage = (prog: Progress) => {
        if (prog.total_pages === 0) return 0;
        return Math.round((prog.completed_pages / prog.total_pages) * 100);
    };

    return (
        <AppShell>
            <Head title="Dashboard Santri" />
            
            <div className="p-6 space-y-6">
                {/* Welcome Header */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                    <h1 className="text-2xl font-bold mb-2">
                        🌟 Assalamu'alaikum, {user.name}!
                    </h1>
                    <p className="text-blue-100">
                        Semoga Allah mudahkan perjalanan tahfidz Anda hari ini
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <span className="text-xl">📚</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Setoran</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.total_records}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <span className="text-xl">✅</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Juz Selesai</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.completed_juz}</p>
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

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <span className="text-xl">📖</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Juz Saat Ini</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.current_juz}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Progress Chart */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6 border-b">
                            <h3 className="text-lg font-semibold text-gray-900">📊 Progres Hafalan</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4 max-h-96 overflow-y-auto">
                                {progress.map((prog) => (
                                    <div key={prog.juz} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-3 h-3 rounded-full ${
                                                prog.is_completed ? 'bg-green-500' : 'bg-gray-300'
                                            }`} />
                                            <span className="font-medium">Juz {prog.juz}</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-24 bg-gray-200 rounded-full h-2">
                                                <div 
                                                    className={`h-2 rounded-full ${
                                                        prog.is_completed ? 'bg-green-500' : 'bg-blue-500'
                                                    }`}
                                                    style={{ width: `${getProgressPercentage(prog)}%` }}
                                                />
                                            </div>
                                            <span className="text-sm text-gray-600 w-12">
                                                {getProgressPercentage(prog)}%
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recent Records */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6 border-b">
                            <h3 className="text-lg font-semibold text-gray-900">🕒 Setoran Terbaru</h3>
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
                                                    Juz {record.juz}, Hal. {record.page}
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
                                            <p>Ustadz: {record.ustadz.name}</p>
                                            <p>Tanggal: {new Date(record.recorded_date).toLocaleDateString('id-ID')}</p>
                                            {record.notes && (
                                                <p className="mt-1 italic">"{record.notes}"</p>
                                            )}
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center text-gray-500 py-8">
                                        <span className="text-4xl block mb-2">📝</span>
                                        <p>Belum ada setoran</p>
                                        <p className="text-sm">Mulai setoran hafalan Anda hari ini!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Motivational Quote */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-6 text-white">
                    <div className="text-center">
                        <span className="text-3xl block mb-3">🤲</span>
                        <p className="text-lg italic mb-2">
                            "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ"
                        </p>
                        <p className="text-green-100">
                            "Sebaik-baik kalian adalah yang mempelajari Al-Quran dan mengajarkannya"
                        </p>
                        <p className="text-sm text-green-200 mt-2">- HR. Bukhari</p>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}