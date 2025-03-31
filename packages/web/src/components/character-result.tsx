import { useState, useEffect } from "react";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import { OrnateButton, OrnateFrame } from "@/components/ui-elements";

export default function CharacterResult({
  characterData,
  onReset,
}: {
  characterData: any;
  onReset: () => void;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate image generation loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Generate a prompt for the AI based on character data
  const generatePrompt = () => {
    return `A fantasy ${characterData.race} ${characterData.class}, ${characterData.appearance}, age ${characterData.age}`;
  };

  return (
    <OrnateFrame className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h1
          className="text-4xl font-bold text-[#ffc866] mb-2"
          style={{ textShadow: "0 0 5px rgba(255, 200, 102, 0.5)" }}
        >
          {characterData.name}
        </h1>
        <p className="text-[#4cc1e6] text-lg capitalize">
          {characterData.race} {characterData.class}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex-1 flex justify-center">
          {isLoading ? (
            <div className="w-full h-[400px] bg-[#030a13] border-2 border-[#1a3853] flex items-center justify-center">
              <div className="text-[#4cc1e6] text-xl animate-pulse">
                The bard is composing your tale...
              </div>
            </div>
          ) : (
            <div className="relative">
              <div
                className="border-2 border-[#1a3853]"
                style={{ boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.8)" }}
              >
                <img
                  src="/placeholder.svg?height=600&width=400"
                  alt={characterData.name}
                  className="max-h-[400px] object-cover"
                />
              </div>
              <div className="absolute bottom-4 right-4 flex gap-2">
                <OrnateButton className="p-1">
                  <Download className="h-4 w-4" />
                </OrnateButton>
                <OrnateButton className="p-1">
                  <Share2 className="h-4 w-4" />
                </OrnateButton>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 text-[#4cc1e6] space-y-4">
          <OrnateFrame className="p-2">
            <h3
              className="text-[#ffc866] text-xl font-semibold mb-1"
              style={{ textShadow: "0 0 5px rgba(255, 200, 102, 0.5)" }}
            >
              Legend Details
            </h3>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="text-[#4cc1e6] font-medium">Heritage:</div>
              <div className="capitalize">{characterData.race}</div>
              <div className="text-[#4cc1e6] font-medium">Calling:</div>
              <div className="capitalize">{characterData.class}</div>
              <div className="text-[#4cc1e6] font-medium">Winters Passed:</div>
              <div>{characterData.age} years</div>
            </div>
          </OrnateFrame>

          <OrnateFrame className="p-2">
            <h3
              className="text-[#ffc866] text-xl font-semibold mb-1"
              style={{ textShadow: "0 0 5px rgba(255, 200, 102, 0.5)" }}
            >
              Visage
            </h3>
            <p className="text-[#4cc1e6]">
              {characterData.appearance ||
                "A mysterious figure shrouded in shadow."}
            </p>
          </OrnateFrame>

          <OrnateFrame className="p-2">
            <h3
              className="text-[#ffc866] text-xl font-semibold mb-1"
              style={{ textShadow: "0 0 5px rgba(255, 200, 102, 0.5)" }}
            >
              Tale
            </h3>
            <p className="text-[#4cc1e6]">
              {characterData.background ||
                "Their story remains untold, waiting to be written."}
            </p>
          </OrnateFrame>

          {!isLoading && (
            <OrnateFrame className="p-2">
              <h3
                className="text-[#ffc866] text-xl font-semibold mb-1"
                style={{ textShadow: "0 0 5px rgba(255, 200, 102, 0.5)" }}
              >
                Bardic Inspiration
              </h3>
              <p className="text-sm text-[#4cc1e6]/70 bg-[#030a13]/80 p-2 border border-[#1a3853]">
                {generatePrompt()}
              </p>
            </OrnateFrame>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <OrnateButton onClick={onReset}>
          <ArrowLeft className="mr-2 h-4 w-4 inline" /> Return to the Tavern
        </OrnateButton>
      </div>
    </OrnateFrame>
  );
}
