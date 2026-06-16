'use client';

import { useState, useEffect } from 'react';
import { getFromLocal, saveToLocal, STORAGE_KEYS } from '@/lib/storage';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Leaf, 
  Trash2, 
  Plus, 
  Droplets, 
  Zap, 
  Car, 
  ShoppingBag,
  CheckCircle2
} from 'lucide-react';

interface Habit {
  id: string;
  title: string;
  category: 'water' | 'waste' | 'energy' | 'travel' | 'shopping';
  impact: 'High' | 'Medium' | 'Low';
}

const SUGGESTIONS: Habit[] = [
  { id: 'h1', title: 'Carry a reusable water bottle', category: 'waste', impact: 'Medium' },
  { id: 'h2', title: 'Reduce shower time by 2 minutes', category: 'water', impact: 'High' },
  { id: 'h3', title: 'Unplug chargers when not in use', category: 'energy', impact: 'Low' },
  { id: 'h4', title: 'Use public transit instead of car', category: 'travel', impact: 'High' },
  { id: 'h5', title: 'Switch to a plant-based meal', category: 'shopping', impact: 'High' },
  { id: 'h6', title: 'Use a reusable grocery bag', category: 'waste', impact: 'Medium' },
];

export default function HabitTrackerPage() {
  const [activeHabits, setActiveHabits] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = getFromLocal<string[]>(STORAGE_KEYS.HABITS);
    if (saved) setActiveHabits(saved);
  }, []);

  const toggleHabit = (id: string) => {
    const updated = activeHabits.includes(id) 
      ? activeHabits.filter(h => h !== id)
      : [...activeHabits, id];
    setActiveHabits(updated);
    saveToLocal(STORAGE_KEYS.HABITS, updated);
  };

  if (!mounted) return null;

  const getIcon = (cat: Habit['category']) => {
    switch(cat) {
      case 'water': return Droplets;
      case 'energy': return Zap;
      case 'travel': return Car;
      case 'shopping': return ShoppingBag;
      default: return Leaf;
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-primary">Habit Tracker</h1>
        <p className="text-xl text-muted-foreground">Small changes, huge impact. Track your daily green wins.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SUGGESTIONS.map((habit) => {
          const Icon = getIcon(habit.category);
          const isSelected = activeHabits.includes(habit.id);
          
          return (
            <Card 
              key={habit.id} 
              className={`group border-none shadow-xl rounded-[2.5rem] transition-all duration-300 overflow-hidden cursor-pointer ${
                isSelected ? 'ring-2 ring-primary bg-primary/5' : 'hover:-translate-y-1 hover:shadow-2xl'
              }`}
              onClick={() => toggleHabit(habit.id)}
            >
              <CardContent className="p-8 flex items-center gap-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${
                  isSelected ? 'bg-primary text-white' : 'bg-secondary text-primary'
                }`}>
                  <Icon className="w-8 h-8" />
                </div>
                
                <div className="flex-grow space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-tighter">
                      {habit.category}
                    </Badge>
                    <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-tighter">
                      {habit.impact} Impact
                    </Badge>
                  </div>
                  <h3 className={`text-xl font-bold ${isSelected ? 'text-primary' : ''}`}>
                    {habit.title}
                  </h3>
                </div>

                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                  isSelected ? 'bg-primary border-primary text-white' : 'border-border'
                }`}>
                  {isSelected && <CheckCircle2 className="w-6 h-6" />}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="p-12 rounded-[3rem] border-none shadow-2xl bg-white text-center space-y-8">
        <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
          <Leaf className="w-10 h-10" />
        </div>
        <div className="space-y-4">
          <h3 className="text-3xl font-bold">Why track habits?</h3>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Research shows that tracking small habits increases the likelihood of long-term lifestyle change. 
            By committing to these {activeHabits.length} actions, you're building a smarter, greener future.
          </p>
        </div>
        <Button size="lg" className="rounded-full px-12 h-14 font-bold text-lg" asChild>
          <a href="/dashboard">View My Global Progress</a>
        </Button>
      </Card>
    </div>
  );
}
