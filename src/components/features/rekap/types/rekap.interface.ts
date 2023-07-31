import { TUser } from "~/components/features/auth/types/user.interface"

export interface TRekap {
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
    user: TUser
}