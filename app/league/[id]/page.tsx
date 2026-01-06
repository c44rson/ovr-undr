import LeagueTabs from "@/components/client-components/league-tabs";
import LeftSidebar from "@/components/LeftSidebar";
import RightSection from "@/components/RightSection";
import BackButton from "@/components/ui/back-button";
import { createClient } from "@/lib/supabase/server";
import InviteButton from "@/components/client-components/invite-button";
import { Suspense } from "react";
import TopUsers from "@/components/server-components/top-users";
import LeaveLeagueButton from "@/components/client-components/leave-league-button";
import Image from "next/image";
import { submitLeagueChanges } from "@/app/api/actions/submit-league-changes";
import LeagueBannerTrigger from "@/components/client-components/league-banner-trigger";

export default async function LeaguePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: trendingTweets, error: trendingTweetsError } = await supabase
    .from("tweets_with_like_count")
    .select("*")
    .limit(4);

  if (trendingTweetsError) {
    console.error("Error fetching trending tweets:", trendingTweetsError);
  }

  const { data: league, error: leagueError } = await supabase
    .from("leagues")
    .select("*")
    .eq("id", id)
    .single();

  if (leagueError || !league) {
    console.error("Error fetching league:", leagueError);
    return;
  }

  const { count: memberCount, error: memberCountError } = await supabase
    .from("league_members")
    .select("id", { count: "exact", head: true })
    .eq("league_id", league.id);

  if (memberCountError) {
    console.error("Error counting league members:", memberCountError);
  }

  const { data: viewerRes, error: viewerError } = await supabase.auth.getUser();
  if (viewerError) console.error("Error getting viewer:", viewerError);

  const viewer = viewerRes?.user ?? null;

  const { data: viewerProfile, error: viewerProfileError } = viewer?.id
    ? await supabase
        .from("profiles")
        .select("username,pfp_link")
        .eq("id", viewer.id)
        .single()
    : { data: null, error: null };

  if (viewerProfileError) {
    console.error("Error fetching viewer profile:", viewerProfileError);
  }

  const { data: managerProfile, error: managerError } = await supabase
    .from("profiles")
    .select("username,pfp_link")
    .eq("id", league.admin_id)
    .single();

  if (managerError) {
    console.error("Error fetching manager profile:", managerError);
  }

  const { data: playerOdds, error: playerOddsError } = await supabase
    .from("betting_odds")
    .select("*")
    .not("player_id", "is", null)
    .limit(5);

  if (playerOddsError) {
    console.error("Error fetching odds data", playerOddsError);
  }

  const betSlips =
    playerOdds?.map(
      ({
        home_team,
        away_team,
        player_name,
        market_key,
        price,
        point,
        player_id,
      }) => ({
        home_team,
        away_team,
        player_name,
        market_key,
        price,
        point,
        player_id,
      })
    ) ?? [];

  const { data: leaderboardMembers, error: leaderboardError } = await supabase
    .from("league_members")
    .select(`player_id, profiles:player_id (username)`)
    .eq("league_id", id);

  if (leaderboardError) {
    console.error("Error fetching leaderboard:", leaderboardError);
  }

  const formattedLeaderboardMembers =
    leaderboardMembers?.map((member) => ({
      player_id: member.player_id,
      profiles: Array.isArray(member.profiles)
        ? member.profiles[0]
        : member.profiles,
    })) ?? [];

  const avatar_link = viewerProfile?.pfp_link ?? null;
  const username = viewerProfile?.username ?? null;

  const isAdmin = viewer?.id === league.admin_id;

  const { data: adminProfile, error: adminProfileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", league.admin_id)
    .single();

  if (adminProfileError) {
    console.error("Error fetching admin user data:", adminProfileError);
  }

  const admin_avatar_link: string | null = adminProfile?.pfp_link ?? null;

  const submitForThisLeague = submitLeagueChanges.bind(null, league.id);

  return (
    <div className="w-full h-full flex justify-center text-white items-center relative bg-black">
      <div className="max-w-[80vw] w-full h-full flex relative justify-center">
        <LeftSidebar
          trendingTweets={trendingTweets}
          avatar_link={avatar_link}
          username={username}
          league={true}
        />

        <main className="sticky top-0 flex w-[90%] md:w-[55%] xl:w-[45%] h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600">
          <div className="flex flex-row items-center mt-4 mb-2 ml-2">
            <BackButton />
            <h1 className="text-xl font-bold px-6 backdrop-blur bg-black/10 sticky top-0">
              {league.name}
            </h1>
          </div>

          <div className="relative inline-block">
            <div className="relative w-full h-40 mt-3 bg-slate-400 overflow-hidden">
              {league.banner_link ? (
                <Image
                  src={league.banner_link}
                  alt="League banner"
                  height={1920}
                  width={1080}
                />
              ) : null}
            </div>

            {admin_avatar_link && (
              <Image
                className="absolute left-4 bottom-0 translate-y-1/2 w-32 h-32 rounded-full"
                src={admin_avatar_link}
                alt="league admin profile picture"
                height={1920}
                width={1080}
              />
            )}
            {!admin_avatar_link && (
              <div className="absolute left-4 bottom-0 translate-y-1/2 w-32 h-32 rounded-full bg-slate-50"></div>
            )}
          </div>
          <div className="flex flex-row items-center justify-between border-b-[0.5px] border-gray-600 pt-6 px-4">
            <div className="flex flex-col mt-12 w-full">
              <h1 className="text-2xl font-bold">{league.name}</h1>
              <h1 className="text-sm text-gray-400">
                League Manager: {managerProfile?.username ?? "Unknown"}
              </h1>
              <div className="flex flex-row items-center my-4 w-full">
                <LeaveLeagueButton leagueId={league.id} isAdmin={isAdmin} />
                <div className="ml-auto">
                  {isAdmin && (
                    <div className="">
                      <LeagueBannerTrigger
                        submitLeagueChanges={submitForThisLeague}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {isAdmin && league.max_players != null && (
            <InviteButton
              leagueId={league.id}
              memberCount={memberCount ?? 0}
              maxPlayers={league.max_players}
            />
          )}

          <LeagueTabs
            betSlips={betSlips}
            leaderboardMembers={formattedLeaderboardMembers}
          />
        </main>

        <RightSection
          topUsersComponent={
            <Suspense
              fallback={
                <div className="rounded-xl border-gray-600 border-[0.5px]">
                  <h3 className="text-left font-bold text-xl pt-4 pb-2 px-4">
                    You might know
                  </h3>
                  <div className="p-4 text-center text-gray-500">
                    Loading...
                  </div>
                </div>
              }
            >
              <TopUsers currentUserId={viewer?.id ?? ""} />
            </Suspense>
          }
        />
      </div>
    </div>
  );
}
