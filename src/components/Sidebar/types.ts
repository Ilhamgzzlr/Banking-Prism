import React from 'react';

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  hasSubmenu?: boolean;
  submenuItems?: SubmenuItem[];
}

export interface SubmenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}