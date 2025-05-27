export type PostParams = {
    account_identifier?: string;
    account_provider?: number;
}

export type PostResponse = {
    status: boolean;
    message?: string;
    result?: unknown;
    error?: unknown;
}

export type CACHE_DATA = {
    data_value: string;
}