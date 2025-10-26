import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center text-center">
          <Logo />
          <div className="flex- flex-wrap justify-center mt-6">
            <Link href="/about" className="mx-4 text-sm text-muted-foreground hover:text-foreground">About</Link>
            <Link href="/contact" className="mx-4 text-sm text-muted-foreground hover:text-foreground">Contact</Link>
            <Link href="/privacy" className="mx-4 text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link>
            <Link href="/terms" className="mx-4 text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link>
          </div>
          <div className="mt-6 flex justify-center space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground"><Github /></Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground"><Twitter /></Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground"><Linkedin /></Link>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            © {new Date().getFullYear()} AudioNotes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
