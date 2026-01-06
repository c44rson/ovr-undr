"use client";

import { useState } from "react";
import LeagueBannerModal from "./league-banner-modal";

export default function LeagueBannerTrigger({
  submitLeagueChanges,
}: {
  submitLeagueChanges: (formData: FormData) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-40 h-10 rounded-full border border-white text-white
      hover:bg-white hover:text-black transition disabled:opacity-50"
      >
        Edit Banner
      </button>

      {open && (
        <LeagueBannerModal
          onClose={() => setOpen(false)}
          submitLeagueChanges={submitLeagueChanges}
        />
      )}
    </>
  );
}
