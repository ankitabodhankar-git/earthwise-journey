'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Bus, 
  Bike, 
  Trash2, 
  Droplets, 
  Smartphone, 
  FileText, 
  ShoppingBag, 
  Shirt,
  UtensilsCrossed,
  ChefHat,
  ChevronRight,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { saveToLocal, STORAGE_KEYS } from '@/lib/storage';

const DECISIONS = [
  {
    id: 'transport',
    title: 'Commute Choice',
    description: 'How will you get to the office today?',
    options: [
      { id: 'bus', label: 'Take the Bus', icon: Bus, score: 20, impact: 'Medium' },
      { id: 'bike', label: 'Ride a Bike', icon: Bike, score: 50, impact: 'Low' },
    ]
  },
  {
    id: 'hydration',
    title: 'Hydration Strategy',
    description: 'Feeling thirsty during your walk?',
    options: [
      { id: 'plastic', label: 'Buy Plastic Bottle', icon: Droplets, score: 5, impact: 'High' },
      { id: 'reusable', label: 'Use Reusable Bottle', icon: Trash2, score: 50, impact: 'Low' },
    ]
  },
  {
    id: 'notes',
    title: 'Taking Notes',
    description: 'You need to jot down some ideas.',
    options: [
      { id: 'printed', label: 'Printed Notebook', icon: FileText, score: 15, impact: 'Medium' },
      { id: 'digital', label: 'Digital Notes', icon: Smartphone, score: 40, impact: 'Low' },
    ]
  },
  {
    id: 'clothing',
    title: 'New Outfit',
    description: 'Updating your wardrobe for the season.',
    options: [
      { id: 'fast', label: 'Fast Fashion Store', icon: ShoppingBag, score: 5, impact: 'High' },
      { id: 'sustainable', label: 'Sustainable Brand', icon: Shirt, score: 45, impact: 'Low' },
    ]
  },
  {
    id: 'food',
    title: 'Dinner Time',
    description: "It's been a long day. What's for dinner?",
    options: [
      { id: 'delivery', label: 'Food Delivery', icon: UtensilsCrossed, score: 10, impact: 'Medium' },
      { id: 'home', label: 'Home Cooked Food', icon: ChefHat, score: 40, impact: 'Low' },
    ]
  }
];

export default function SmartChoicesPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSelect = (decisionId: string, optionId: string) => {
    const updated = { ...selections, [decisionId]: optionId };
    setSelections(updated);
    
    if (currentStep < DECISIONS.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      calculateAndFinish(updated);
    }
  };

  const calculateAndFinish = (finalSelections: Record<string, string>) => {
    let totalScore = 0;
    DECISIONS.forEach(d => {
      const selected = d.options.find(o => o.id === finalSelections[d.id]);
      if (selected) totalScore += selected.score;
    });

    const maxPossible = DECISIONS.length * 50;
    const normalizedScore = Math.round((totalScore / maxPossible) * 100);

    saveToLocal(STORAGE_KEYS.CHOICES, finalSelections);
    saveToLocal(STORAGE_KEYS.SCORE, normalizedScore);
    router.push('/dashboard');
  };

  if (!mounted) return null;

  const currentDecision = DECISIONS[currentStep];
  const progress = ((currentStep) / DECISIONS.length) * 100;

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary">Smart Choices</h1>
        <p className="text-muted-foreground text-lg">Pick the path you would normally take.</p>
        <div className="max-w-md mx-auto pt-4">
          <div className="flex justify-between text-xs font-bold text-primary mb-2 uppercase">
            <span>Progress</span>
            <span>{currentStep + 1} / {DECISIONS.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <Badge variant="outline" className="px-4 py-1 rounded-full text-emerald-600 border-emerald-200 bg-emerald-50">
            Current Dilemma
          </Badge>
          <h2 className="text-5xl font-bold leading-tight">{currentDecision.title}</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {currentDecision.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {currentDecision.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(currentDecision.id, option.id)}
              className="group relative flex items-center gap-6 p-8 rounded-[2rem] bg-white border-2 border-transparent hover:border-primary shadow-lg transition-all text-left"
            >
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <option.icon className="w-8 h-8" />
              </div>
              <div className="flex-grow space-y-1">
                <h3 className="text-xl font-bold">{option.label}</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-[10px] uppercase font-bold">
                    {option.impact} Carbon Impact
                  </Badge>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </button>
          ))}
        </div>
      </div>

      <div className="pt-12 flex justify-center">
         <div className="flex items-center gap-2 text-sm text-muted-foreground italic">
           <CheckCircle2 className="w-4 h-4 text-emerald-500" />
           Your choices are saved to your local Impact Dashboard.
         </div>
      </div>
    </div>
  );
}
