
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { 
  Car, 
  ShoppingBag, 
  Droplets, 
  Zap, 
  Trash2,
  ChevronRight,
  ChevronLeft,
  CheckCircle2
} from 'lucide-react';
import { saveToLocal, STORAGE_KEYS } from '@/lib/storage';

const QUESTIONS = [
  {
    id: 'travel',
    title: 'Travel Habits',
    question: 'How do you usually commute to work or school?',
    icon: Car,
    options: [
      { label: 'Walk, bike, or use an EV', value: 'green', score: 25 },
      { label: 'Public transport or carpooling', value: 'medium', score: 15 },
      { label: 'Private gasoline vehicle', value: 'impact', score: 5 },
    ]
  },
  {
    id: 'shopping',
    title: 'Shopping Habits',
    question: 'How often do you buy new clothing or electronics?',
    icon: ShoppingBag,
    options: [
      { label: 'Only when necessary, prefer second-hand', value: 'green', score: 25 },
      { label: 'Occasionally when there are sales', value: 'medium', score: 15 },
      { label: 'Frequently, love following trends', value: 'impact', score: 5 },
    ]
  },
  {
    id: 'water',
    title: 'Water Usage',
    question: 'What is your typical shower length?',
    icon: Droplets,
    options: [
      { label: 'Under 5 minutes', value: 'green', score: 25 },
      { label: '5 to 15 minutes', value: 'medium', score: 15 },
      { label: 'Over 15 minutes', value: 'impact', score: 5 },
    ]
  },
  {
    id: 'energy',
    title: 'Energy Saving',
    question: 'Do you unplug electronics when not in use?',
    icon: Zap,
    options: [
      { label: 'Always, use smart strips too', value: 'green', score: 25 },
      { label: 'Sometimes, if I remember', value: 'medium', score: 15 },
      { label: 'Rarely, keep them plugged in', value: 'impact', score: 5 },
    ]
  },
  {
    id: 'waste',
    title: 'Waste Management',
    question: 'How diligently do you recycle and compost?',
    icon: Trash2,
    options: [
      { label: 'Very, zero-waste is the goal', value: 'green', score: 25 },
      { label: 'I recycle the basics', value: 'medium', score: 15 },
      { label: 'Not much, it is inconvenient', value: 'impact', score: 5 },
    ]
  }
];

export default function ReflectionPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeReflection();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeReflection = () => {
    const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
    const result = {
      score: totalScore,
      answers,
      timestamp: new Date().toISOString()
    };
    saveToLocal(STORAGE_KEYS.REFLECTION, result);
    router.push('/profile');
  };

  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;
  const currentQuestion = QUESTIONS[currentStep];

  return (
    <div className="container mx-auto px-4 py-20 max-w-2xl">
      <div className="mb-12 text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary">Lifestyle Reflection</h1>
        <p className="text-muted-foreground">Answer honestly to discover your current environmental footprint.</p>
        <div className="pt-6">
          <div className="flex justify-between text-xs font-bold text-primary mb-2 uppercase tracking-wider">
            <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-secondary" />
        </div>
      </div>

      <Card className="border-none shadow-2xl rounded-[2rem] overflow-hidden">
        <CardHeader className="bg-primary text-white p-8 flex flex-row items-center gap-6">
          <div className="p-4 rounded-2xl bg-white/20">
            <currentQuestion.icon className="w-8 h-8" />
          </div>
          <div>
            <CardTitle className="text-2xl">{currentQuestion.title}</CardTitle>
            <CardDescription className="text-white/70">Category Insight</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-8 pt-10 space-y-8">
          <h3 className="text-xl font-bold leading-tight">{currentQuestion.question}</h3>
          
          <RadioGroup 
            value={answers[currentQuestion.id]?.toString()} 
            onValueChange={(val) => setAnswers({...answers, [currentQuestion.id]: parseInt(val)})}
            className="space-y-4"
          >
            {currentQuestion.options.map((opt) => (
              <Label 
                key={opt.label}
                className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all hover:border-primary/50 ${
                  answers[currentQuestion.id] === opt.score ? 'border-primary bg-primary/5 shadow-inner' : 'border-border'
                }`}
              >
                <RadioGroupItem value={opt.score.toString()} className="sr-only" />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  answers[currentQuestion.id] === opt.score ? 'border-primary' : 'border-muted-foreground'
                }`}>
                  {answers[currentQuestion.id] === opt.score && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                </div>
                <span className="font-medium text-lg">{opt.label}</span>
              </Label>
            ))}
          </RadioGroup>

          <div className="flex justify-between pt-8 border-t">
            <Button variant="ghost" onClick={handleBack} disabled={currentStep === 0} className="rounded-full px-6">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button 
              onClick={handleNext} 
              disabled={answers[currentQuestion.id] === undefined}
              className="bg-primary hover:bg-primary/90 rounded-full px-8 h-12"
            >
              {currentStep === QUESTIONS.length - 1 ? (
                <>Finish <CheckCircle2 className="ml-2 h-4 w-4" /></>
              ) : (
                <>Next Step <ChevronRight className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
