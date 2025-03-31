import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { OrnateButton, OrnateFrame } from "@/components/ui-elements";

const questions = [
  {
    id: "name",
    title: "What name do ye go by, traveler?",
    component: ({
      value,
      onChange,
    }: {
      value: string;
      onChange: (value: string) => void;
    }) => (
      <div className="space-y-2">
        <Label htmlFor="name" className="text-[#4cc1e6] text-lg">
          Your Name
        </Label>
        <Input
          id="name"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-[#030a13] border-[#1a3853] text-[#4cc1e6] rounded-none"
          placeholder="Enter thy name..."
        />
      </div>
    ),
  },
  {
    id: "race",
    title: "And what manner of folk do ye hail from?",
    component: ({
      value,
      onChange,
    }: {
      value: string;
      onChange: (value: string) => void;
    }) => (
      <div className="space-y-4">
        <Label className="text-[#4cc1e6] text-lg">Your Heritage</Label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="bg-[#030a13] border-[#1a3853] text-[#4cc1e6] rounded-none">
            <SelectValue placeholder="Select your lineage" />
          </SelectTrigger>
          <SelectContent className="bg-[#030a13] border-[#1a3853] text-[#4cc1e6] rounded-none">
            <SelectItem value="human">Human</SelectItem>
            <SelectItem value="elf">Elf</SelectItem>
            <SelectItem value="dwarf">Dwarf</SelectItem>
            <SelectItem value="orc">Orc</SelectItem>
            <SelectItem value="undead">Undead</SelectItem>
            <SelectItem value="troll">Troll</SelectItem>
          </SelectContent>
        </Select>
      </div>
    ),
  },
  {
    id: "class",
    title: "What trade or craft have ye mastered?",
    component: ({
      value,
      onChange,
    }: {
      value: string;
      onChange: (value: string) => void;
    }) => (
      <div className="space-y-4">
        <Label className="text-[#4cc1e6] text-lg">Your Calling</Label>
        <RadioGroup
          value={value}
          onValueChange={onChange}
          className="grid grid-cols-2 gap-4"
        >
          {["warrior", "mage", "hunter", "priest", "rogue", "paladin"].map(
            (classType) => (
              <div key={classType} className="flex items-start space-x-2">
                <RadioGroupItem
                  value={classType}
                  id={classType}
                  className="border-[#1a3853] text-[#4cc1e6]"
                />
                <Label
                  htmlFor={classType}
                  className="text-[#4cc1e6] font-medium capitalize cursor-pointer"
                >
                  {classType}
                </Label>
              </div>
            ),
          )}
        </RadioGroup>
      </div>
    ),
  },
  {
    id: "appearance",
    title: "Describe your visage, so I might know ye if we cross paths again",
    component: ({
      value,
      onChange,
    }: {
      value: string;
      onChange: (value: string) => void;
    }) => (
      <div className="space-y-2">
        <Label htmlFor="appearance" className="text-[#4cc1e6] text-lg">
          Your Appearance
        </Label>
        <Textarea
          id="appearance"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-[#030a13] border-[#1a3853] text-[#4cc1e6] min-h-[120px] rounded-none"
          placeholder="Tell of thy features, garments, and distinguishing marks..."
        />
      </div>
    ),
  },
  {
    id: "age",
    title: "How many winters have ye seen, traveler?",
    component: ({
      value,
      onChange,
    }: {
      value: string;
      onChange: (value: string) => void;
    }) => (
      <div className="space-y-4">
        <Label className="text-[#4cc1e6] text-lg">
          Your Age: {value} years
        </Label>
        <Slider
          defaultValue={[Number.parseInt(value) || 30]}
          max={1000}
          min={18}
          step={1}
          onValueChange={(vals) => onChange(vals[0].toString())}
          className="py-4"
        />
      </div>
    ),
  },
  {
    id: "background",
    title: "What tales do ye bring from your homeland?",
    component: ({
      value,
      onChange,
    }: {
      value: string;
      onChange: (value: string) => void;
    }) => (
      <div className="space-y-2">
        <Label htmlFor="background" className="text-[#4cc1e6] text-lg">
          Your Story
        </Label>
        <Textarea
          id="background"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-[#030a13] border-[#1a3853] text-[#4cc1e6] min-h-[150px] rounded-none"
          placeholder="Share thy origins, adventures, and the path that led ye here..."
        />
      </div>
    ),
  },
];

export default function CharacterCreator({
  onComplete,
}: {
  onComplete: (data: any) => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({
    name: "",
    race: "",
    class: "",
    appearance: "",
    age: "30",
    background: "",
  });

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    // In a real app, you would send this data to an image generation API
    // For now, we'll just pass the data back
    onComplete(formData);
  };

  const currentQuestion = questions[currentStep];
  const Component = currentQuestion.component;
  const isLastStep = currentStep === questions.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <OrnateFrame className="w-full max-w-3xl mx-auto">
      <div className="mb-6">
        <h2
          className="text-3xl font-bold text-[#ffc866] mb-2"
          style={{ textShadow: "0 0 5px rgba(255, 200, 102, 0.5)" }}
        >
          {currentQuestion.title}
        </h2>
        <div className="w-full bg-[#1a3853]/50 h-2 rounded-none overflow-hidden">
          <div
            className="bg-[#4cc1e6] h-full transition-all duration-300 ease-in-out"
            style={{
              width: `${((currentStep + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="mb-8">
        <Component
          value={formData[currentQuestion.id] || ""}
          onChange={(value) => handleChange(currentQuestion.id, value)}
        />
      </div>

      <div className="flex justify-between">
        <OrnateButton
          onClick={handleBack}
          disabled={isFirstStep}
          className={isFirstStep ? "opacity-50" : ""}
        >
          <ArrowLeft className="mr-2 h-4 w-4 inline" /> Back
        </OrnateButton>

        <OrnateButton onClick={handleNext}>
          {isLastStep ? (
            <>
              <Sparkles className="mr-2 h-4 w-4 inline" /> Forge Your Legend
            </>
          ) : (
            <>
              Continue <ArrowRight className="ml-2 h-4 w-4 inline" />
            </>
          )}
        </OrnateButton>
      </div>
    </OrnateFrame>
  );
}
