import { createBrowserRouter, Navigate } from "react-router-dom";
import AccountPage from "../../pages/Account/AccountPage";
import Layout from "../../components/Layout/Layout";
import AccountDetailPage from "../../pages/Account/AccountDetailPage";
import TransactionPage from "../../pages/Transaction/TransactionPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/accounts" replace />,
      },
      {
        path: "accounts",
        element: <AccountPage />,
      },
      {
        path: "account/details/:accountNumber",
        element: <AccountDetailPage />,
      },
      {
        path: "transactions",
        element: <TransactionPage />,
      },
    ],
  },
]);
