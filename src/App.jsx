import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NewsLetterContact from "./pages/NewsletterContact";
import AccountUser from "./pages/AccountUser";
import ErrorPage from "./components/general/ErrorPage";
import WrapperLayoutMainNav from "./components/general/WrapperLayoutMainNav";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <WrapperLayoutMainNav />,
          children: [
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
    },
  ],
  {
    basename: "/react-tanstack-shop/",
  },
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
