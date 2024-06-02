import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface Session {
        access_token: string;        
        user: {
            name: string;
            email: string;
            username: string;
            role: string;
            is_verified: boolean;
        };

    }
    interface User {
        name: string;
        email: string;
        username: string;
        role: string;
        is_verified: boolean;
    }
    interface JWT {
        access_token: string;        
        user: {
            name: string;
            email: string;
            username: string;
            role: string;
            is_verified: boolean;
        };
    }
    interface SignInResponse {
        error: string | null;
        status: number;
        ok: boolean;
        url: string | null;
        user: User;
    }

}