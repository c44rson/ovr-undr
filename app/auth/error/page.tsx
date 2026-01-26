import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="min-h-svh w-full bg-blueprint flex items-center justify-center px-6 py-12">
      <div className="relative w-full max-w-md">
        {/* glow halo */}
        <div className="absolute inset-0 rounded-xl blur-xl bg-[#27d866]/20" />

        <Card className="relative bg-black border border-white/10 text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-black">
              Sorry, something went wrong.
            </CardTitle>
          </CardHeader>

          <CardContent>
            {params?.error ? (
              <p className="text-center text-white/70 leading-relaxed">
                Error code:{" "}
                <span className="text-[#27d866]">{params.error}</span>
              </p>
            ) : (
              <p className="text-center text-white/70 leading-relaxed">
                An unspecified error occurred.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
