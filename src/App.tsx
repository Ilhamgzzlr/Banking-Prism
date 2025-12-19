import Router from "./router";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <>
      <Router />
      <Toaster
        richColors
        theme="light"
        position="top-center"
      />

    </>
  );
}
