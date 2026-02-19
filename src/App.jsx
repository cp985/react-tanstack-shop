import {
  createBrowserRouter,
  RouterProvider,
  HashRouter,
  createHashRouter,
} from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./App.css";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NewsLetterContact from "./pages/NewsletterContact";
import AccountUser from "./pages/AccountUser";
import ErrorPage from "./components/general/ErrorPage";
import WrapperLayoutMainNav from "./components/general/WrapperLayoutMainNav";
import MainPageShop from "./pages/MainPageShop";
import OrdersHistory from "./pages/OrdersHistory";
import ProfileUser from "./pages/ProfileUser";
import FirstPage from "./pages/FirstPage";
import LogOut from "./pages/LogOut";
import ItemDetails from "./components/UI/ItemDetails";
import Sales from "./pages/Sales";

import Spinner from "./components/UI/Spinner";
import { authCheck } from "./util/auth";
import { httpLoader } from "./util/httpRequest";
const API_URL = import.meta.env.VITE_API_URL;

const queryClient = new QueryClient();
const router = createHashRouter(
  [
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
      hydrateFallbackElement: <Spinner />,
    },

    {
      path: "/app",
      element: <WrapperLayoutMainNav />,
      errorElement: <ErrorPage />,
      loader: async () => {
        await queryClient.ensureQueryData({
          queryKey: ["items"],
          queryFn: async () => {
            const res = await fetch(`${API_URL}/products`);
            return res.json();
          },
        });
          return authCheck();
      },

      children: [
        {
          path: "home",
          element: <FirstPage />,
        },
        {
          path: "shop",

          element: <MainPageShop />,
        },
        {
         path: "shop/item/:id", 
          element: <ItemDetails />,
        },
        {
          path: "sales",
          element: <Sales />,
        },

        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "newsLetterContact",
          element: <NewsLetterContact />,
        },
        {
          path: "accountUser/:user",
          element: <AccountUser />,
          children: [
            { index: true, element: <ProfileUser /> },
            {
              path: "profile",
              element: <ProfileUser />,
            },
            {
              path: "orders",
              element: <OrdersHistory />,
            },
            {
              path: "logout",
              element: <LogOut />,
            },
          ],
        },
      ],
    },
  ],
  //!usare solo con createBrowserRouter
  // {
  //   basename: "/react-tanstack-shop/",
  // }
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
