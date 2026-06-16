'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getFromLocal, STORAGE_KEYS } from '@/lib/storage';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  Leaf, 
  ArrowRight,
  TrendingUp,
  Sparkles,
  RefreshCcw,
  Zap,
  Globe,
  CheckCircle2
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [score, setScore] = useState<number | null>(null);
  const [habits, setHabits] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedScore = getFromLocal<number>(STORAGE_KEYS.SCORE);
    const savedHabits = getFromLocal<string[]>(STORAGE_KEYS.HABITS);
    
    if (savedScore !== null) setScore(savedScore);
    if (savedHabits) setHabits(savedHabits);
  }, []);

  if (!mounted) return null;

  const getProfile = (s: number) => {
    if (s >= 80) return { name: 'EarthWise Hero', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: Trophy, desc: 'You are leading the way for a greener future!' };
    if (s >= 40) return { name: 'Conscious Citizen', color: 'text-amber-600', bg: 'bg-amber-50', icon: Leaf, desc: 'You make mindful decisions that matter.' };
    return { name: 'Beginner', color: 'text-blue-600', bg: 'bg-blue-50', icon: Globe, desc: 'Every journey starts with a single smart choice.' };
  };

  const profile = score !== null ? getProfile(score) : null;

  return (
    <div className="container mx-auto px-4 py-20 max-w-5xl space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-5xl font-bold text-primary">Impact Dashboard</h1>
          <p className="text-xl text-muted-foreground">Real-time summary of your sustainability journey.</p>
        </div>
        <Button variant="outline" className="rounded-full h-12 px-6" asChild>
          <Link href="/smart-choices"><RefreshCcw className="w-4 h-4 mr-2" /> Recalculate Score</Link>
        </Button>
      </div>

      {!profile ? (
        <Card className="p-12 text-center space-y-6 border-none shadow-xl bg-white rounded-[3rem]">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto text-primary">
            <TrendingUp className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold">No data yet!</h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Take the Smart Choices challenge to see your Earth Impact Score and unlock your profile.
          </p>
          <Button size="lg" className="rounded-full px-10" asChild>
            <Link href="/smart-choices">Start Now</Link>
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Score Card */}
          <Card className="md:col-span-1 border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white">
            <CardHeader className={`${profile.bg} p-12 text-center`}>
              <div className={`w-24 h-24 rounded-[2rem] bg-white ${profile.color} flex items-center justify-center mx-auto shadow-xl border-4 border-white`}>
                <profile.icon className="w-12 h-12" />
              </div>
              <CardTitle className={`mt-8 text-3xl font-bold ${profile.color}`}>
                {profile.name}
              </CardTitle>
              <p className="text-sm opacity-80 mt-2 font-medium">Earth Impact Score</p>
            </CardHeader>
            <CardContent className="p-12 text-center space-y-8">
              <div className="text-7xl font-black text-primary tracking-tighter">
                {score}
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {profile.desc}
              </p>
              <Button className="w-full rounded-full h-14 font-bold text-lg shadow-lg shadow-primary/20" asChild>
                <Link href="/alternatives">
                  See Better Alternatives <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Detailed Stats */}
          <div className="md:col-span-2 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="p-8 rounded-[2.5rem] border-none shadow-xl bg-primary text-white space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-white/20 rounded-2xl">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <Badge className="bg-white/10 text-white border-none uppercase text-[10px] tracking-widest font-bold">Completed</Badge>
                </div>
                <h3 className="text-2xl font-bold">Habits Active</h3>
                <div className="text-5xl font-black">{habits.length}</div>
                <p className="text-white/70 text-sm">Positive daily routines tracked in your list.</p>
              </Card>

              <Card className="p-8 rounded-[2.5rem] border-none shadow-xl bg-white space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <Badge variant="secondary" className="uppercase text-[10px] tracking-widest font-bold">Estimated</Badge>
                </div>
                <h3 className="text-2xl font-bold text-primary">Env. Improvement</h3>
                <div className="text-5xl font-black text-emerald-600">+{habits.length * 12}%</div>
                <p className="text-muted-foreground text-sm">Monthly reduction in personal carbon footprint.</p>
              </Card>
            </div>

            <Card className="p-10 rounded-[3rem] border-none shadow-xl bg-secondary/20 flex flex-col sm:flex-row items-center justify-between gap-8">
              <div className="space-y-2 text-center sm:text-left">
                <h4 className="text-2xl font-bold text-primary">Your Journey Summary</h4>
                <p className="text-muted-foreground max-w-sm">
                  You've recorded {habits.length} habits and achieved a score of {score}. 
                  Sustainability is about progress, and you're moving in the right direction!
                </p>
              </div>
              <Button variant="outline" className="rounded-full bg-white px-8 h-12 font-bold" asChild>
                <Link href="/habit-tracker">Manage Habits</Link>
              </Button>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
