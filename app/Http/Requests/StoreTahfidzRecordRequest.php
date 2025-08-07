<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTahfidzRecordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->isUstadz() || $this->user()->isAdmin();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'santri_id' => 'required|exists:users,id',
            'juz' => 'required|integer|min:1|max:30',
            'page' => 'required|integer|min:1|max:604',
            'type' => 'required|in:tahfidz,tahsin,tasmi',
            'score' => 'nullable|integer|min:0|max:100',
            'notes' => 'nullable|string|max:1000',
            'recorded_date' => 'required|date|before_or_equal:today',
            'details' => 'nullable|array',
            'details.fluency' => 'nullable|integer|min:1|max:5',
            'details.makhraj' => 'nullable|integer|min:1|max:5',
            'details.nun_mim_rules' => 'nullable|integer|min:1|max:5',
            'details.mad_rules' => 'nullable|integer|min:1|max:5',
            'details.obstacles' => 'nullable|string|max:500',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'santri_id.required' => 'Santri harus dipilih.',
            'santri_id.exists' => 'Santri yang dipilih tidak valid.',
            'juz.required' => 'Juz harus diisi.',
            'juz.integer' => 'Juz harus berupa angka.',
            'juz.min' => 'Juz minimal 1.',
            'juz.max' => 'Juz maksimal 30.',
            'page.required' => 'Halaman harus diisi.',
            'page.integer' => 'Halaman harus berupa angka.',
            'page.min' => 'Halaman minimal 1.',
            'page.max' => 'Halaman maksimal 604.',
            'type.required' => 'Jenis kegiatan harus dipilih.',
            'type.in' => 'Jenis kegiatan tidak valid.',
            'score.integer' => 'Nilai harus berupa angka.',
            'score.min' => 'Nilai minimal 0.',
            'score.max' => 'Nilai maksimal 100.',
            'recorded_date.required' => 'Tanggal kegiatan harus diisi.',
            'recorded_date.date' => 'Format tanggal tidak valid.',
            'recorded_date.before_or_equal' => 'Tanggal tidak boleh lebih dari hari ini.',
        ];
    }
}