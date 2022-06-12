export interface iPlan {
    id: number;
    name: string;
    credits: number;
    description: string;
}

export interface iReason {
    id: number;
    name: string;
    subr: iSubReason[]
}

export interface iSubReason {
    id: number;
    name: string;
}

export interface iPack {
    id: number;
    name: string;
    credits: number;
    description: string;
    icon: string;
}

export interface iUser {
    alias: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
    birthday: Date;
    birthday_hour: Date;
    token?: string;
    password?: string;
}

export interface iResponse {
    error?: boolean;
    message?: string;
}