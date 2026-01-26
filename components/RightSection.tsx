"use client";
import { BsSearch } from "react-icons/bs";
import NavigateWrapper from "./client-components/navigate";
import TrendingWindow from "./client-components/trending-window";
import { TrendingTweetView } from "./types/trendingtweets";

export default function RightSection({
  leaderboard,
  trendingTweets,
  topUsersComponent,
}: {
  leaderboard?: boolean;
  trendingTweets?: TrendingTweetView[] | null;
  topUsersComponent?: React.ReactNode;
}) {
  return (
    <section className="w-[30%] hidden xl:flex flex-col space-y-4 items-stretch h-screen ml-6 sticky top-0 overflow-scroll">
      <div className="sticky top-0">
        <div className="pt-2">
          <div className="relative w-full h-full group">
            <input
              id="searchBox"
              type="text"
              placeholder="Search OvrUndr"
              className="outline-none peer focus:border-primary focus:border w-full h-full rounded-xl py-4 pl-14
               border-gray-600 border-[0.5px] bg-transparent"
            />
            <label
              htmlFor="searchBox"
              className="absolute top-0 left-0 flex items-center justify-center p-4 text-gray-500
                    peer-focus:text-primary"
            >
              <BsSearch className="w-5 h-5" />
            </label>
          </div>
        </div>
      </div>
      <div>
        {leaderboard ? (
          <TrendingWindow trendingTweets={trendingTweets} />
        ) : (
          <NavigateWrapper to={"/leaderboard/CHANGETHISTOLEADERBOARDID"}>
            <div className="flex flex-col rounded-xl border-gray-600 border-[0.5px] p-4">
              <h3 className="text-center font-bold text-xl mb-3">
                🏆 Best Pickers
              </h3>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🥇</span>
                    <div className="w-10 h-10 bg-slate-400 rounded-full" />
                    <p className="font-semibold">c44rson</p>
                  </div>
                  <span className="text-sm text-gray-400">1,250 pts</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🥈</span>
                    <div className="w-10 h-10 bg-slate-400 rounded-full" />
                    <p className="font-semibold">c44rson</p>
                  </div>
                  <span className="text-sm text-gray-400">1,120 pts</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🥉</span>
                    <div className="w-10 h-10 bg-slate-400 rounded-full" />
                    <p className="font-semibold">c44rson</p>
                  </div>
                  <span className="text-sm text-gray-400">985 pts</span>
                </div>

                <button className="w-28 h-10 rounded-full font-semibold border-gray-600 border-[0.5px] hover:bg-gray-800 transition-colors mt-2 mx-auto">
                  View All
                </button>
              </div>
            </div>
          </NavigateWrapper>
        )}
      </div>
      {topUsersComponent || (
        <div className="rounded-xl border-gray-600 border-[0.5px]">
          <h3 className="text-left font-bold text-xl pt-4 pb-2 px-4">
            You might know
          </h3>
          <div className="p-4 text-center text-gray-500">
            Sign in to see suggestions
          </div>
        </div>
      )}
    </section>
  );
}
