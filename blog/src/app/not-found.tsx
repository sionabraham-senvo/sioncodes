import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createUrl, getImagePath } from '@/lib/url';
import {Intro} from "@/app/_components/intro";

export default function NotFound() {
  return (
    <div className="container mx-auto px-5">
      <Intro />
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="mb-8 relative w-48 h-48 md:w-64 md:h-64">
          <Image
            src={getImagePath("/assets/blog/authors/sion_walking.webp")}
            alt="Sion Walking"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">It seems you're a little bit lost..</h2>
        <p className="mb-8 text-lg opacity-80 max-w-md">
          Don't fret! We all get lost sometimes. You can return to the homepage and start your journey from there.
        </p>
        <Link
          href={createUrl('/')}
          className="px-6 py-3 rounded-md font-medium transition-opacity hover:opacity-80"
          style={{
            backgroundColor: 'var(--secondary)',
            color: 'var(--background)'
          }}
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}