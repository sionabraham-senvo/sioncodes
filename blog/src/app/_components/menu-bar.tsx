"use client";

import { useState, useRef, useEffect } from 'react';

interface MenuBarProps {
  items?: string[];
}

const MenuBar = ({ items = ['Home', 'About'] }: MenuBarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Process items to ensure Home is first and About last
  const processItems = () => {
    // Remove Home and About if they exist in the array
    const middleItems = items.filter(item => item !== 'Home' && item !== 'About');

    // Always put Home first and About last
    return ['Home', ...middleItems, 'About'];
  };

  const allItems = processItems();
  const MAX_VISIBLE = 6;

  // Determine visible and dropdown items
  let visibleItems: string[];
  let dropdownItems: string[];

  if (allItems.length <= MAX_VISIBLE) {
    visibleItems = allItems;
    dropdownItems = [];
  } else {
    // Show Home, About, and some middle items
    visibleItems = [
      allItems[0], // Home
      ...allItems.slice(1, MAX_VISIBLE - 2),
      allItems[allItems.length - 1] // About
    ];
    dropdownItems = allItems.slice(MAX_VISIBLE - 2, allItems.length - 1);
  }

  // Generate the correct URL for each item
  const getItemUrl = (item: string): string => {
    // Special cases
    if (item.toLowerCase() === 'home') return '/';
    if (item.toLowerCase() === 'about') return '/about';

    // All other items are tags
    return `/tags/${item.toLowerCase()}`;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="flex flex-col justify-center md:justify-start mb-4">
      <div className="flex space-x-4 items-center">
        {visibleItems.map((item, index) => (
          <a
            key={index}
            href={getItemUrl(item)}
            className="hover:opacity-80 font-medium"
          >
            {item}
          </a>
        ))}

        {dropdownItems.length > 0 && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="font-medium hover:opacity-80"
              aria-label="More menu items"
            >
              +
            </button>

            {isDropdownOpen && (
              <div
                className="absolute top-full left-0 shadow-md mt-1 py-2 rounded-md z-10"
                style={{
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--border)',
                  borderWidth: '1px'
                }}
              >
                {dropdownItems.map((item, index) => (
                  <a
                    key={index}
                    href={getItemUrl(item)}
                    className="block px-4 py-2 hover:opacity-80 whitespace-nowrap"
                    style={{
                      backgroundColor: 'transparent',
                      color: 'var(--primary)'
                    }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="h-0.5 w-full mt-2" style={{ backgroundColor: 'var(--border)' }}></div>
    </nav>
  );
};

export default MenuBar;