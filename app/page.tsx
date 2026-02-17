import Link from 'next/link';
import { getServices } from '@/lib/api';
import Hero from '@/components/Hero';
import ServicesSection from '@/components/ServicesSection';

export default async function Home() {
  const services = await getServices();

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <ServicesSection services={services} />

      {/* Footer */}
      <footer className="w-full py-6 md:py-12 bg-background border-t border-border">
        <div className="container px-4 md:px-6 mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Consultancy LMS. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link className="text-sm font-medium hover:text-primary transition-colors hover:underline underline-offset-4" href="#">
              Terms of Service
            </Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors hover:underline underline-offset-4" href="#">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
