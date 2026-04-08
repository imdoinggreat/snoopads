'use client';
import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';

export function SiteHeader() {
    const [open, setOpen] = React.useState(false);
    const scrolled = useScroll(10);

    const links = [
        { label: 'Explore', href: '/explore' },
        { label: 'Submit', href: '/submit' },
        { label: 'About', href: '/about' },
    ];

    React.useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    return (
        <header
            className={cn(
                'sticky top-0 z-50 w-full border-b border-transparent transition-all duration-300',
                scrolled && !open && 'bg-background/95 supports-[backdrop-filter]:bg-background/80 border-border backdrop-blur-lg',
                !scrolled && !open && 'bg-background',
                open && 'bg-background',
            )}
        >
            <nav className={cn(
                'container max-w-7xl mx-auto flex items-center justify-between px-6 transition-all duration-300',
                scrolled ? 'h-10' : 'h-12',
            )}>
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-sm font-semibold tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        SNOOPADS
                    </span>
                </Link>
                <div className="hidden items-center gap-6 md:flex">
                    {links.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
                <button
                    onClick={() => setOpen(!open)}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-border md:hidden"
                >
                    <MenuToggleIcon open={open} className="size-4" duration={300} />
                </button>
            </nav>

            {/* Mobile menu */}
            <div className={cn(
                'fixed top-12 right-0 bottom-0 left-0 z-50 flex flex-col bg-background border-t border-border md:hidden',
                open ? 'block' : 'hidden',
            )}>
                <div className="flex flex-col gap-1 p-4">
                    {links.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest py-3 px-2"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    );
}
