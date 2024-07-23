// auth.config.ts
import Spotify from '@auth/core/providers/spotify'
import Twitch from '@auth/core/providers/twitch'
import { defineConfig } from 'auth-astro'

export default defineConfig({
    providers: [
        Spotify({
            clientId: import.meta.env.SPOTIFY_CLIENT_ID,
            clientSecret: import.meta.env.SPOTIFY_CLIENT_SECRET,
            redirectUri: 'http://localhost:4321/auth/spotify/callback',
			authorization: 'https://accounts.spotify.com/authorize?scope=user-read-email,user-top-read'
        }),
    ],
    secret: import.meta.env.AUTH_SECRET,
    callbacks: {
        jwt: async ({ token, account, user }) => {
            if (user) token.accessToken = account.access_token
            return token
        },
        session: ({ session, token }) => ({
            ...session,
            user: {
                ...session.user,
				id: token.accessToken,
                // accessToken: token.accessToken,
            },
        }),
    },
}
)