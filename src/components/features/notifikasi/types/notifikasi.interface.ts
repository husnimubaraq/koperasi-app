export interface TNotifikasi {
    id: number
    user_id: string
    judul: string
    reference_id: string
    deskripsi: string
    tanggal_expired: string
    created_at: string
    updated_at: string
    status: string
}

export interface TNotifikasiCount {
    count_notif: number
}