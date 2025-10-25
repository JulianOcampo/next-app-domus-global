"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface NotificationState {
  message: string;
  type: "success" | "error" | "info";
  isVisible: boolean;
}

interface NotificationContextType {
  notification: NotificationState;
  showNotification: (message: string, type: "success" | "error" | "info") => void;
  hideNotification: () => void;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<NotificationState>({
    message: "",
    type: "info",
    isVisible: false,
  });

  const showNotification = (message: string, type: "success" | "error" | "info" = "info") => {
    setNotification({
      message,
      type,
      isVisible: true,
    });
  };

  const hideNotification = () => {
    setNotification(prev => ({
      ...prev,
      isVisible: false,
    }));
  };

  const showSuccess = (message: string) => showNotification(message, "success");
  const showError = (message: string) => showNotification(message, "error");
  const showInfo = (message: string) => showNotification(message, "info");

  return (
    <NotificationContext.Provider
      value={{
        notification,
        showNotification,
        hideNotification,
        showSuccess,
        showError,
        showInfo,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
}
