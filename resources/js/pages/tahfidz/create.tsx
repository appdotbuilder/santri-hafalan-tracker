import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';

interface User {
    id: number;
    name: string;
    email: string;
    role: {
        name: string;
        display_name: string;
    };
}

interface Santri {
    id: number;
    name: string;
    email: string;
}

interface Props {
    santriList: Santri[];
    user?: User;
    [key: string]: unknown;
}

interface TahfidzFormData {
    santri_id: string;
    juz: string;
    page: string;
    type: string;
    score: string;
    notes: string;
    recorded_date: string;
    details: {
        fluency?: string;
        makhraj?: string;
        nun_mim_rules?: string;
        mad_rules?: string;
        obstacles?: string;
    };
    [key: string]: string | { [key: string]: string | undefined };
}

export default function CreateTahfidz({ santriList }: Props) {
    const [selectedType, setSelectedType] = useState<string>('tahfidz');
    
    const { data, setData, post, processing, errors } = useForm<TahfidzFormData>({
        santri_id: '',
        juz: '',
        page: '',
        type: 'tahfidz',
        score: '',
        notes: '',
        recorded_date: new Date().toISOString().split('T')[0],
        details: {}
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('tahfidz.store'));
    };

    const handleTypeChange = (type: string) => {
        setSelectedType(type);
        setData('type', type);
    };

    return (
        <AppShell>
            <Head title="Input Data Tahfidz" />
            
            <div className="p-6 max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg">
                    {/* Header */}
                    <div className="p-6 border-b bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
                        <h1 className="text-2xl font-bold">📝 Input Data Tahfidz Baru</h1>
                        <p className="text-green-100 mt-2">
                            Catat perkembangan hafalan santri dengan detail
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Basic Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Santri Selection */}
                            <div>
                                <label htmlFor="santri_id" className="block text-sm font-medium text-gray-700 mb-2">
                                    👨‍🎓 Pilih Santri <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="santri_id"
                                    value={data.santri_id}
                                    onChange={(e) => setData('santri_id', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    required
                                >
                                    <option value="">Pilih Santri...</option>
                                    {santriList.map((santri) => (
                                        <option key={santri.id} value={santri.id}>
                                            {santri.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.santri_id} className="mt-2" />
                            </div>

                            {/* Date */}
                            <div>
                                <label htmlFor="recorded_date" className="block text-sm font-medium text-gray-700 mb-2">
                                    📅 Tanggal Kegiatan <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    id="recorded_date"
                                    value={data.recorded_date}
                                    onChange={(e) => setData('recorded_date', e.target.value)}
                                    max={new Date().toISOString().split('T')[0]}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                                <InputError message={errors.recorded_date} className="mt-2" />
                            </div>
                        </div>

                        {/* Activity Type Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                📖 Jenis Kegiatan TTQ <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { value: 'tahfidz', label: 'Tahfidz', desc: 'Hafalan Al-Quran', icon: '🧠' },
                                    { value: 'tahsin', label: 'Tahsin', desc: 'Perbaikan Bacaan', icon: '📚' },
                                    { value: 'tasmi', label: 'Tasmi\'', desc: 'Ujian Hafalan', icon: '🎯' }
                                ].map((type) => (
                                    <div
                                        key={type.value}
                                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                                            selectedType === type.value
                                                ? 'border-green-500 bg-green-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                        onClick={() => handleTypeChange(type.value)}
                                    >
                                        <div className="text-center">
                                            <span className="text-2xl block mb-2">{type.icon}</span>
                                            <h3 className="font-semibold text-gray-900">{type.label}</h3>
                                            <p className="text-sm text-gray-600">{type.desc}</p>
                                        </div>
                                        <input
                                            type="radio"
                                            name="type"
                                            value={type.value}
                                            checked={selectedType === type.value}
                                            onChange={() => handleTypeChange(type.value)}
                                            className="sr-only"
                                        />
                                    </div>
                                ))}
                            </div>
                            <InputError message={errors.type} className="mt-2" />
                        </div>

                        {/* Juz and Page */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="juz" className="block text-sm font-medium text-gray-700 mb-2">
                                    📊 Juz <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="juz"
                                    value={data.juz}
                                    onChange={(e) => setData('juz', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    required
                                >
                                    <option value="">Pilih Juz...</option>
                                    {Array.from({ length: 30 }, (_, i) => i + 1).map((juz) => (
                                        <option key={juz} value={juz}>
                                            Juz {juz}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.juz} className="mt-2" />
                            </div>

                            <div>
                                <label htmlFor="page" className="block text-sm font-medium text-gray-700 mb-2">
                                    📄 Halaman <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="page"
                                    value={data.page}
                                    onChange={(e) => setData('page', e.target.value)}
                                    min="1"
                                    max="604"
                                    placeholder="1-604"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                                <InputError message={errors.page} className="mt-2" />
                            </div>
                        </div>

                        {/* Score */}
                        <div>
                            <label htmlFor="score" className="block text-sm font-medium text-gray-700 mb-2">
                                ⭐ Nilai (0-100)
                            </label>
                            <input
                                type="number"
                                id="score"
                                value={data.score}
                                onChange={(e) => setData('score', e.target.value)}
                                min="0"
                                max="100"
                                placeholder="Masukkan nilai..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                            <InputError message={errors.score} className="mt-2" />
                        </div>

                        {/* Detailed Assessment for Tahsin */}
                        {selectedType === 'tahsin' && (
                            <div className="bg-blue-50 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    📊 Penilaian Detail Tahsin
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            🗣️ Kelancaran Bacaan (1-5)
                                        </label>
                                        <select
                                            value={data.details.fluency || ''}
                                            onChange={(e) => setData('details', { ...data.details, fluency: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Pilih nilai...</option>
                                            {[1, 2, 3, 4, 5].map(num => (
                                                <option key={num} value={num}>{num}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            🔤 Makhrajul Huruf (1-5)
                                        </label>
                                        <select
                                            value={data.details.makhraj || ''}
                                            onChange={(e) => setData('details', { ...data.details, makhraj: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Pilih nilai...</option>
                                            {[1, 2, 3, 4, 5].map(num => (
                                                <option key={num} value={num}>{num}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            📏 Hukum Nun Mati/Mim Mati (1-5)
                                        </label>
                                        <select
                                            value={data.details.nun_mim_rules || ''}
                                            onChange={(e) => setData('details', { ...data.details, nun_mim_rules: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Pilih nilai...</option>
                                            {[1, 2, 3, 4, 5].map(num => (
                                                <option key={num} value={num}>{num}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            🔄 Hukum Mad (1-5)
                                        </label>
                                        <select
                                            value={data.details.mad_rules || ''}
                                            onChange={(e) => setData('details', { ...data.details, mad_rules: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Pilih nilai...</option>
                                            {[1, 2, 3, 4, 5].map(num => (
                                                <option key={num} value={num}>{num}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Notes */}
                        <div>
                            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                                📝 Catatan & Kendala
                            </label>
                            <textarea
                                id="notes"
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                rows={4}
                                placeholder={
                                    selectedType === 'tahfidz' 
                                        ? 'Catatan kendala hafalan, kemajuan, atau hal lain yang perlu diperhatikan...'
                                        : selectedType === 'tahsin'
                                        ? 'Catatan tentang kualitas bacaan, area yang perlu diperbaiki...'
                                        : 'Catatan hasil ujian tasmi\', kesiapan santri...'
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                            />
                            <InputError message={errors.notes} className="mt-2" />
                        </div>

                        {selectedType === 'tahfidz' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    🚧 Kendala Hafalan
                                </label>
                                <textarea
                                    value={data.details.obstacles || ''}
                                    onChange={(e) => setData('details', { ...data.details, obstacles: e.target.value })}
                                    rows={3}
                                    placeholder="Jelaskan kendala atau kesulitan yang dialami santri dalam menghafal..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                                />
                            </div>
                        )}

                        {/* Submit Buttons */}
                        <div className="flex justify-end space-x-4 pt-6 border-t">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => window.history.back()}
                            >
                                ❌ Batal
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="min-w-32"
                            >
                                {processing ? (
                                    <span className="flex items-center">
                                        <span className="animate-spin mr-2">⏳</span>
                                        Menyimpan...
                                    </span>
                                ) : (
                                    <>💾 Simpan Data</>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppShell>
    );
}