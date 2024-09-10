// app/api/auth/[...nextauth]/route.ts

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z, ZodError } from 'zod';
import { NextAuthOptions } from 'next-auth';

// Define the type for the credentials
interface Credentials {
  email?: string;
  password?: string;
}

// Define your user type (customize this based on your user model)
interface User {
  id: string;
  email: string;
  name?: string;
  // Add any other user properties here
}

// Example function for user authentication - replace with your actual implementation
const yourUserAuthenticationFunction = async (credentials: { email: string; password: string }): Promise<User | null> => {
  // Replace with your user authentication logic
  return null; // Placeholder
};

// Define the schema for login validation
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// NextAuth.js configuration
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials: Record<'email' | 'password', string> | undefined, req) => {
        try {
          if (credentials) {
            // Validate credentials with Zod
            const validatedCredentials = loginSchema.parse({
              email: credentials.email || '',
              password: credentials.password || '',
            });

            // Replace with your own user authentication logic
            const user = await yourUserAuthenticationFunction(validatedCredentials);

            if (user) {
              return user;
            } else {
              return null; // Return null if user is not found or credentials are invalid
            }
          } else {
            return null; // Return null if credentials are not provided
          }
        } catch (error) {
          if (error instanceof ZodError) {
            throw new Error('Validation error: ' + error.message);
          }
          throw new Error('Authorization error: ');
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin', // Custom sign-in page
  },
};

export default NextAuth(authOptions);
