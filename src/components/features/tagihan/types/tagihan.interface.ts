export interface TTagihan {
    id: number
    user_id: string
    name: string
    no_tagihan: string
    nominal: string
    denda: string
    tgl_tagihan: string
    status: string
    is_status: string
    jenis_tagihan: string
    deleted_at: string
    created_at: string
    updated_at: string
}

export interface TTagihanForm {
    user_id: number
    pengajuan_id: number
    nominal: string
    tgl_tagihan: string
    nominal_denda: string
}
