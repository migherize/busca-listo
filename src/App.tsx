import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import OurServices from "@/pages/OurServices";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/contact" component={OurServices} />
      {/* <Route path="/services/register" component={Register} /> */}
      {/* <Route path="/services/subscriptions" component={Subscriptions} /> */}
      {/* <Route path="/help">⚡ Página de ayuda</Route>
      <Route path="/contact">📩 Página de contacto</Route>
      <Route path="/terms">📜 Términos y condiciones</Route>
      <Route path="/privacy">🔒 Política de privacidad</Route> */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
