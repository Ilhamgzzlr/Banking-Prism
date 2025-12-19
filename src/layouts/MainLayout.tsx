import Sidebar from "@components/Sidebar/Sidebar";
import AppBreadcrumb from "@components/Breadcrumb/Breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100 gap-2">
      <Sidebar />

      <div className="flex flex-col flex-1 gap-2">
        {/* HEADER */}
        <header className="bg-white border-b border-gray-200">
          {/* Top Bar */}
          <div className="flex items-center justify-end h-20">
            <div className="flex items-center gap-4 bg-gray-300 h-full pr-16 pl-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="https://i.pravatar.cc/40" />
                <AvatarFallback>FN</AvatarFallback>
              </Avatar>

              <div className="text-left">
                <p className="text-sm font-medium text-gray-800">
                  Full Name
                </p>
                <p className="text-xs text-gray-500">
                  Position
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="px-4 py-2 border-t border-gray-100 flex items-center justify-between">
            <h1 className="text-sm font-semibold text-gray-800">
              Stress Testing Model
            </h1>

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
