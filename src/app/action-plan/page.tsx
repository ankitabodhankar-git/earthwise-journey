
'use client';

import { useEffect, useState } from 'react';
import { getFromLocal, saveToLocal, STORAGE_KEYS } from '@/lib/storage';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Leaf, 
  Droplets, 
  Trash2, 
  Zap, 
  ShoppingBag,
  Car,
  CheckCircle2,
  Calendar
} from 'lucide-react';

interface Habit {
  id: string;
  title: string;
  category: 'water' | 'waste' | 'energy' | 'shopping' | 'travel';
  impact: 'High' | 'Medium' | 'Low';
}

const DEFAULT_HABITS: Habit[] = [
  { id: 'h1', title: 'Carry a reusable water bottle', category: 'waste', impact: 'Medium' },
  { id: 'h2', title: 'Reduce shower time by 2 minutes', category: 'water', impact: 'High' },
  { id: 'h3', title: 'Unplug chargers when not in use', category: 'energy', impact: 'Low' },
  { id: 'h4', title: 'Use a reusable grocery bag', category: 'shopping', impact: 'Medium' },
  { id: 'h5', title: 'Walk for trips under 1 mile', category: 'travel', impact: 'High' },
  { id: 'h6', title: 'Switch to LED light bulbs', category: 'energy', impact: 'Medium' },
];

export default function ActionPlanPage() {
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = getFromLocal<string[]>(STORAGE_KEYS.JOURNEY);
    if (saved) setCompletedHabits(saved);
  }, []);

  const toggleHabit = (id: string) => {
    const updated = completedHabits.includes(id) 
      ? completedHabits.filter(h => h !== id)
      : [...completedHabits, id];
    setCompletedHabits(updated);
    saveToLocal(STORAGE_KEYS.JOURNEY, updated);
  };

  if (!mounted) return null;

  const getIcon = (cat: Habit['category']) => {
    switch(cat) {
      case 'water': return Droplets;
      case 'waste': return Trash2;
      case 'energy': return Zap;
      case 'shopping': return ShoppingBag;
      case 'travel': return Car;
      default: return Leaf;
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-primary">Smart Action Plan</h1>
          <p className="text-muted-foreground text-lg">Personalized small steps for your daily routine.</p>
        </div>
        <div className="px-6 py-4 rounded-3xl bg-primary text-white flex items-center gap-4 shadow-xl">
          <Calendar className="w-5 h-5" />
          <div className="text-sm font-bold uppercase tracking-wider">
            {completedHabits.length} Actions Active
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {DEFAULT_HABITS.map((habit) => {
          const Icon = getIcon(habit.category);
          const isDone = completedHabits.includes(habit.id);
          
          return (
            <Card 
              key={habit.id} 
              className={`group border-none shadow-lg rounded-[2rem] transition-all duration-300 overflow-hidden cursor-pointer ${
                isDone ? 'bg-primary/5 ring-2 ring-primary' : 'hover:shadow-2xl hover:-translate-y-1'
              }`}
              onClick={() => toggleHabit(habit.id)}
            >
              <CardContent className="p-8 flex items-center gap-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                  isDone ? 'bg-primary text-white' : 'bg-secondary text-primary'
                }`}>
                  <Icon className="w-7 h-7" />
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
                  <h3 className={`text-lg font-bold ${isDone ? 'text-primary' : ''}`}>
                    {habit.title}
                  </h3>
                </div>

                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                  isDone ? 'bg-primary border-primary text-white' : 'border-border'
                }`}>
                  {isDone && <CheckCircle2 className="w-5 h-5" />}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="p-10 rounded-[3rem] bg-white border border-border/50 text-center space-y-6">
        <h3 className="text-2xl font-bold">Why these habits?</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          These actions are chosen because they require minimal lifestyle changes but have high cumulative impact. 
          Focusing on water, waste, and energy is the most effective way for individuals to reduce their ecological burden.
        </p>
        <Button size="lg" className="rounded-full bg-emerald-600 px-10" asChild>
          <a href="/journey">Track My Impact Progress</a>
        </Button>
      </div>
    </div>
  );
}
