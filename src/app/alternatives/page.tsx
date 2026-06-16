'use client';

import { useEffect, useState } from 'react';
import { getFromLocal, STORAGE_KEYS } from '@/lib/storage';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Lightbulb, 
  Leaf, 
  Car, 
  Droplets, 
  ShoppingBag,
  Trash2
} from 'lucide-react';

const ALTERNATIVES = [
  { 
    id: 'transport', 
    bad: 'Single-occupancy car trips', 
    good: 'Electric bike or Public Transit', 
    icon: Car, 
    benefit: 'Reduces carbon emissions by up to 80% per mile.' 
  },
  { 
    id: 'bottles', 
    bad: 'Disposable PET water bottles', 
    good: 'Stainless steel reusable bottle', 
    icon: Droplets, 
    benefit: 'Prevents 150+ plastic bottles from reaching oceans annually.' 
  },
  { 
    id: 'clothing', 
    bad: 'Buying cheap fast-fashion', 
    good: 'Thrifting or quality organic cotton', 
    icon: ShoppingBag, 
    benefit: 'Saves thousands of liters of water used in textile production.' 
  },
  { 
    id: 'waste', 
    bad: 'Throwing food waste in trash', 
    good: 'Composting at home or community bin', 
    icon: Trash2, 
    benefit: 'Reduces methane gas production in landfills.' 
  },
];

export default function AlternativesPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-primary">Better Alternatives</h1>
        <p className="text-xl text-muted-foreground">Swap your routine habits for planet-friendly ones.</p>
      </div>

      <div className="space-y-8">
        {ALTERNATIVES.map((alt) => (
          <Card key={alt.id} className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-white hover:shadow-2xl transition-shadow">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row items-stretch">
                <div className="p-10 flex-grow space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                      <Lightbulb className="w-6 h-6" />
                    </div>
                    <Badge variant="outline" className="text-primary font-bold">Eco Insight</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Standard Choice</span>
                      <p className="text-xl font-bold line-through text-muted-foreground/60">{alt.bad}</p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">EarthWise Choice</span>
                      <p className="text-2xl font-black text-primary flex items-center gap-2">
                        {alt.good} <Leaf className="w-5 h-5 text-emerald-500" />
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-muted/50">
                    <p className="text-muted-foreground italic leading-relaxed">
                      " {alt.benefit} "
                    </p>
                  </div>
                </div>
                <div className="md:w-48 bg-secondary/30 flex items-center justify-center p-8">
                  <alt.icon className="w-16 h-16 text-primary/40" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="p-12 bg-primary rounded-[3rem] text-white text-center space-y-6 shadow-2xl shadow-primary/30">
        <h3 className="text-3xl font-bold">Ready to make the switch?</h3>
        <p className="text-white/80 text-lg max-w-xl mx-auto">
          Start by picking just one alternative this week. Small steps lead to big change.
        </p>
        <Button className="bg-white text-primary hover:bg-white/90 rounded-full px-10 h-14 font-bold text-lg" asChild>
          <a href="/habit-tracker">Add to My Tracker</a>
        </Button>
      </div>
    </div>
  );
}
