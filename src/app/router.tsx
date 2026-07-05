import { Navigate, createBrowserRouter } from "react-router-dom";
import { AuthGuard, GuestGuard } from "@/features/auth/components/auth-guard";
import { LoginPage } from "@/features/auth/pages/login-page";
import { AppShell } from "@/features/shell/components/app-shell";
import { HomePage } from "@/features/shell/pages/home-page";
import { TransactionsListPage } from "@/features/transactions/pages/transactions-list-page";
import { TransactionDetailPage } from "@/features/transactions/pages/transaction-detail-page";

export const router = createBrowserRouter([
  {
    element: <GuestGuard />,
    children: [{ path: "/login", element: <LoginPage /> }],
  },
  {
    element: <AuthGuard />,
    children: [
      {
        element: <AppShell title="Início" />,
        children: [{ index: true, element: <HomePage /> }],
      },
      {
        element: <AppShell title="Transações" />,
        children: [
          { path: "transactions", element: <TransactionsListPage /> },
          { path: "transactions/:id", element: <TransactionDetailPage /> },
        ],
      },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);
