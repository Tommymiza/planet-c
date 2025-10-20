"use client";
import { useUserStore } from "@/stores/user";
import { useRouter } from "next/navigation";
import React from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUserStore();
  const router = useRouter();
  if (!user) {
    router.push("/");
  }
  return <>{children}</>;
}
