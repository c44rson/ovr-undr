"use client";

import { useState } from "react";
import EditProfileModal from "../ui/edit-profile-modal";

export default function EditProfileTrigger({
  submitProfileChanges,
}: {
  submitProfileChanges: (formData: FormData) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-40 h-10 rounded-full border border-white text-white
      hover:bg-white hover:text-black transition disabled:opacity-50"
      >
        Edit Profile
      </button>
      {open && (
        <EditProfileModal
          onClose={() => setOpen(false)}
          submitProfileChanges={submitProfileChanges}
        />
      )}
    </>
  );
}
