// "use client";
// import { createClient } from "@/lib/supabase/client";
// import { Database } from "@/types/database.types";
// import { User } from "@supabase/supabase-js";
// import {
//   createContext,
//   ReactNode,
//   useContext,
//   useEffect,
//   useCallback,
//   useState,
// } from "react";

// type Profile = Database["public"]["Tables"]["users"]["Row"];

// type AuthContextType = {
//   user: User | null;
//   profile: Profile | null;
//   isLoading: boolean;
//   refreshProfile: () => Promise<void>;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// const supabase = createClient();

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [profile, setProfile] = useState<Profile | null>(null);

//   const fetchProfile = useCallback(
//     async (sessionUser: User | null) => {
//       if (!sessionUser) {
//         setProfile(null);
//         return;
//       }
//       try {
//         const { data, error } = await supabase
//           .from("users")
//           .select("*")
//           .eq("id", sessionUser.id);

//         if (error) throw error;

//         const userProfile = data?.[0] || null;
//         setProfile(userProfile);
//       } catch (error) {
//         console.error("Auth Provider: fetchProfile内で予期せぬエラー:", error);
//         setProfile(null);
//       }
//     },
//     []
//   );

//   useEffect(() => {
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange(async (_event, session) => {
//       const sessionUser = session?.user ?? null;
//       setUser(sessionUser);
//       await fetchProfile(sessionUser);
//       setIsLoading(false);
//     });

//     return () => {
//       subscription.unsubscribe();
//     };
//   }, [fetchProfile]);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         profile,
//         isLoading,
//         refreshProfile: () => fetchProfile(user),
//       }}
//     >
//       {isLoading ? null : children}
//       {/* {children} */}
//     </AuthContext.Provider>
//   );
// };

// export const useAuthContext = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) {
//     throw new Error("useAuthContext must be used within AuthProvider");
//   }
//   return ctx;
// };
