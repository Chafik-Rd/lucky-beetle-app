"use client";

import { useUserStore } from "@/src/contexts/UserStore";
import { UserRoleType } from "@/src/types/auth.type";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";


export const ClerkStateSynchronizer = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const setAuthState = useUserStore((state) => state.setAuthState);

  useEffect(() => {
    if (isLoaded) {
      const userRole = (user?.publicMetadata?.role as UserRoleType) || "user";

      setAuthState(isSignedIn, isSignedIn ? userRole : "guest");
    }
  }, [isLoaded, isSignedIn, user, setAuthState]);

  return null;
};
