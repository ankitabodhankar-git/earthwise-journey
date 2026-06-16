'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getFromLocal, STORAGE_KEYS } from '@/lib/storage';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  Leaf, 
  ArrowRight,
  RefreshCcw,
  Sparkles
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { personalizeCarbonFootprintRecommendations } from '@/ai/flows/personalized-carbon-footprint-recommendations';

interface AssessmentResults {
  transportationScore: number;
  energyScore: number;
  waterScore: number;
  wasteScore: number;
  overallScore: number;
  timestamp: string;
}

const getEcoLevel = (score: number) => {
  if (score < 25) return 'Green Champion';
  if (score < 50) return 'Eco Enthusiast';
  if (score < 75) return 'Sustainable Starter';
  return 'Eco Beginner';
};

export default function ResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [recommendations, setRecommendations] = useState<string>('');
  const [loadingAI, setLoadingAI] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const data = getFromLocal<AssessmentResults>(STORAGE_KEYS.RESULTS);
    if (!data) {
      router.push('/assessment');
      return;
    }
    setResults(data);
    fetchRecommendations(data);
  }, [router]);

  const fetchRecommendations = async (data: AssessmentResults) => {
    setLoadingAI(true);
    try {
      const ecoLevel = getEcoLevel(data.overallScore);
      const res = await personalizeCarbonFootprintRecommendations({
        transportationScore: data.transportationScore,
        energyScore: data.energyScore,
        waterScore: data.waterScore,
        wasteScore: data.wasteScore,
        currentEcoLevel: ecoLevel
      });
      setRecommendations(res.recommendations);
    } catch (e) {
      console.error('AI Flow Error:', e);
      setRecommendations('Could not generate AI recommendations at this time. Focus on reducing transportation miles and energy waste.');
    } finally {
      setLoadingAI(false);
    }
  };

  if (!mounted || !results) return null;

  const chartData = [
    { name: 'Transport', score: results.transportationScore, fill: 'hsl(var(--chart-1))' },
    { name: 'Energy', score: results.energyScore, fill: 'hsl(var(--chart-2))' },
    { name: 'Water', score: results.waterScore, fill: 'hsl(var(--chart-3))' },
    { name: 'Waste', score: results.wasteScore, fill: 'hsl(var(--chart-4))' },
  ];

  const ecoLevel = getEcoLevel(results.overallScore);

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col gap-10">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-headline font-bold text-primary">Your Impact Dashboard</h1>
        <p className="text-muted-foreground">Detailed breakdown of your footprint based on your recent assessment.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Score Card */}
        <Card className="lg:col-span-1 border-none bg-primary text-primary-foreground shadow-xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl">Current Status</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6 pt-4">
            <div className="relative w-40 h-40 flex items-center justify-center bg-white/10 rounded-full border-4 border-white/20">
              <div className="text-center">
                <span className="text-5xl font-bold">{Math.round(results.overallScore)}</span>
                <span className="block text-xs uppercase tracking-widest opacity-70">Impact Score</span>
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-white text-sm font-bold">
                <Trophy className="w-4 h-4" /> {ecoLevel}
              </div>
              <p className="text-sm opacity-80 pt-4">
                Lower scores represent a smaller environmental footprint. Keep improving to reach Green Champion level!
              </p>
            </div>
            <Button variant="secondary" className="w-full mt-4" asChild>
              <Link href="/assessment">
                <RefreshCcw className="mr-2 h-4 w-4" /> Retake Assessment
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Charts Card */}
        <Card className="lg:col-span-2 border-none shadow-lg">
          <CardHeader>
            <CardTitle>Impact Area Breakdown</CardTitle>
            <CardDescription>Visualizing your performance across different categories.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} hide />
                <Tooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-3 shadow-lg rounded-lg border border-border">
                          <p className="font-bold text-primary">{payload[0].payload.name}</p>
                          <p className="text-sm">Score: {Math.round(Number(payload[0].value))}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* AI Recommendations */}
        <Card className="border-none shadow-lg overflow-hidden flex flex-col">
          <CardHeader className="bg-accent/10 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-primary">
                <Sparkles className="w-5 h-5 text-accent" /> AI Recommendations
              </CardTitle>
              {loadingAI && <div className="animate-pulse text-xs text-accent font-medium">Generating...</div>}
            </div>
          </CardHeader>
          <CardContent className="pt-6 flex-grow">
            {loadingAI ? (
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
                <div className="h-4 bg-muted rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-muted rounded w-2/3 animate-pulse"></div>
              </div>
            ) : (
              <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line">
                {recommendations || 'Complete your assessment to see personalized recommendations.'}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Goals Summary */}
        <Card className="border-none shadow-lg bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-primary" /> Active Eco-Goals
            </CardTitle>
            <CardDescription>Small tasks that lead to big impact.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-border bg-background flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <span className="text-sm font-medium">Switch to 100% LED bulbs</span>
                </div>
                <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-bold">In Progress</span>
              </div>
              <div className="p-4 rounded-xl border border-border bg-background flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-muted"></div>
                  <span className="text-sm font-medium">Start composting organic waste</span>
                </div>
                <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-bold">Planned</span>
              </div>
            </div>
            <Button className="w-full bg-primary" asChild>
              <Link href="/goals">
                Manage My Goals <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
