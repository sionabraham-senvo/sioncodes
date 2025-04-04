"use client";

import { useState, useRef, useEffect } from 'react';
import { createUrl } from "@/lib/url";

interface MenuBarProps {
  items?: string[];
}

const MenuBar = ({ items = ['Home', 'About'] }: MenuBarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [screenSize, setScreenSize] = useState<'small' | 'medium' | 'large'>('large');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Process items to ensure Home is first and About last
  const processItems = () => {
    const middleItems = items.filter(item => item !== 'Home' && item !== 'About');
    return ['Home', ...middleItems, 'About'];
  };

  const allItems = processItems();

  // Update screen size state based on viewport width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize('small'); // Mobile phones
      } else if (width < 1024) {
        setScreenSize('medium'); // Tablets/iPads
      } else {
        setScreenSize('large'); // Desktops
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine visible and dropdown items based on screen size
  let visibleItems: string[];
  let dropdownItems: string[];

  if (screenSize === 'small') {
    // On small mobile: show Home and About, put rest in dropdown
    visibleItems = [allItems[0], allItems[allItems.length - 1]];
    dropdownItems = allItems.slice(1, allItems.length - 1);
  } else if (screenSize === 'medium') {
    // On tablets/medium screens: show up to 4 items
    const MED_MAX_VISIBLE = 4;
    if (allItems.length <= MED_MAX_VISIBLE) {
      visibleItems = allItems;
      dropdownItems = [];
    } else {
      visibleItems = [
        allItems[0],
        ...allItems.slice(1, MED_MAX_VISIBLE - 2),
        allItems[allItems.length - 1]
      ];
      dropdownItems = allItems.slice(MED_MAX_VISIBLE - 2, allItems.length - 1);
    }
  } else {
    // On desktop: show up to 6 items
    const LARGE_MAX_VISIBLE = 6;
    if (allItems.length <= LARGE_MAX_VISIBLE) {
      visibleItems = allItems;
      dropdownItems = [];
    } else {
      visibleItems = [
        allItems[0],
        ...allItems.slice(1, LARGE_MAX_VISIBLE - 2),
        allItems[allItems.length - 1]
      ];
      dropdownItems = allItems.slice(LARGE_MAX_VISIBLE - 2, allItems.length - 1);
    }
  }

  const getItemUrl = (item: string): string => {
    if (item.toLowerCase() === 'home') return createUrl('/');
    if (item.toLowerCase() === 'about') return createUrl('/about');
    return createUrl(`/tags/${item.toLowerCase()}`);
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
    <nav className="flex flex-col items-center justify-center mb-4">
      <div className="flex flex-wrap justify-center space-x-4 items-center">
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
              {screenSize === 'small' ? "Menu" : "+"}
            </button>

            {isDropdownOpen && (
              <div
                className="absolute top-full right-0 sm:right-auto sm:left-0 shadow-md mt-1 py-2 rounded-md z-10"
                style={{
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--border)',
                  borderWidth: '1px',
                  maxWidth: screenSize === 'small' ? '200px' : 'auto'
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
