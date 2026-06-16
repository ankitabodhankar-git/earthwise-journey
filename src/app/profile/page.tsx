
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getFromLocal, STORAGE_KEYS } from '@/lib/storage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Leaf, 
  Trophy, 
  ArrowRight,
  TrendingUp,
  Sparkles,
  RefreshCcw,
  Zap,
  Globe
} from 'lucide-react';

interface ReflectionResult {
  score: number;
  answers: Record<string, number>;
  timestamp: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [result, setResult] = useState<ReflectionResult | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const data = getFromLocal<ReflectionResult>(STORAGE_KEYS.REFLECTION);
    if (!data) {
      router.push('/reflection');
      return;
    }
    setResult(data);
  }, [router]);

  if (!mounted || !result) return null;

  const getProfile = (score: number) => {
    if (score >= 100) return {
      name: 'Sustainability Champion',
      icon: Trophy,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      strengths: 'Excellent awareness and active participation in green habits.',
      improvement: 'Focus on community advocacy and influencing others.'
    };
    if (score >= 60) return {
      name: 'Eco Supporter',
      icon: Leaf,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      strengths: 'Consistent efforts in multiple areas of sustainable living.',
      improvement: 'Refine your energy consumption and shopping habits.'
    };
    return {
      name: 'Nature Explorer',
      icon: Globe,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      strengths: 'Starting to recognize environmental impacts.',
      improvement: 'Look for small, daily wins in waste and water management.'
    };
  };

  const profile = getProfile(result.score);

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-primary">Your Green Profile</h1>
        <p className="text-muted-foreground text-lg">Based on your everyday choices.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Identity Card */}
        <Card className="md:col-span-1 border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-white">
          <CardHeader className={`${profile.bg} p-10 text-center`}>
            <div className={`w-20 h-20 rounded-3xl ${profile.bg} ${profile.color} flex items-center justify-center mx-auto border-4 border-white shadow-lg`}>
              <profile.icon className="w-10 h-10" />
            </div>
            <CardTitle className={`mt-6 text-2xl font-bold ${profile.color}`}>
              {profile.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 text-center space-y-6">
            <div className="p-4 rounded-2xl bg-muted/30">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Impact Score</span>
              <p className="text-4xl font-black text-primary">{result.score}</p>
            </div>
            <Button variant="outline" className="w-full rounded-full" asChild>
              <Link href="/reflection">
                <RefreshCcw className="w-4 h-4 mr-2" /> Retake Reflection
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Details Card */}
        <Card className="md:col-span-2 border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-white p-10 space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-emerald-600 font-bold uppercase text-xs tracking-wider">
                <Sparkles className="w-4 h-4" /> Environmental Strengths
              </div>
              <p className="text-lg leading-relaxed">{profile.strengths}</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-amber-600 font-bold uppercase text-xs tracking-wider">
                <TrendingUp className="w-4 h-4" /> Growth Areas
              </div>
              <p className="text-lg leading-relaxed">{profile.improvement}</p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-primary text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg shadow-primary/20">
            <div className="space-y-1">
              <h4 className="text-xl font-bold">Ready to take action?</h4>
              <p className="text-white/80">Check out your personalized action plan.</p>
            </div>
            <Button className="bg-white text-primary hover:bg-white/90 rounded-full px-8 h-12 font-bold" asChild>
              <Link href="/action-plan">
                View My Action Plan <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        <Card className="border-none shadow-md p-8 bg-secondary/30 rounded-3xl flex items-start gap-6">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm">
            <Zap className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h4 className="font-bold">Next Milestone</h4>
            <p className="text-sm text-muted-foreground">Reach 100 points to unlock "Sustainability Champion" status and share your journey.</p>
          </div>
        </Card>
        <Card className="border-none shadow-md p-8 bg-accent/5 rounded-3xl flex items-start gap-6">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-accent shadow-sm">
            <Globe className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h4 className="font-bold">Your Global Impact</h4>
            <p className="text-sm text-muted-foreground">Every choice you've recorded today contributes to a collective 0.4kg reduction in carbon estimation.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
