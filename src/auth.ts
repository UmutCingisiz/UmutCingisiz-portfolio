import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    GitHub({
      authorization: { params: { scope: "read:user user:email" } },
    }),
  ],
  callbacks: {
    jwt({ token, profile, account }) {
      const rawId =
        profile &&
        typeof profile === "object" &&
        "id" in profile &&
        typeof (profile as { id?: unknown }).id !== "undefined"
          ? (profile as { id: unknown }).id
          : undefined;
      const fromProfile =
        rawId !== undefined ? String(rawId as string | number) : undefined;
      const fromAccount =
        account?.providerAccountId ?? account?.provider_account_id;

      token.githubId = fromProfile ?? token.githubId ?? fromAccount;

      if (profile && typeof profile === "object" && "login" in profile) {
        const login = (profile as { login?: string }).login;
        if (typeof login === "string" && login.length > 0) {
          token.githubLogin = login;
        }
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.githubId =
          typeof token.githubId === "string" ? token.githubId : undefined;
        session.user.githubLogin =
          typeof token.githubLogin === "string"
            ? token.githubLogin
            : undefined;
      }
      return session;
    },
  },
});
