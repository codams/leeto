import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { GiftCards } from "./components/GiftCards";
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="flex m-6">
          <GiftCards />
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
