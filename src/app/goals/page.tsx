
'use client';

import { useState, useEffect } from 'react';
import { getFromLocal, saveToLocal, STORAGE_KEYS } from '@/lib/storage';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Trash2, 
  Plus, 
  Leaf, 
  Zap, 
  Car, 
  Droplets,
  CheckCircle2
} from 'lucide-react';

const SUGGESTED_GOALS = [
  { id: 'g1', title: 'Bring a reusable coffee cup', category: 'waste', impact: 'Medium' },
  { id: 'g2', title: 'Switch to a plant-based diet for 1 day', category: 'water', impact: 'High' },
  { id: 'g3', title: 'Unplug devices when not in use', category: 'energy', impact: 'Low' },
  { id: 'g4', title: 'Take public transit instead of driving', category: 'transportation', impact: 'High' },
  { id: 'g5', title: 'Install a low-flow showerhead', category: 'water', impact: 'Medium' },
  { id: 'g6', title: 'Reduce shower time by 2 minutes', category: 'water', impact: 'Medium' },
];

export default function GoalsPage() {
  const [goals, setGoals] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = getFromLocal<any[]>(STORAGE_KEYS.GOALS);
    if (saved) {
      setGoals(saved);
    } else {
      // Default initial goals
      const initial = [
        { id: 'g1', title: 'Bring a reusable coffee cup', category: 'waste', completed: false, impact: 'Medium' },
        { id: 'g3', title: 'Unplug devices when not in use', category: 'energy', completed: true, impact: 'Low' },
      ];
      setGoals(initial);
      saveToLocal(STORAGE_KEYS.GOALS, initial);
    }
  }, []);

  const toggleGoal = (id: string) => {
    const updated = goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g);
    setGoals(updated);
    saveToLocal(STORAGE_KEYS.GOALS, updated);
  };

  const addGoal = (suggested: any) => {
    if (goals.some(g => g.id === suggested.id)) return;
    const updated = [...goals, { ...suggested, completed: false }];
    setGoals(updated);
    saveToLocal(STORAGE_KEYS.GOALS, updated);
  };

  const removeGoal = (id: string) => {
    const updated = goals.filter(g => g.id !== id);
    setGoals(updated);
    saveToLocal(STORAGE_KEYS.GOALS, updated);
  };

  if (!mounted) return null;

  const completedCount = goals.filter(g => g.completed).length;
  const progressPercent = goals.length > 0 ? (completedCount / goals.length) * 100 : 0;

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col gap-10">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-headline font-bold text-primary">Eco-Goal Manager</h1>
            <p className="text-muted-foreground">Turn your assessment results into actionable habits.</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-border min-w-[200px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Weekly Progress</span>
              <span className="text-sm font-bold text-primary">{completedCount}/{goals.length}</span>
            </div>
            <Progress value={progressPercent} className="h-2 bg-secondary" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Active Goals */}
          <Card className="md:col-span-2 border-none shadow-lg">
            <CardHeader className="border-b bg-muted/20">
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-accent" /> Your Active Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {goals.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No active goals. Add some from the suggestions below!</p>
                </div>
              ) : (
                goals.map((goal) => (
                  <div 
                    key={goal.id} 
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                      goal.completed ? 'bg-accent/5 border-accent/20' : 'bg-background hover:border-primary/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <Checkbox 
                        checked={goal.completed} 
                        onCheckedChange={() => toggleGoal(goal.id)}
                        className="w-5 h-5"
                      />
                      <div className="space-y-1">
                        <span className={`text-sm font-medium ${goal.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {goal.title}
                        </span>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-[10px] uppercase py-0">{goal.category}</Badge>
                          <Badge variant="secondary" className="text-[10px] uppercase py-0">{goal.impact} Impact</Badge>
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => removeGoal(goal.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
            {goals.length > 0 && (
              <CardFooter className="bg-muted/10 border-t justify-center py-4">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Trophy className="w-3 h-3" /> Completing goals improves your Eco-Champion score!
                </p>
              </CardFooter>
            )}
          </Card>

          {/* Suggested Goals */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" /> Suggestions
            </h3>
            <div className="space-y-4">
              {SUGGESTED_GOALS.filter(sg => !goals.some(g => g.id === sg.id)).map((suggested) => (
                <Card key={suggested.id} className="border-none shadow-sm hover:shadow-md transition-shadow animate-gentle-scale">
                  <CardContent className="p-4 flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                      <div className="p-2 bg-primary/10 text-primary rounded-lg">
                        {suggested.category === 'waste' && <Trash2 className="w-4 h-4" />}
                        {suggested.category === 'energy' && <Zap className="w-4 h-4" />}
                        {suggested.category === 'transportation' && <Car className="w-4 h-4" />}
                        {suggested.category === 'water' && <Droplets className="w-4 h-4" />}
                      </div>
                      <Badge variant="outline" className="text-[10px]">{suggested.impact} Impact</Badge>
                    </div>
                    <p className="text-sm font-medium">{suggested.title}</p>
                    <Button size="sm" variant="ghost" className="w-full text-primary hover:bg-primary/5" onClick={() => addGoal(suggested)}>
                      Add to List
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
