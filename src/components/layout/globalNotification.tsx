"use client";

import { useNotificationStore } from "@/src/contexts/NotificationStore";
import { ShieldCheck } from "lucide-react";

export const GlobalNotification = () => {
  const showNotification = useNotificationStore(
    (state) => state.showNotification,
  );
  const notificationMsg = useNotificationStore(
    (state) => state.notificationMsg,
  );

  return (
    <div
      className={`border-primary text-primary fixed top-24 right-5 z-60 flex transform items-center space-x-3 rounded border-l-4 bg-white px-6 py-4 shadow-xl transition-all duration-300 ${
        showNotification
          ? "translate-x-0 opacity-100"
          : "pointer-events-none translate-x-10 opacity-0"
      }`}
    >
      <ShieldCheck size={20} />
      <span className="text-sm font-medium">{notificationMsg}</span>
    </div>
  );
};
