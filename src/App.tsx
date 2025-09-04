import { Route, Switch } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/common/ui/toaster";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Home from "@/pages/Home/index";
import CategoryPage from "@/pages/Category";
import CategoriesPage from "@/pages/Categories";
import NotFound from "@/pages/NotFound";
import OurServices from "@/pages/OurServices";
import ProductDetail from "@/pages/ProductDetail";
import StorePage from "@/pages/Store/index.tsx";
import StoresPage from "@/pages/Stores/index.tsx";
import RegisterStore from "@/pages/RegisterStore";
import Help from "@/pages/Help";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import { queryClient } from "@/lib/queryClient";
import { SearchProvider } from "@/contexts/SearchContext";
import "./index.css";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/category/:category" component={CategoryPage} />
              <Route path="/category" component={CategoriesPage} />
              <Route path="/product/:id" component={ProductDetail} />
              <Route path="/stores" component={StoresPage} />
              <Route path="/store/:storeName" component={StorePage} />
              <Route path="/register-store" component={RegisterStore} />
              <Route path="/about" component={OurServices} />
              <Route path="/services" component={OurServices} />
              <Route path="/help" component={Help} />
              <Route path="/terms" component={Terms} />
              <Route path="/privacy" component={Privacy} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
          <Toaster />
        </div>
      </SearchProvider>
    </QueryClientProvider>
  );
}

export default App;
