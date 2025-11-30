import { create } from 'zustand';

interface NotificationState {
  // State
  notificationMsg: string | null;
  showNotification: boolean;

  // Actions
  setNotificationMsg: (msg: string | null) => void;
  setShowNotification: (show: boolean) => void;
  
  // 💡 Action รวมสำหรับเรียกใช้
  notify: (msg: string) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notificationMsg: null,
  showNotification: false,

  setNotificationMsg: (msg) => set({ notificationMsg: msg }),
  setShowNotification: (show) => set({ showNotification: show }),
  
  notify: (msg) => {
    // ใช้ get() เพื่อเข้าถึง State ปัจจุบันก่อน
    const { setNotificationMsg, setShowNotification } = get();

    setNotificationMsg(msg);
    setShowNotification(true);
    
    // ตั้งเวลาซ่อน Notification
    setTimeout(() => setShowNotification(false), 3000);
  },
}));