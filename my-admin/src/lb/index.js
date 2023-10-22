import React from "react";
import ReactDOM from "react-dom"; // Correct the import
import { QueryClientProvider, QueryClient } from "react-query";
import App from "./App";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}> {/* Pass queryClient */}
            <App />
        </QueryClientProvider>
    </React.StrictMode>
);
