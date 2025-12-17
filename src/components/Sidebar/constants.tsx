import type { MenuItem } from './types';
import { LayoutDashboard, Database, Cpu } from 'lucide-react';


export const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard Information',
    icon: <LayoutDashboard className="w-5 h-5" />,
    hasSubmenu: true,
    submenuItems: [
      {
        id: 'data-management',
        label: 'Data Management',
        icon: <Database className="w-4 h-4" />
      },
      {
        id: 'model-management',
        label: 'Model Management',
        icon: <Cpu className="w-4 h-4" />
      }
    ]
  }
];