
import Link from 'next/link';
import { Leaf } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t bg-card mt-auto py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center gap-2 font-headline text-xl font-bold text-primary mb-4">
            <Leaf className="h-6 w-6" />
            <span>GreenPath AI</span>
          </Link>
          <p className="text-muted-foreground text-sm max-w-sm">
            Empowering individuals to understand, track, and reduce their carbon footprint through data-driven insights and AI-powered recommendations.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/assessment" className="hover:text-primary">Footprint Assessment</Link></li>
            <li><Link href="/goals" className="hover:text-primary">Eco Goals</Link></li>
            <li><Link href="/about" className="hover:text-primary">About Project</Link></li>
            <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-primary">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} GreenPath AI Sustainability Challenge Project.
      </div>
    </footer>
  );
}
