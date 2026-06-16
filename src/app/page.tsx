
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Leaf, 
  Wind, 
  Sun, 
  Droplets, 
  ArrowRight,
  ShieldCheck,
  Globe
} from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop"
            alt="Beautiful forest morning"
            fill
            className="object-cover brightness-[0.45]"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium">
              <Leaf className="w-4 h-4 text-emerald-400" />
              EarthWise Journey
            </div>
            <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tight leading-[1.1]">
              Transform everyday <br />
              <span className="text-emerald-400 italic">choices</span> into a greener future.
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium max-w-xl">
              Discover how your daily habits affect the environment and embark on a personalized path toward sustainable living.
            </p>
            <div className="flex flex-wrap gap-4 pt-6">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white h-16 px-10 rounded-full text-xl shadow-2xl transition-all hover:scale-105" asChild>
                <Link href="/reflection">
                  Start My Green Journey <ArrowRight className="ml-2 h-6 w-6" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/5 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 h-16 px-10 rounded-full text-xl" asChild>
                <Link href="/about">Our Mission</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-primary">Every Action Ripples</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We believe sustainability isn't about perfection; it's about progress. 
              Small, consistent changes in our daily routines collectively heal our planet.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Awareness", desc: "Reflect on your current lifestyle impact.", icon: Globe },
              { title: "Personalization", desc: "Receive custom steps for your level.", icon: ShieldCheck },
              { title: "Commitment", desc: "Pledge to make lasting changes.", icon: HeartIcon }
            ].map((p, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white shadow-sm border border-border/50 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                  <p.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg">{p.title}</h3>
                <p className="text-muted-foreground text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section with Image */}
      <section className="container mx-auto px-4">
        <div className="relative rounded-[3rem] overflow-hidden bg-primary p-12 md:p-24 text-white shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2560&auto=format&fit=crop"
            alt="Hands holding a sapling"
            fill
            className="object-cover opacity-20 pointer-events-none"
          />
          <div className="relative z-10 max-w-2xl space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold">Ready to take the first step?</h2>
            <p className="text-xl text-white/80">
              Our 5-minute reflection will help you understand your environmental strengths and areas for growth.
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full h-14 px-8 font-bold text-lg" asChild>
              <Link href="/reflection">Begin Reflection</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function HeartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
