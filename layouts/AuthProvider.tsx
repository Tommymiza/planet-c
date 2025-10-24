"use client";
import { useSocket } from "@/stores/socket";
import { useUserStore } from "@/stores/user";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUserStore();
  const { sendMessage } = useSocket();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      sendMessage("game:join", user);
      router.push("/board");
    } else {
      router.push("/");
    }
  }, [user]);
  return <>{children}</>;
}
