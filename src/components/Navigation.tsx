
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Reflection', href: '/reflection' },
  { name: 'Profile', href: '/profile' },
  { name: 'Action Plan', href: '/action-plan' },
  { name: 'Journey', href: '/journey' },
  { name: 'Pledge', href: '/pledge' },
  { name: 'About', href: '/about' },
];

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-xl transition-all duration-300">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-headline text-2xl font-bold text-primary group">
          <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Leaf className="h-6 w-6" />
          </div>
          <span>EarthWise</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex md:items-center md:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-bold uppercase tracking-widest transition-all hover:text-primary",
                pathname === item.href ? "text-primary scale-105" : "text-muted-foreground/70"
              )}
            >
              {item.name}
            </Link>
          ))}
          <Button asChild className="bg-primary text-white rounded-full px-6 hover:scale-105 transition-transform">
            <Link href="/reflection">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          className="md:hidden p-2 text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-b bg-background p-6 flex flex-col gap-6 animate-in slide-in-from-top-4 duration-500">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-lg font-bold tracking-tight",
                pathname === item.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
          <Button asChild className="w-full rounded-full py-6">
            <Link href="/reflection" onClick={() => setIsOpen(false)}>Begin Journey</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
