
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Users, ShieldCheck, Heart, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-24 pb-20">
      <section className="bg-primary py-32 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
        <div className="container mx-auto px-4 text-center space-y-8 relative z-10">
          <div className="w-16 h-1 bg-emerald-400 mx-auto rounded-full"></div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">Our Responsibility</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 leading-relaxed">
            EarthWise Journey is built on the principle that collective individual action is the most powerful tool for planetary restoration.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl">
            <Image 
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2560&auto=format&fit=crop" 
              alt="Hands holding earth" 
              fill 
              className="object-cover"
            />
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-primary">Simple Language, Huge Impact</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We translate complex climate data into simple, actionable steps. No jargon, just clear guidance on how your choices in travel, energy, and waste management change the world.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div className="space-y-2">
                <h4 className="text-5xl font-black text-primary">10k+</h4>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Community Members</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-5xl font-black text-primary">0%</h4>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Data Privacy Risk</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/20 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-primary">Core Values</h2>
            <p className="text-muted-foreground text-lg">The pillars of the EarthWise philosophy.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: "Transparency", icon: Globe, desc: "Honest feedback about lifestyle impacts." },
              { title: "Empowerment", icon: Heart, desc: "Putting the power of change in your hands." },
              { title: "Inclusivity", icon: Users, desc: "A journey for everyone, regardless of starting point." },
              { title: "Privacy", icon: ShieldCheck, desc: "Your data stays with you, local and secure." }
            ].map((pillar, i) => (
              <Card key={i} className="border-none shadow-sm text-center rounded-3xl p-8 hover:shadow-xl transition-all">
                <CardContent className="pt-0 space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                    <pillar.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-xl">{pillar.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{pillar.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
