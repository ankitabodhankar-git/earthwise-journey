
'use client';

import { useState, useEffect } from 'react';
import { getFromLocal, saveToLocal, STORAGE_KEYS } from '@/lib/storage';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Droplets, 
  Trash2, 
  Car, 
  TreePine,
  Heart,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

const PLEDGES = [
  { id: 'p1', title: 'Save Water', desc: 'Fix leaky faucets and limit showers to 5 minutes.', icon: Droplets, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'p2', title: 'Reduce Plastic', desc: 'Stop buying single-use plastic bottles and straws.', icon: Trash2, color: 'text-amber-600', bg: 'bg-amber-50' },
  { id: 'p3', title: 'Public Transport', desc: 'Use buses or trains for your weekend commutes.', icon: Car, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 'p4', title: 'Plant Trees', desc: 'Donate or participate in local tree planting events.', icon: TreePine, color: 'text-green-800', bg: 'bg-green-50' },
];

export default function PledgePage() {
  const [userPledges, setUserPledges] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = getFromLocal<string[]>(STORAGE_KEYS.PLEDGES);
    if (saved) setUserPledges(saved);
  }, []);

  const togglePledge = (id: string) => {
    const updated = userPledges.includes(id) 
      ? userPledges.filter(p => p !== id)
      : [...userPledges, id];
    setUserPledges(updated);
    saveToLocal(STORAGE_KEYS.PLEDGES, updated);
  };

  if (!mounted) return null;

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-primary">Green Pledge</h1>
        <p className="text-muted-foreground text-lg">Commit to a sustainable future. Choose your promises.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PLEDGES.map((p) => {
          const isSelected = userPledges.includes(p.id);
          return (
            <Card 
              key={p.id} 
              className={`group border-none shadow-lg rounded-[2.5rem] transition-all duration-300 overflow-hidden cursor-pointer ${
                isSelected ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-2xl'
              }`}
              onClick={() => togglePledge(p.id)}
            >
              <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between">
                <div className={`w-14 h-14 rounded-2xl ${p.bg} ${p.color} flex items-center justify-center`}>
                  <p.icon className="w-7 h-7" />
                </div>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                  isSelected ? 'bg-primary border-primary text-white' : 'border-border'
                }`}>
                  {isSelected && <CheckCircle2 className="w-5 h-5" />}
                </div>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-3">
                <CardTitle className="text-2xl font-bold">{p.title}</CardTitle>
                <CardDescription className="text-lg leading-relaxed">{p.desc}</CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="relative rounded-[3rem] bg-accent text-white p-12 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-md">
            <div className="flex items-center gap-2 text-white/80 font-bold uppercase text-xs tracking-widest">
              <Sparkles className="w-4 h-4" /> Personal Commitment
            </div>
            <h3 className="text-3xl font-bold">Making it official</h3>
            <p className="text-white/80 text-lg">
              By choosing these pledges, you're joining a community of over 10,000 EarthWise users dedicated to positive environmental change.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white text-accent flex items-center justify-center shadow-lg">
              <Heart className="w-10 h-10 fill-current" />
            </div>
            <div className="text-sm font-black uppercase tracking-widest">
              {userPledges.length} Pledges Made
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
