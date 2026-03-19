import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Admin from "./pages/Admin";
import BrandingGuide from "./pages/BrandingGuide";
import ClubDetail from "./pages/ClubDetail";
import ClubSetup from "./pages/ClubSetup";
import ClubSetupInfo from "./pages/ClubSetupInfo";
import Clubs from "./pages/Clubs";
import DeliveryInfo from "./pages/DeliveryInfo";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import ReturnsPolicy from "./pages/ReturnsPolicy";
import SizeGuide from "./pages/SizeGuide";
import StockShop from "./pages/StockShop";

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}

const rootRoute = createRootRoute({ component: RootLayout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const clubsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/clubs",
  component: Clubs,
});

const clubDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/clubs/$slug",
  component: ClubDetail,
});

const stockRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/stock",
  component: StockShop,
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$id",
  component: ProductDetail,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: Admin,
});

const clubSetupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/clubs/$id",
  component: ClubSetup,
});

const sizeGuideRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/size-guide",
  component: SizeGuide,
});

const deliveryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/delivery",
  component: DeliveryInfo,
});

const returnsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/returns",
  component: ReturnsPolicy,
});

const brandingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/branding",
  component: BrandingGuide,
});

const clubSetupInfoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/club-setup",
  component: ClubSetupInfo,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  clubsRoute,
  clubDetailRoute,
  stockRoute,
  productRoute,
  adminRoute,
  clubSetupRoute,
  sizeGuideRoute,
  deliveryRoute,
  returnsRoute,
  brandingRoute,
  clubSetupInfoRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
