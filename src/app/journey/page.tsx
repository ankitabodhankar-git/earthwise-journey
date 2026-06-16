
'use client';

import { useEffect, useState } from 'react';
import { getFromLocal, STORAGE_KEYS } from '@/lib/storage';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  History, 
  TrendingUp, 
  Trophy,
  Leaf,
  Droplets,
  Zap,
  Trash2
} from 'lucide-react';

export default function JourneyPage() {
  const [completedCount, setCompletedCount] = useState(0);
  const [reflectionScore, setReflectionScore] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const habits = getFromLocal<string[]>(STORAGE_KEYS.JOURNEY);
    const reflection = getFromLocal<{score: number}>(STORAGE_KEYS.REFLECTION);
    
    if (habits) setCompletedCount(habits.length);
    if (reflection) setReflectionScore(reflection.score);
  }, []);

  if (!mounted) return null;

  const totalPossible = 6; // Based on default habits
  const progressPercent = (completedCount / totalPossible) * 100;

  return (
    <div className="container mx-auto px-4 py-20 max-w-5xl space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-primary">Impact Journey</h1>
        <p className="text-muted-foreground text-lg">Your progress toward a sustainable life.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Progress Circle Card */}
        <Card className="md:col-span-1 border-none shadow-2xl rounded-[3rem] bg-primary text-white overflow-hidden">
          <CardHeader className="text-center pb-2 pt-12">
            <div className="w-16 h-16 rounded-3xl bg-white/20 flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-8 h-8" />
            </div>
            <CardTitle className="text-2xl font-bold">Habit Adoption</CardTitle>
          </CardHeader>
          <CardContent className="p-10 space-y-8 text-center">
            <div className="relative w-40 h-40 flex items-center justify-center mx-auto">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/10" />
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={440} strokeDashoffset={440 - (440 * progressPercent) / 100} className="text-emerald-400" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black">{Math.round(progressPercent)}%</span>
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-70">Complete</span>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              You have adopted {completedCount} out of {totalPossible} core sustainability habits.
            </p>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <Card className="border-none shadow-xl rounded-[2.5rem] bg-white p-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Leaf className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Estimated</span>
            </div>
            <h4 className="text-xl font-bold">CO₂ Reduced</h4>
            <p className="text-4xl font-black text-primary">{(completedCount * 1.2).toFixed(1)} kg</p>
            <p className="text-xs text-muted-foreground italic">Approximate monthly reduction based on habit impact.</p>
          </Card>

          <Card className="border-none shadow-xl rounded-[2.5rem] bg-white p-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Droplets className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Estimated</span>
            </div>
            <h4 className="text-xl font-bold">Water Saved</h4>
            <p className="text-4xl font-black text-primary">{(completedCount * 150).toLocaleString()} L</p>
            <p className="text-xs text-muted-foreground italic">Calculated from shower reduction and food choices.</p>
          </Card>

          <Card className="border-none shadow-xl rounded-[2.5rem] bg-white p-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Reflection</span>
            </div>
            <h4 className="text-xl font-bold">Initial Score</h4>
            <p className="text-4xl font-black text-primary">{reflectionScore}</p>
            <p className="text-xs text-muted-foreground italic">Your starting baseline score from the reflection.</p>
          </Card>

          <Card className="border-none shadow-xl rounded-[2.5rem] bg-white p-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-600 flex items-center justify-center">
                <Trophy className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Achieved</span>
            </div>
            <h4 className="text-xl font-bold">Badges Won</h4>
            <p className="text-4xl font-black text-primary">{completedCount > 3 ? '2' : '1'}</p>
            <p className="text-xs text-muted-foreground italic">Nature Scout, Habit Builder.</p>
          </Card>
        </div>
      </div>

      <Card className="border-none shadow-xl rounded-[3rem] bg-white overflow-hidden p-12 text-center space-y-8">
        <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
          <History className="w-10 h-10" />
        </div>
        <h3 className="text-3xl font-bold">Historical Summary</h3>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Your journey began on {new Date().toLocaleDateString()}. Since then, you've shown a steady commitment 
          to improving your environmental footprint. Sustainability is a marathon, not a sprint—every green checkmark counts!
        </p>
      </Card>
    </div>
  );
}
