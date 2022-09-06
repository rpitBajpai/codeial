
const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user : 'arpitbajpai432',
            pass: 'rlmanbesvgrhwkae'
        }
    },
    google_client_id: "813382933950-40vkojb8d2s7ej73hbe6peclm4db66bm.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial'


}

const production = {
    name: 'production'
}



module.exports = development;