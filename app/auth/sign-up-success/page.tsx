import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <main className="min-h-svh w-full bg-blueprint flex items-center justify-center px-6 py-12">
      <div className="relative w-full max-w-md">
        {/* glow halo */}
        <div className="absolute inset-0 rounded-xl blur-xl bg-[#27d866]/20" />

        <Card className="relative bg-black border border-white/10 text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-black">
              Check Your Email
            </CardTitle>
            <CardDescription className="text-white/60 text-lg">
              Confirm your account to get started
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-center text-white/70 leading-relaxed">
              You&apos;ve successfully signed up. We sent you a confirmation
              email — please click the link inside to activate your account
              before signing in.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
