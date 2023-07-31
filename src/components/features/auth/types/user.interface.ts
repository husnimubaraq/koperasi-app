export interface TUser{
    id: number
    name: string
    email: string
    email_verified_at: boolean | null
    role: string
    tgl_lahir: string | null
    alamat: string
    jenis_kelamin: string
    no_hp: string
    created_at: string
    updated_at: string
}