import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import CharacterCreator from "@/components/character-creator";
import CharacterResult from "@/components/character-result";
import { ArrowRight, FileText, Users, Camera } from "lucide-react";
import {
  OrnateButton,
  OrnateCard,
  OrnateFrame,
} from "@/components/ui-elements";
import { useQuery } from "@tanstack/react-query";

import { fetchHomePagePortraits } from "@/queries/portraits";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [showCreator, setShowCreator] = useState(false);
  const [characterData, setCharacterData] = useState<any>(null);
  const [prompt, setPrompt] = useState("");

  const { isPending, error, data } = useQuery({
    queryKey: ["portraits"],
    queryFn: fetchHomePagePortraits,
  });

  const handleCharacterCreated = (data: any) => {
    setCharacterData(data);
    setShowCreator(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#030a13] relative">
      {/* Background border */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-[#3a5a82] opacity-80"></div>
        <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-[#3a5a82] opacity-80"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-[#3a5a82] opacity-80"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-[#3a5a82] opacity-80"></div>
        <div className="absolute inset-x-0 top-0 h-2 border-t-2 border-[#1a3853] opacity-80"></div>
        <div className="absolute inset-y-0 left-0 w-2 border-l-2 border-[#1a3853] opacity-80"></div>
        <div className="absolute inset-y-0 right-0 w-2 border-r-2 border-[#1a3853] opacity-80"></div>
        <div className="absolute inset-x-0 bottom-0 h-2 border-b-2 border-[#1a3853] opacity-80"></div>
      </div>

      {/* Navigation */}
      <header className="border-b border-[#1a3853] bg-[#030a13] py-4 relative z-10">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="text-[#ffc866] text-3xl font-bold flex items-center">
              <svg
                className="w-8 h-8 mr-2 text-[#ffc866]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12,0L7.8,8.4L0,8.4L6,13.6L3.6,22.8L12,18L20.4,22.8L18,13.6L24,8.4L16.2,8.4L12,0Z" />
              </svg>
              LoreSpark
            </div>
          </div>
          <div className="flex items-center gap-4">
            <OrnateButton>Sign In</OrnateButton>
            <OrnateButton>Sign Up</OrnateButton>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 relative">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center bg-fixed opacity-10"></div>
          <div className="absolute inset-0 bg-[#030a13]/90"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12 relative z-10">
          {!showCreator && !characterData ? (
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h1
                  className="text-5xl md:text-7xl font-bold text-[#ffc866] tracking-wide"
                  style={{
                    textShadow:
                      "0 0 10px rgba(255, 200, 102, 0.5), 0 0 20px rgba(255, 200, 102, 0.3)",
                    letterSpacing: "0.05em",
                  }}
                >
                  Forge your legendary tale
                </h1>
                <p className="text-xl text-[#4cc1e6]">
                  Where every character has a story waiting to be told
                </p>
              </div>

              {/* Main input */}
              <div className="space-y-4">
                <OrnateFrame>
                  <Textarea
                    placeholder="*The old tavern keeper leans over the counter, polishing a mug* 'Well now, stranger, I haven't seen your face around these parts. Tell me your tale - who are ye and what brings ye to our realm?'"
                    className="min-h-[120px] bg-transparent border-none text-[#4cc1e6] placeholder:text-[#4cc1e6]/70 resize-none"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </OrnateFrame>
                <div className="flex justify-end">
                  <OrnateButton
                    disabled={!prompt.trim()}
                    onClick={() => {
                      setShowCreator(true);
                    }}
                  >
                    Spark Your Legend{" "}
                    <ArrowRight className="ml-2 h-4 w-4 inline" />
                  </OrnateButton>
                </div>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <OrnateCard onClick={() => setShowCreator(true)}>
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 rounded-full border border-[#1a3853] text-[#4cc1e6] group-hover:text-[#6cd1f6]">
                      <FileText className="h-6 w-6" />
                    </div>
                    <h3
                      className="font-bold text-[#ffc866] text-xl"
                      style={{ textShadow: "0 0 5px rgba(255, 200, 102, 0.5)" }}
                    >
                      The Questionnaire
                    </h3>
                    <p className="text-[#4cc1e6] text-sm">
                      Answer the tavern keeper's questions to reveal your
                      destiny
                    </p>
                  </div>
                </OrnateCard>

                <OrnateCard>
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 rounded-full border border-[#1a3853] text-[#4cc1e6] group-hover:text-[#6cd1f6]">
                      <Users className="h-6 w-6" />
                    </div>
                    <h3
                      className="font-bold text-[#ffc866] text-xl"
                      style={{ textShadow: "0 0 5px rgba(255, 200, 102, 0.5)" }}
                    >
                      The Tavern
                    </h3>
                    <p className="text-[#4cc1e6] text-sm">
                      Meet other adventurers from across the realms
                    </p>
                  </div>
                </OrnateCard>

                <OrnateCard>
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 rounded-full border border-[#1a3853] text-[#4cc1e6] group-hover:text-[#6cd1f6]">
                      <Camera className="h-6 w-6" />
                    </div>
                    <h3
                      className="font-bold text-[#ffc866] text-xl"
                      style={{ textShadow: "0 0 5px rgba(255, 200, 102, 0.5)" }}
                    >
                      The Portrait
                    </h3>
                    <p className="text-[#4cc1e6] text-sm">
                      Bring an existing image to be transformed by our court
                      painter
                    </p>
                  </div>
                </OrnateCard>
              </div>

              {/* Community section */}
              {isPending ? (
                <div className="pt-8">
                  <div className="flex items-center justify-center">
                    <div className="text-[#4cc1e6] text-xl animate-pulse">
                      The bard is composing your tale...
                    </div>
                  </div>
                </div>
              ) : (
                <div className="pt-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2
                      className="text-3xl font-bold text-[#ffc866]"
                      style={{ textShadow: "0 0 5px rgba(255, 200, 102, 0.5)" }}
                    >
                      Tales from the Realm
                    </h2>

                    <span
                      className="text-[#ffc866] hover:text-[#ffd686] text-sm flex items-center font-bold"
                      style={{ textShadow: "0 0 5px rgba(255, 200, 102, 0.3)" }}
                    >
                      View All <ArrowRight className="ml-1 h-3 w-3" />
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {data.map((char, i) => (
                      <OrnateCard key={i}>
                        <div>
                          <div className="aspect-square relative">
                            <img
                              src={char.imageUrl}
                              alt={char.name}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="p-3">
                            <h3 className="font-medium text-[#ffc866] truncate">
                              {char.name}
                            </h3>
                            <p className="text-xs text-[#4cc1e6]/70">
                              Created by {char.creator}
                            </p>
                          </div>
                        </div>
                      </OrnateCard>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : showCreator ? (
            <CharacterCreator onComplete={handleCharacterCreated} />
          ) : (
            <CharacterResult
              characterData={characterData}
              onReset={() => {
                setCharacterData(null);
                setShowCreator(false);
                setPrompt("");
              }}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1a3853] bg-[#030a13] py-6 relative z-10">
        <div className="container mx-auto px-4 text-center text-[#4cc1e6]/50 text-sm">
          <p>
            © 2025 LoreSpark. All rights reserved. Tales may vary by realm.
          </p>
        </div>
      </footer>
    </div>
  );
}
