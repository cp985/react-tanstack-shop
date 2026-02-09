import { createBrowserRouter, RouterProvider, HashRouter, createHashRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NewsLetterContact from "./pages/NewsletterContact";
import AccountUser from "./pages/AccountUser";
import ErrorPage from "./components/general/ErrorPage";
import WrapperLayoutMainNav from "./components/general/WrapperLayoutMainNav";
import MainPageShop from "./pages/MainPageShop";

const router = createHashRouter(
  [
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
      children: [
        {
       
          element: <WrapperLayoutMainNav />,
          children: [
            {
              index: true,
              element: <MainPageShop />,
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
              path: "accountUser",
              element: <AccountUser />,
            },
          ],
        },
      ],
    }
  ]
  // {
  //   basename: "/react-tanstack-shop/",
  // },
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
