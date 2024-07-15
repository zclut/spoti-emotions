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
		}),
	],
	secret: import.meta.env.AUTH_SECRET,
    callbacks: {
		session: ({ session, token }) => ({
			...session,
			user: {
				...session.user,
				id: token.sub,
			},
		}),
	},
	callbacks: {

	}
})