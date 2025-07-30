import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { Provider } from "next-auth/providers"

// Check for required environment variables
const requiredEnvVars = {
  AUTH_SECRET: process.env.AUTH_SECRET,
  AUTH_VERIFAYDA_ISSUER: process.env.AUTH_VERIFAYDA_ISSUER,
  AUTH_VERIFAYDA_CLIENT_ID: process.env.AUTH_VERIFAYDA_CLIENT_ID,
}

// Validate environment variables
const missingEnvVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key)

if (missingEnvVars.length > 0) {
  console.warn(`Missing required environment variables: ${missingEnvVars.join(', ')}`)
  console.warn('Please set these variables in your .env.local file')
}

const providers: Provider[] = []

// Add VeriFayda OIDC provider if environment variables are set
if (process.env.AUTH_VERIFAYDA_ISSUER && process.env.AUTH_VERIFAYDA_CLIENT_ID) {
  providers.push({
    id: "verifayda",
    name: "VeriFayda",
    type: "oauth" as const,
    clientId: process.env.AUTH_VERIFAYDA_CLIENT_ID,
    authorization: {
      url: "https://esignet.ida.fayda.et/authorize",
      params: {
        scope: "openid profile email",
        response_type: "code",
        redirect_uri: "http://localhost:3000/callback"
      }
    },
    token: "https://esignet.ida.fayda.et/v1/esignet/oauth/v2/token",
    userinfo: "https://esignet.ida.fayda.et/v1/esignet/oidc/userinfo",
    profile(profile) {
      return {
        id: profile.sub || profile.id,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      }
    },
  })
}

// Add development credentials provider
providers.push(
  CredentialsProvider({
    name: "Development",
    credentials: {
      username: { label: "Username", type: "text" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
      // For development only - allow any username/password
      if (process.env.NODE_ENV === 'development') {
        return {
          id: "dev-user",
          name: credentials?.username as string || "Development User",
          email: "dev@example.com",
        }
      }
      return null
    }
  })
)

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
})

export const { GET, POST } = handlers