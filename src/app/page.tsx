
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Car, 
  Zap, 
  Droplets, 
  Trash2, 
  LineChart, 
  Trophy, 
  ArrowRight,
  ShieldCheck,
  BrainCircuit
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-green');

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage?.imageUrl || "https://picsum.photos/seed/green1/1200/600"}
            alt="Sustainability hero"
            fill
            className="object-cover brightness-50"
            data-ai-hint="forest sustainability"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-2xl space-y-6">
            <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight">
              Small Steps, <br />
              <span className="text-accent">Big Change.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium">
              Join the movement towards a sustainable future. Track your impact, set eco-friendly goals, and receive AI-powered guidance to reduce your carbon footprint.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white h-14 px-8 rounded-full text-lg shadow-xl" asChild>
                <Link href="/assessment">
                  Assess Your Impact <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 h-14 px-8 rounded-full text-lg" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Core Modules</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Everything you need to become an eco-champion, powered by modern tech and environmental science.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Smart Assessment",
              desc: "Interactive evaluation of your habits across transport, energy, water, and waste.",
              icon: BrainCircuit,
              color: "bg-emerald-100 text-emerald-700"
            },
            {
              title: "Impact Dashboard",
              desc: "Real-time visualization of your footprint data and progress over time.",
              icon: LineChart,
              color: "bg-blue-100 text-blue-700"
            },
            {
              title: "Eco-Goal Manager",
              desc: "Personalized task tracking to help you build sustainable habits week by week.",
              icon: Trophy,
              color: "bg-amber-100 text-amber-700"
            }
          ].map((feature, i) => (
            <Card key={i} className="border-none shadow-md animate-gentle-scale hover:shadow-xl transition-all">
              <CardContent className="pt-8 text-center space-y-4">
                <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="font-headline text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Impact Areas */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Your Daily Impact Matters</h2>
                <p className="text-muted-foreground text-lg">
                  We break down your carbon footprint into four key categories that represent the majority of personal environmental impact.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { name: "Transportation", icon: Car, info: "Commutes & travel" },
                  { name: "Energy", icon: Zap, info: "Home power & heating" },
                  { name: "Water", icon: Droplets, info: "Usage & conservation" },
                  { name: "Waste", icon: Trash2, info: "Recycling & disposal" }
                ].map((area, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-border/50 hover:bg-background transition-colors">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <area.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold">{area.name}</h4>
                      <p className="text-sm text-muted-foreground">{area.info}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="https://picsum.photos/seed/sustain2/800/800" 
                alt="Eco-friendly living" 
                fill 
                className="object-cover"
                data-ai-hint="lifestyle sustainability"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="bg-primary rounded-3xl p-12 text-center text-white space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/20 rounded-full translate-x-1/4 translate-y-1/4 blur-3xl"></div>
          
          <h2 className="font-headline text-3xl md:text-5xl font-bold relative z-10">Ready to find your Green Path?</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto relative z-10">
            Start your free assessment today and receive a customized plan to reduce your environmental impact.
          </p>
          <div className="pt-4 relative z-10">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-14 px-10 rounded-full text-lg font-bold" asChild>
              <Link href="/assessment">Start Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
