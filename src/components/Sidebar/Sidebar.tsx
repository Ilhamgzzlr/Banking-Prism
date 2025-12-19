import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { menuItems } from './constants';



const Sidebar: React.FC = () => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const handleItemClick = (itemId: string) => {
    if (menuItems.find(item => item.id === itemId)?.hasSubmenu) {
      setExpandedItem(expandedItem === itemId ? null : itemId);
    }
  };

  const handleSubmenuClick = (submenuId: string) => {
    console.log(`Navigasi ke: ${submenuId}`);

  };

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo Section */}
      <div className="border-b border-gray-200">
        <div className="flex items-center">
          <div className="relative">
            {/* Logo SVG */}
            <img src="/logo.png" alt="" />
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 py-2">
        {menuItems.map((item) => (
          <div key={item.id}>
            <button
              onClick={() => handleItemClick(item.id)}
              className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-gray-600">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {item.hasSubmenu && (
                <ChevronRight
                  className={`w-4 h-4 text-gray-400 transition-transform ${expandedItem === item.id ? 'rotate-90' : ''
                    }`}
                />
              )}
            </button>
            {item.hasSubmenu && expandedItem === item.id && item.submenuItems && (
              <div className="bg-gray-50 py-2">
                {item.submenuItems.map((subItem) => (
                  <button
                    key={subItem.id}
                    onClick={() => handleSubmenuClick(subItem.id)}
                    className="w-full flex items-center gap-3 px-12 py-2.5 text-left text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                  >
                    {subItem.icon && (
                      <span className="text-gray-500">{subItem.icon}</span>
                    )}
                    <span>{subItem.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;