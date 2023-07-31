export interface TPembayaran {
    group: string
    code: string
    name: string
    type: string
    fee_merchant: {
        flat: number
        percent: number | string
    }
    fee_customer: {
        flat: number
        percent: number | string
    }
    total_fee: {
        flat: number
        percent: number | string
    }
    minimum_fee: any
    maximum_fee: any
    icon_url: string
    active: boolean
}

export interface TPembayaranForm {
    user_id: number
    no_tagihan: string
    nominal: number
    denda: number
    group: string
    code: string
    name: string
    jenis_tagihan: string
}

export interface TPembayaranResult {
    reference: string
    merchant_ref: string
    payment_selection_type: string
    payment_method: string
    payment_name: string
    customer_name: string
    customer_email: string
    customer_phone: any
    callback_url: string
    return_url: string
    amount: number
    fee_merchant: number
    fee_customer: number
    total_fee: number
    amount_received: number
    pay_code: string
    pay_url: any
    checkout_url: string
    status: string
    expired_time: number
    order_items: {
        sku: string
        name: string
        price: number
        quantity: number
        subtotal: number
        product_url: any
        image_url: any
    }[]
    instructions: {
        title: string
        steps: string[]
    }[]
}
