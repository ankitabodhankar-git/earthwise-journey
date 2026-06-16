
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Users, ShieldCheck, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <section className="bg-primary py-24 text-white">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-headline font-bold">About GreenPath AI</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            A student-led initiative dedicated to making sustainability personal, actionable, and data-driven.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
            <Image 
              src="https://picsum.photos/seed/about1/800/600" 
              alt="Sustainability team" 
              fill 
              className="object-cover"
              data-ai-hint="team sustainability"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-headline font-bold text-primary">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              GreenPath AI was born out of a university sustainability challenge. We noticed that while many people care about the environment, few know their actual impact or how to change it effectively.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our platform bridges the gap between intention and action by providing a comprehensive suite of tools that utilize modern web technologies and AI logic to offer a truly personalized experience.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div className="space-y-2">
                <h4 className="text-4xl font-bold text-primary">100%</h4>
                <p className="text-sm text-muted-foreground">Privacy focused. Your data stays in your browser.</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-4xl font-bold text-primary">AI</h4>
                <p className="text-sm text-muted-foreground">Powered by smart recommendations for better results.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-headline font-bold text-primary mb-4">The Project Core</h2>
            <p className="text-muted-foreground">The pillars that make GreenPath AI unique.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: "Eco-Transparency", icon: Leaf, desc: "Clear, honest data about environmental impact." },
              { title: "User Empowerment", icon: Heart, desc: "Tools that put the power of change in your hands." },
              { title: "Modern Tech", icon: ShieldCheck, desc: "A clean, responsive, and secure experience." },
              { title: "Community Focus", icon: Users, desc: "Built for people, by people who care." }
            ].map((pillar, i) => (
              <Card key={i} className="border-none shadow-sm text-center">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                    <pillar.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold">{pillar.title}</h3>
                  <p className="text-sm text-muted-foreground">{pillar.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
