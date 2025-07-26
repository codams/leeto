import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
const queryClient = new QueryClient();
import "../App.css";
import { DateFnsProvider } from "react-date-fns-hooks";
import { fr } from "date-fns/locale/fr";

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <DateFnsProvider locale={fr}>
          <QueryClientProvider client={queryClient}>
            <Outlet />
            <TanStackRouterDevtools />
          </QueryClientProvider>
        </DateFnsProvider>
      </>
    );
  },
});
