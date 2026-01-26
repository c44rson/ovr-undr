import LeftSidebar from "@/components/LeftSidebar";
import RightSection from "@/components/RightSection";
import TopUsers from "@/components/server-components/top-users";
import BackButton from "@/components/ui/back-button";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type SidebarLeague = {
  id: string;
  name: string;
};

export default async function LeaderboardPage() {
  const supabase = await createClient();

  const { data: authClaims, error: claimsError } =
    await supabase.auth.getClaims();
  if (claimsError || !authClaims?.claims) redirect("/auth/login");

  const userId = authClaims.claims.sub;

  const { data: authProfileData, error: authProfileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (authProfileError || !authProfileData) {
    console.error("Error fetching profile:", authProfileError);
    return;
  }

  const avatar_link = authProfileData.pfp_link ?? null;
  const username = authProfileData.username ?? null;

  const { data: authLeagues, error: authLeaguesErrors } = await supabase
    .from("league_members")
    .select("league_id")
    .eq("player_id", authProfileData.id ?? "");

  if (authLeaguesErrors) {
    console.error("Error fetching auth leagues:", authLeaguesErrors);
  }

  let leaguesForSidebar: SidebarLeague[] = [];

  if (authLeagues && authLeagues.length !== 0) {
    const leagueIds = authLeagues
      .map((m) => m.league_id)
      .filter((id): id is string => typeof id === "string");

    if (leagueIds.length > 0) {
      const { data: leaguesData, error: leaguesError } = await supabase
        .from("leagues")
        .select("id,name")
        .in("id", leagueIds);

      if (leaguesError) {
        console.error("Error fetching leagues:", leaguesError);
      } else {
        leaguesForSidebar =
          leaguesData?.map((l) => ({ id: l.id, name: l.name })) ?? [];
      }
    }
  }

  return (
    <div className="w-full h-full flex justify-center text-white items-center relative bg-blueprint">
      <div className="max-w-[80vw] w-full h-full flex relative justify-center">
        <LeftSidebar
          avatar_link={avatar_link}
          username={username}
          leagues={leaguesForSidebar}
        />

        <main className="sticky top-0 flex w-[90%] md:w-[55%] xl:w-[45%] h-full min-h-screen flex-col border-l border-r border-white/10 bg-[#0f1a2a]/40 backdrop-blur">
          {/* Header */}
          <div className="flex flex-row items-center mt-4 mb-4 ml-2">
            <BackButton />
            <h1 className="text-xl font-black">
              <span className="inline-flex items-center gap-2 rounded-md px-6">
                Global Leaderboard
              </span>
            </h1>
          </div>

          <div className="px-4 pb-10">
            <div
              className="
                group
                relative
                flex flex-col
                rounded-2xl
                border border-white/10
                bg-white/5
                overflow-hidden
                hover:border-[#27d866]
                hover:shadow-[0_0_25px_rgba(39,216,102,0.18)]
                transition
                duration-300
              "
            >
              <div className="flex flex-col gap-3 px-5 py-5">
                {/* Row helper */}
                {[
                  {
                    medal: "🥇",
                    name: "Alice",
                    leagues: "3 leagues",
                    pts: "540 pts",
                  },
                  {
                    medal: "🥈",
                    name: "Bob",
                    leagues: "2 leagues",
                    pts: "410 pts",
                  },
                  {
                    medal: "🥉",
                    name: "Charlie",
                    leagues: "4 leagues",
                    pts: "390 pts",
                  },
                ].map((u) => (
                  <div
                    key={u.name}
                    className="flex items-center justify-between rounded-xl px-3 py-3 hover:bg-white/5 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{u.medal}</span>
                      <div className="w-10 h-10 bg-white/10 rounded-full border border-white/10" />
                      <div>
                        <p className="font-semibold">{u.name}</p>
                        <p className="text-xs text-white/50">{u.leagues}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-[#27d866]">
                      {u.pts}
                    </span>
                  </div>
                ))}

                <div className="border-t border-white/10 pt-3 mt-1">
                  {[
                    {
                      rank: 4,
                      name: "David",
                      leagues: "1 league",
                      pts: "310 pts",
                    },
                    {
                      rank: 5,
                      name: "Eve",
                      leagues: "2 leagues",
                      pts: "280 pts",
                    },
                    {
                      rank: 6,
                      name: "Frank",
                      leagues: "1 league",
                      pts: "250 pts",
                    },
                  ].map((u) => (
                    <div
                      key={u.name}
                      className="flex items-center justify-between rounded-xl px-3 py-3 hover:bg-white/5 transition"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-white/40 w-6 text-center rounded-md border border-white/10 bg-white/5 py-1">
                          {u.rank}
                        </span>
                        <div className="w-10 h-10 bg-white/10 rounded-full border border-white/10" />
                        <div>
                          <p className="font-semibold">{u.name}</p>
                          <p className="text-xs text-white/50">{u.leagues}</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-[#27d866]">
                        {u.pts}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>

        <RightSection
          topUsersComponent={
            <Suspense
              fallback={
                <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                  <h3 className="text-left font-black text-xl pt-4 pb-2 px-4">
                    You might know
                  </h3>
                  <div className="p-4 text-center text-white/50">
                    Loading...
                  </div>
                </div>
              }
            >
              <TopUsers currentUserId={userId ?? ""} />
            </Suspense>
          }
        />
      </div>
    </div>
  );
}
