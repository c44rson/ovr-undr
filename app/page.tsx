import { AuthButton } from "@/components/server-components/auth-button";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AiOutlineStock } from "react-icons/ai";

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-6">
      <h2 className="uppercase font-black tracking-tight leading-none text-[clamp(2.25rem,4.5vw,4.25rem)]">
        {title}
      </h2>
      <div className="h-[3px] flex-1 bg-white/10" />
    </div>
  );
}

function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-20 w-20 border border-white/10 bg-[#0f1a2a]/40 grid place-items-center">
      <div className="h-14 w-14 border border-white/10 bg-[#0f1a2a]/60 grid place-items-center text-[#27d866]">
        {children}
      </div>
    </div>
  );
}

function TrophyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-8 w-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M8 4h8v3a4 4 0 0 1-8 0V4Z" />
      <path d="M6 7H4a2 2 0 0 0 2 2" />
      <path d="M18 7h2a2 2 0 0 1-2 2" />
      <path d="M12 11v4" />
      <path d="M9 19h6" />
      <path d="M10 15h4" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-8 w-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c3 3 3 15 0 18" />
      <path d="M12 3c-3 3-3 15 0 18" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-8 w-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M16 11a4 4 0 1 0-8 0" />
      <path d="M3 21a7 7 0 0 1 18 0" />
      <path d="M20 8a3 3 0 1 1-6 0" />
    </svg>
  );
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-2 text-[#f5a000]">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="h-7 w-7"
          fill="currentColor"
        >
          <path d="M12 17.3l-6.18 3.73 1.64-7.03L2 9.24l7.19-.61L12 2l2.81 6.63 7.19.61-5.46 4.76 1.64 7.03L12 17.3z" />
        </svg>
      ))}
    </div>
  );
}

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  if (user) {
    redirect("/protected");
  }

  return (
    <main className="min-h-screen text-white bg-blueprint flex flex-col">
      {/* NAV */}
      <nav className="w-full border-b border-white/10 bg-[#0f1a2a]/85 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AiOutlineStock className="h-6 w-6 rounded-sm text-[#27d866]" />
            <div className="text-xl font-black tracking-tight">OVR/UNDR</div>
          </div>

          <div className="[&_*]:!text-sm">
            <AuthButton />
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="px-6 pt-16 pb-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="mx-auto max-w-6xl uppercase font-black leading-[0.82] tracking-[-0.04em]">
            <span className="block text-[clamp(3rem,7vw,6.5rem)]">
              Bet Against Your Friends,
            </span>
            <span className="block text-[clamp(3rem,7vw,6.5rem)] text-[#27d866]">
              Bragging Rights
            </span>
            <span className="block text-[clamp(3rem,7vw,6.5rem)]">
              Included.
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg md:text-xl text-white/70 leading-relaxed">
            Create custom lines on anything from sports to politics. No house
            edge, just pure competition.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/auth/sign-up"
              className="inline-flex items-center justify-center gap-3 rounded-md bg-[#27d866] px-8 py-4 font-bold text-[#0b1220] hover:brightness-95 transition min-w-[180px]"
            >
              Start Betting <span aria-hidden>→</span>
            </Link>

            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center rounded-md border border-[#27d866] px-8 py-4 font-bold text-[#27d866] hover:bg-[#27d866]/10 transition min-w-[180px]"
            >
              Learn More
            </Link>
          </div>

          {/* (optional) keep your original 3 small cards OR remove them.
              Leaving them out makes it closer to your blue reference since
              “WHY OVRUNDR?” becomes the main feature section below. */}
        </div>
      </section>

      {/* WHY OVRUNDR */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="WHY OVRUNDR?" />
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {/* Card */}
            {[
              {
                title: "Create Leagues",
                desc: "Form your own betting league with friends. Share a simple invite code and compete together on a private leaderboard all season long.",
                icon: <TrophyIcon />,
              },
              {
                title: "Compete Nationally",
                desc: "Go beyond your league. Join the national rankings and prove you're the best bettor in the country. Track your picks against thousands of players.",
                icon: <GlobeIcon />,
              },
              {
                title: "Pick Stream",
                desc: "See what others are betting on, comment on their picks, and follow your favorite creators to never miss their winning plays.",
                icon: <UsersIcon />,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="
        group
        relative
        border border-white/10
        bg-white/5
        transition
        duration-300
        hover:border-[#27d866]
        hover:shadow-[0_0_25px_rgba(39,216,102,0.25)]
      "
              >
                <div className="p-10">
                  <IconBadge>{item.icon}</IconBadge>

                  <h3 className="mt-10 text-[clamp(2rem,3vw,2.75rem)] font-black tracking-tight transition-colors group-hover:text-[#27d866]">
                    {item.title}
                  </h3>

                  <p className="mt-6 text-lg leading-relaxed text-white/60">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 100% FREE / FUN CALLOUT */}
      <section className="bg-[#2fc6b8] text-white">
        <div className="px-6 py-20">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="uppercase font-black leading-[0.85] tracking-[-0.03em] text-[clamp(3rem,6.5vw,5.5rem)]">
              100% FREE. 100% FUN.
            </h2>

            <p className="mt-8 text-xl md:text-2xl leading-relaxed text-white/90">
              OvrUndr is a social platform built for friendly competition.
              <br />
              There is{" "}
              <span className="underline underline-offset-4 font-bold">
                no real money
              </span>{" "}
              involved. We play for points,
              <br />
              leaderboards, and pure bragging rights.
            </p>
          </div>
        </div>
      </section>

      {/* PLAYER REVIEWS */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="PLAYER REVIEWS" />

          <div className="mt-10 grid gap-10 md:grid-cols-3">
            <div className="border border-white/10 bg-white/5 shadow-[10px_10px_0_rgba(0,0,0,0.35)]">
              <div className="p-10">
                <Stars />
                <p className="mt-8 text-2xl italic leading-relaxed text-white/90">
                  &ldquo;Finally a way to track who actually knows their stuff
                  without losing my rent money. Love the league features!&rdquo;
                </p>
                <div className="mt-10 uppercase font-black text-white/60 text-xl">
                  - JESS TARNOL
                </div>
              </div>
            </div>

            <div className="border border-white/10 bg-white/5 shadow-[10px_10px_0_rgba(0,0,0,0.35)]">
              <div className="p-10">
                <Stars />
                <p className="mt-8 text-2xl italic leading-relaxed text-white/90">
                  &ldquo;The custom lines feature is a game changer. We bet on
                  everything from football to who shows up late to
                  dinner.&rdquo;
                </p>
                <div className="mt-10 uppercase font-black text-white/60 text-xl">
                  - JARED JULIEN
                </div>
              </div>
            </div>

            <div className="border border-white/10 bg-white/5 shadow-[10px_10px_0_rgba(0,0,0,0.35)]">
              <div className="p-10">
                <Stars />
                <p className="mt-8 text-2xl italic leading-relaxed text-white/90">
                  &ldquo;I&apos;ve tried a dozen apps for our office pool but
                  this is the only one that stuck. Clean, fast, and no
                  ads.&rdquo;
                </p>
                <div className="mt-10 uppercase font-black text-white/60 text-xl">
                  - JACKSON FOWLER
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 px-6">
        <div className="max-w-6xl mx-auto text-center text-white/50">
          <p>&copy; 2025 ovr/undr. Built for sports betting enthusiasts.</p>
        </div>
      </footer>
    </main>
  );
}
