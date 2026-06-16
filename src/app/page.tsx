import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { 
  Leaf, 
  ArrowRight,
  ShieldCheck,
  Globe,
  Zap,
  Droplets
} from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2560&auto=format&fit=crop"
            alt="Lush nature"
            fill
            className="object-cover brightness-[0.45]"
            priority
            data-ai-hint="nature forest"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium">
              <Leaf className="w-4 h-4 text-emerald-400" />
              Small Habits. Smarter Future.
            </div>
            <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tight leading-[1.1]">
              EarthWise <br />
              <span className="text-emerald-400">Decide Smarter.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium max-w-xl">
              Understand the impact of your daily choices and discover better alternatives for a more sustainable life.
            </p>
            <div className="flex flex-wrap gap-4 pt-6">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white h-16 px-10 rounded-full text-xl shadow-2xl transition-all hover:scale-105" asChild>
                <Link href="/smart-choices">
                  Take the Challenge <ArrowRight className="ml-2 h-6 w-6" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* awareness section */}
      <section className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-primary">Why EarthWise?</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Every day, we make hundreds of small decisions. What we eat, how we travel, and what we buy all add up. EarthWise empowers you to visualize these impacts and pivot toward a greener lifestyle.
            </p>
            <ul className="space-y-4">
              {[
                { icon: Globe, text: "Visualize your planetary impact." },
                { icon: ShieldCheck, text: "Commit to small, consistent habits." },
                { icon: Zap, text: "Energy-smart recommendations." }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-lg font-medium text-primary/80">
                  <item.icon className="w-6 h-6 text-emerald-500" />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
            <Image 
              src="https://images.unsplash.com/photo-1473081556163-2a17de81fc97?q=80&w=1200&auto=format&fit=crop" 
              alt="Sustainability" 
              fill 
              className="object-cover"
              data-ai-hint="eco green"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
