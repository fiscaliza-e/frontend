"use client";

import FormProfile from "@/app/profile/components/form-profile";
import { AuthGuard } from "@/components/auth-guard";

export default function ProfilePage() {
  return (
    <AuthGuard>
      <FormProfile />
    </AuthGuard>
  );
}
