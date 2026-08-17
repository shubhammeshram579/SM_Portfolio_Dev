// "use client";
// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { Loader2, Lock } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// export default function LoginPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({ email: "", password: "" });

//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   setLoading(true);
//   //   const res = await signIn("credentials", {
//   //     ...form,
//   //     redirect: false,
//   //   });
//   //   setLoading(false);
//   //   if (res?.ok) {
//   //     router.push("/admin/dashboard");
//   //   } else {
//   //     toast.error("Invalid credentials");
//   //   }
//   // };



//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (loading) return;
//     setLoading(true);

//     try {
//       const res = await signIn("credentials", {
//         email: form.email.trim(),
//         password: form.password.trim(),
//         redirect: false,
//       });

//       if (res?.ok && !res?.error) {
//         toast.success("Login successful");
//         router.push("/admin/dashboard");
//         router.refresh(); // Syncs NextAuth session state across App Router layout
//       } else {
//         toast.error(res?.error === "CredentialsSignin" ? "Invalid email or password" : "Authentication failed");
//       }
//     } catch (err) {
//       console.error("Login request error:", err);
//       toast.error("Server connection error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background noise-bg">
//       <div className="absolute inset-0 dot-grid opacity-30" />
//       <div className="relative w-full max-w-md">
//         <div className="glass rounded-2xl p-8 border border-border">
//           <div className="text-center mb-8">
//             <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
//               <Lock size={20} className="text-primary" />
//             </div>
//             <h1 className="text-2xl font-display font-bold">Admin Login</h1>
//             <p className="text-sm text-muted-foreground font-body mt-1">
//               Sign in to manage your portfolio
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="admin@example.com"
//                 value={form.email}
//                 onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="••••••••"
//                 value={form.password}
//                 onChange={(e) => setForm({ ...form, password: e.target.value })}
//                 required
//               />
//             </div>
//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? <><Loader2 size={16} className="animate-spin mr-2" /> Signing in...</> : "Sign In"}
//             </Button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/dashboard";

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email: form.email.trim(),
        password: form.password.trim(),
        redirect: false,
      });

      if (res?.ok && !res?.error) {
        toast.success("Login successful");
        router.push(callbackUrl);
        router.refresh();
      } else {
        toast.error("Invalid email or password");
      }
    } catch (err) {
      console.error("Login request error:", err);
      toast.error("Server connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Prevents hydration mismatch by delaying dynamic render until mounted on client
  if (!mounted) {
    return (
      <div className="glass rounded-2xl p-8 border border-border flex flex-col items-center justify-center min-h-[350px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-8 border border-border">
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Lock size={20} className="text-primary" />
        </div>
        <h1 className="text-2xl font-display font-bold">Admin Login</h1>
        <p className="text-sm text-muted-foreground font-body mt-1">
          Sign in to manage your portfolio
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="admin@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            disabled={loading}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            disabled={loading}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin mr-2" /> Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background noise-bg">
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="relative w-full max-w-md">
        <Suspense
          fallback={
            <div className="glass rounded-2xl p-8 border border-border flex flex-col items-center justify-center min-h-[350px]">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
