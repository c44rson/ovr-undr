"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("relative", className)} {...props}>
      {/* glow halo */}
      <div className="absolute inset-0 rounded-xl blur-xl bg-[#27d866]/20" />

      {success ? (
        <Card className="relative bg-black border border-white/10 text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-black">
              Check Your Email
            </CardTitle>
            <CardDescription className="text-white/60">
              Password reset instructions sent
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-white/70 leading-relaxed">
              If you registered using your email and password, you will receive
              a password reset email shortly.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="relative bg-black border border-white/10 text-white">
          <CardHeader>
            <CardTitle className="text-2xl">Reset Your Password</CardTitle>
            <CardDescription className="text-white/60">
              Enter your email and we&apos;ll send you a reset link
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleForgotPassword}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-black border-white/10 focus:border-[#27d866] focus:ring-[#27d866]"
                  />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#27d866] text-[#0b1220] font-bold hover:brightness-95 transition"
                >
                  {isLoading ? "Sending..." : "Send reset email"}
                </Button>
              </div>

              <div className="mt-4 text-center text-sm text-white/60">
                Remembered your password?{" "}
                <Link
                  href="/auth/login"
                  className="text-[#27d866] hover:underline underline-offset-4"
                >
                  Login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
