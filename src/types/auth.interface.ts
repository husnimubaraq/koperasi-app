export interface TLoginForm {
    username: string
    password: string
}

export interface TRegisterForm {
    name: string
    password: string
    email: string
    alamat: string
    jenis_kelamin: string
    tanggal_lahir: string
    nomor_hp: string
}

export interface TUpdateForm {
    name: string
    alamat: string
    jenis_kelamin: string
    tanggal_lahir: string
    no_hp: string
}

export interface TAuth {
    id: number
    name: string
    role: string
    token_type: string
    access_token: string
}
  