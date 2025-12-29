import Sidebar from "@components/Sidebar/Sidebar";
import AppBreadcrumb from "@components/Breadcrumb/Breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100 gap-2">
      <Sidebar />

      <div className="flex flex-col flex-1 gap-2">
        {/* HEADER */}
        <header className="bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 shadow-sm">
          {/* Top Bar */}
          <div className="flex items-center justify-end h-20">
            <div className="relative flex items-center gap-4 bg-gradient-to-br from-slate-100 to-gray-200 h-full pr-16 pl-6 group">
              {/* Decorative accent */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-700 to-purple-300" />

              <Avatar className="h-12 w-12 ring-2 ring-white shadow-md">
                <AvatarImage src="https://i.pravatar.cc/40" />
                <AvatarFallback className="bg-gradient-to-br from-purple-700 to-purple-300 text-white font-semibold">
                  FN
                </AvatarFallback>
              </Avatar>

              <div className="text-left flex-1">
                <p className="text-sm font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                  Full Name
                </p>
                <p className="text-xs text-gray-600 group-hover:text-gray-500 transition-colors">
                  Position
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="px-6 py-3 border-t border-border/50 flex items-center justify-between bg-gradient-to-r from-background via-background to-background hover:from-primary/2">
            <h1 className="text-sm font-semibold text-foreground tracking-tight">Stress Testing Model</h1>

            <AppBreadcrumb />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto flex flex-col">
          {children}
        </main>

        {/* Footer */}
        <footer className="h-14 border-t border-gray-200 bg-white flex items-center px-4">
          <p className="text-lg text-gray-500 text-center">2025 © PRISM</p>
        </footer>
      </div>
    </div>
  );
}
