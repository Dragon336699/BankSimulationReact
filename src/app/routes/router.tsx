import { createBrowserRouter } from "react-router-dom";
import HomePage from "../../pages/Home/HomePage";
import AccountPage from "../../features/account/pages/AccountPage";
import Layout from "../../components/Layout/Layout";
import AccountDetailPage from "../../features/account/pages/AccountDetailPage";
import TransactionPage from "../../features/transaction/pages/TransactionPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        index: true,
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
      }
    ],
  },
]);
