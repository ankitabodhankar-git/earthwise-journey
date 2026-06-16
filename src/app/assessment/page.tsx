
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { 
  Car, 
  Zap, 
  Droplets, 
  Trash2, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2
} from 'lucide-react';
import { saveToLocal, STORAGE_KEYS } from '@/lib/storage';

const STEPS = [
  { id: 'transportation', title: 'Transportation', icon: Car },
  { id: 'energy', title: 'Energy Usage', icon: Zap },
  { id: 'water', title: 'Water Usage', icon: Droplets },
  { id: 'waste', title: 'Waste Management', icon: Trash2 },
];

export default function AssessmentPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    transportation: {
      milesPerWeek: '',
      transportType: 'gas', // gas, electric, hybrid, public
    },
    energy: {
      monthlyBill: '',
      renewables: 'none', // none, partial, all
    },
    water: {
      showerLength: 'medium', // short, medium, long
      dietType: 'omnivore', // vegan, vegetarian, omnivore
    },
    waste: {
      recyclingHabits: 'sometimes', // never, sometimes, always
      composting: 'no', // yes, no
    }
  });

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      submitAssessment();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitAssessment = () => {
    // Calculate basic scores (0-100, lower is better)
    // This is a simplified mock logic for the "Eco-Champion Scoring Engine"
    
    const transScore = Math.min(100, (Number(formData.transportation.milesPerWeek) || 0) * (formData.transportation.transportType === 'gas' ? 1 : 0.5));
    const energyScore = Math.min(100, (Number(formData.energy.monthlyBill) || 0) * (formData.energy.renewables === 'none' ? 1 : 0.4));
    
    const waterMap = { short: 20, medium: 50, long: 90 };
    const dietMap = { vegan: 15, vegetarian: 40, omnivore: 85 };
    const waterScore = (waterMap[formData.water.showerLength as keyof typeof waterMap] + dietMap[formData.water.dietType as keyof typeof dietMap]) / 2;

    const recyclingMap = { never: 90, sometimes: 50, always: 10 };
    const wasteScore = (recyclingMap[formData.waste.recyclingHabits as keyof typeof recyclingMap] + (formData.waste.composting === 'yes' ? 10 : 70)) / 2;

    const results = {
      transportationScore: transScore,
      energyScore: energyScore,
      waterScore: waterScore,
      wasteScore: wasteScore,
      overallScore: (transScore + energyScore + waterScore + wasteScore) / 4,
      timestamp: new Date().toISOString()
    };

    saveToLocal(STORAGE_KEYS.RESULTS, results);
    router.push('/results');
  };

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl font-headline font-bold text-primary text-center">Smart Footprint Assessment</h1>
        <p className="text-center text-muted-foreground">Complete the 4-step questionnaire to evaluate your environmental impact.</p>
        <div className="pt-4">
          <div className="flex justify-between text-xs font-medium text-muted-foreground mb-2">
            <span>Step {currentStep + 1} of {STEPS.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2 bg-secondary" />
        </div>
      </div>

      <Card className="shadow-lg border-none">
        <CardHeader className="flex flex-row items-center gap-4 border-b bg-muted/30">
          <div className="p-3 rounded-lg bg-primary text-primary-foreground">
            {(() => {
              const Icon = STEPS[currentStep].icon;
              return <Icon className="w-6 h-6" />;
            })()}
          </div>
          <div>
            <CardTitle>{STEPS[currentStep].title}</CardTitle>
            <CardDescription>Enter details about your {STEPS[currentStep].id} habits.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-8">
          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="miles">Roughly how many miles do you commute per week?</Label>
                <Input 
                  id="miles" 
                  type="number" 
                  placeholder="e.g. 50" 
                  value={formData.transportation.milesPerWeek}
                  onChange={(e) => setFormData({...formData, transportation: {...formData.transportation, milesPerWeek: e.target.value}})}
                />
              </div>
              <div className="space-y-3">
                <Label>What is your primary mode of transport?</Label>
                <RadioGroup 
                  value={formData.transportation.transportType}
                  onValueChange={(v) => setFormData({...formData, transportation: {...formData.transportation, transportType: v}})}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <Label className="flex items-center gap-2 p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="gas" /> Gasoline Car
                  </Label>
                  <Label className="flex items-center gap-2 p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="hybrid" /> Hybrid / Public Transit
                  </Label>
                  <Label className="flex items-center gap-2 p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="electric" /> Electric Vehicle
                  </Label>
                  <Label className="flex items-center gap-2 p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="walking" /> Biking / Walking
                  </Label>
                </RadioGroup>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="bill">Average monthly home energy bill ($)?</Label>
                <Input 
                  id="bill" 
                  type="number" 
                  placeholder="e.g. 100" 
                  value={formData.energy.monthlyBill}
                  onChange={(e) => setFormData({...formData, energy: {...formData.energy, monthlyBill: e.target.value}})}
                />
              </div>
              <div className="space-y-3">
                <Label>Do you use renewable energy sources?</Label>
                <RadioGroup 
                  value={formData.energy.renewables}
                  onValueChange={(v) => setFormData({...formData, energy: {...formData.energy, renewables: v}})}
                  className="space-y-3"
                >
                  <Label className="flex items-center gap-2 p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="none" /> No renewable sources
                  </Label>
                  <Label className="flex items-center gap-2 p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="partial" /> Partial (some green power plan)
                  </Label>
                  <Label className="flex items-center gap-2 p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="all" /> Full (Solar panels / 100% Green Plan)
                  </Label>
                </RadioGroup>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Average shower length?</Label>
                <RadioGroup 
                  value={formData.water.showerLength}
                  onValueChange={(v) => setFormData({...formData, water: {...formData.water, showerLength: v}})}
                  className="grid grid-cols-3 gap-4"
                >
                  <Label className="flex flex-col items-center gap-2 p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors text-center">
                    <RadioGroupItem value="short" /> 
                    <span>&lt; 5 min</span>
                  </Label>
                  <Label className="flex flex-col items-center gap-2 p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors text-center">
                    <RadioGroupItem value="medium" /> 
                    <span>5-15 min</span>
                  </Label>
                  <Label className="flex flex-col items-center gap-2 p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors text-center">
                    <RadioGroupItem value="long" /> 
                    <span>&gt; 15 min</span>
                  </Label>
                </RadioGroup>
              </div>
              <div className="space-y-3">
                <Label>What is your primary diet?</Label>
                <RadioGroup 
                  value={formData.water.dietType}
                  onValueChange={(v) => setFormData({...formData, water: {...formData.water, dietType: v}})}
                  className="space-y-3"
                >
                  <Label className="flex items-center gap-2 p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="omnivore" /> Omnivore (Eat Meat)
                  </Label>
                  <Label className="flex items-center gap-2 p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="vegetarian" /> Vegetarian
                  </Label>
                  <Label className="flex items-center gap-2 p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="vegan" /> Vegan
                  </Label>
                </RadioGroup>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>How often do you recycle?</Label>
                <RadioGroup 
                  value={formData.waste.recyclingHabits}
                  onValueChange={(v) => setFormData({...formData, waste: {...formData.waste, recyclingHabits: v}})}
                  className="space-y-3"
                >
                  <Label className="flex items-center gap-2 p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="never" /> Rarely or Never
                  </Label>
                  <Label className="flex items-center gap-2 p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="sometimes" /> Sometimes
                  </Label>
                  <Label className="flex items-center gap-2 p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="always" /> Always
                  </Label>
                </RadioGroup>
              </div>
              <div className="space-y-3">
                <Label>Do you compost food waste?</Label>
                <RadioGroup 
                  value={formData.waste.composting}
                  onValueChange={(v) => setFormData({...formData, waste: {...formData.waste, composting: v}})}
                  className="grid grid-cols-2 gap-4"
                >
                  <Label className="flex items-center gap-2 p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="yes" /> Yes
                  </Label>
                  <Label className="flex items-center gap-2 p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="no" /> No
                  </Label>
                </RadioGroup>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-12 pt-6 border-t">
            <Button variant="ghost" onClick={handleBack} disabled={currentStep === 0}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button onClick={handleNext} className="bg-primary hover:bg-primary/90 min-w-[120px]">
              {currentStep === STEPS.length - 1 ? (
                <>Complete <CheckCircle2 className="ml-2 h-4 w-4" /></>
              ) : (
                <>Next <ChevronRight className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
