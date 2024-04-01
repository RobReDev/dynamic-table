import { Navigate, createBrowserRouter } from "react-router-dom";

import { Products } from "./pages/Products";
import { Pages } from "./pages/Pages";
import { PricePlans } from "./pages/PricePlans";
import Navigation from "./components/Navigation";

const router = createBrowserRouter([
  {
    path: "/",
    element: null,
    errorElement: <div />,
    children: [
      { index: true, element: <Navigate to="/products" replace /> },
      {
        path: "/products",
        element: (
          <>
            <Navigation />
            <Products />
          </>
        ),
      },
      {
        path: "/pages",
        element: (
          <>
            <Navigation />
            <Pages />
          </>
        ),
      },
      {
        path: "/price-plans",
        element: (
          <>
            <Navigation />
            <PricePlans />
          </>
        ),
      },
    ],
  },
]);

export default router;
