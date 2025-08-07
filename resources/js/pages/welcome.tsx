import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    auth?: {
        user: {
            id: number;
            name: string;
            email: string;
            role: {
                name: string;
                display_name: string;
            };
        };
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
            <Head title="Sistem Tahfidz Digital" />
            
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                                <span className="text-white text-lg font-bold">📖</span>
                            </div>
                            <h1 className="text-xl font-bold text-gray-900">Sistem Tahfidz Digital</h1>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            {auth?.user ? (
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm text-gray-600">
                                        Selamat datang, {auth.user.name} ({auth.user.role.display_name})
                                    </span>
                                    <Link href="/dashboard">
                                        <Button>Dashboard</Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <Link href="/login">
                                        <Button variant="outline">Masuk</Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button>Daftar</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
                        📚 Sistem Tahfidz Digital
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
                        Platform modern untuk mencatat dan memantau perkembangan hafalan Al-Quran santri
                        dengan teknologi terkini dan tampilan yang responsif.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Santri Features */}
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                            <span className="text-2xl">👨‍🎓</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Untuk Santri</h3>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                Lihat histori setoran hafalan
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                Pantau nilai tasmi' dan progres
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                Grafik perkembangan hafalan
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                Cetak laporan progres PDF
                            </li>
                        </ul>
                    </div>

                    {/* Ustadz Features */}
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                            <span className="text-2xl">👨‍🏫</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Untuk Ustadz</h3>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                Input data TTQ (Tahfidz, Tahsin, Tasmi')
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                Penilaian kelancaran & makhraj
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                Catatan kendala hafalan
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                Dashboard santri binaan
                            </li>
                        </ul>
                    </div>

                    {/* Admin Features */}
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                            <span className="text-2xl">👨‍💼</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Untuk Admin</h3>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                Kelola data santri & ustadz (CRUD)
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                Import data dari Excel
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                Export laporan Excel/PDF
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                Dashboard analytics lengkap
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Key Features */}
                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        ✨ Fitur Unggulan
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">📱</span>
                            </div>
                            <h3 className="font-semibold text-gray-900">Mobile Friendly</h3>
                            <p className="text-sm text-gray-600 mt-1">Responsif di semua perangkat</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">⚡</span>
                            </div>
                            <h3 className="font-semibold text-gray-900">Real-time</h3>
                            <p className="text-sm text-gray-600 mt-1">Data terupdate secara otomatis</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">📊</span>
                            </div>
                            <h3 className="font-semibold text-gray-900">Visualisasi</h3>
                            <p className="text-sm text-gray-600 mt-1">Grafik progres yang jelas</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">📄</span>
                            </div>
                            <h3 className="font-semibold text-gray-900">Export</h3>
                            <p className="text-sm text-gray-600 mt-1">Laporan Excel & PDF</p>
                        </div>
                    </div>
                </div>

                {/* Standards Section */}
                <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
                        📖 Standar Mushaf Utsmani
                    </h2>
                    <div className="text-center text-gray-600">
                        <p className="mb-4">
                            Sistem ini menggunakan standar pembagian juz dan halaman berdasarkan Mushaf Utsmani
                            yang telah diakui secara internasional.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <strong>30 Juz</strong><br />
                                Pembagian standar Al-Quran
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <strong>604 Halaman</strong><br />
                                Total halaman dalam mushaf
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <strong>±20 Halaman/Juz</strong><br />
                                Rata-rata halaman per juz
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                {!auth?.user && (
                    <div className="mt-16 text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Siap Memulai Perjalanan Tahfidz Digital?
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Daftar sekarang dan rasakan kemudahan dalam mencatat progres hafalan Al-Quran
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/register">
                                <Button size="lg" className="w-full sm:w-auto">
                                    🚀 Daftar Sekarang
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                    🔑 Masuk ke Akun
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-gray-400">
                            © 2024 Sistem Tahfidz Digital. Dibuat dengan ❤️ untuk kemajuan pendidikan Islam.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}