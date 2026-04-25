interface ImportMetaEnv {
    VITE_GOOGLE_API_KEY: any
    readonly VITE_GOOGLE_CLIENT_ID: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}