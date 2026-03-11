import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Listings } from "./pages/Listings";
import { ListingDetail } from "./pages/ListingDetail";
import { Root } from "./pages/Root";
import { Radar } from "./pages/Radar";
import { Auth } from "./pages/Auth";
import { Dashboard } from "./pages/Dashboard";
import { CGU } from "./pages/CGU";
import { ReglesClub } from "./pages/ReglesClub";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { Home: true, Component: Index },
      { path: "radar", Component: Radar },
      { path: "annonces", Component: Listings },
      { path: "annonces/:id", Component: ListingDetail },
      { path: "auth", Component: Auth },
      { path: "dashboard", Component: Dashboard },
      { path: "cgu", Component: CGU },
      { path: "regles", Component: ReglesClub },
    ],
  },
]);
