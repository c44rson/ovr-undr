import { LoginForm } from "@/components/client-components/login-form";

export default function Page() {
  return (
    <main className="min-h-svh w-full bg-blueprint flex items-center justify-center px-6 py-12">
      <div className="relative w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  );
}
