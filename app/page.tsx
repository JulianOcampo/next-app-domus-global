"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductForm from "@/components/ProductForm";
import ProductList from "@/components/ProductList";
import Notification from "@/components/Notification";
import { NotificationProvider, useNotification } from "@/contexts/NotificationContext";

const queryClient = new QueryClient();

function AppContent() {
  const { notification, hideNotification } = useNotification();

  return (
    <>
      <main className="min-h-screen bg-[var(--background)] p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-[var(--heading)] text-center mb-8">
            Gestión de Productos
          </h1>
          <ProductForm />
          <ProductList />
        </div>
      </main>
      
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
    </>
  );
}

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </QueryClientProvider>
  );
}
