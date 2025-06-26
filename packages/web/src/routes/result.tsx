import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fal } from "@fal-ai/client";
import CharacterResult from "@/components/character-result";

export const Route = createFileRoute("/result")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      prompt: (search.prompt as string) || '',
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { prompt } = Route.useSearch();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    console.log("prompt", prompt);
    if (prompt) {
      // Call FAL API to generate the image
      const generateImage = async () => {
        try {
          console.log("Starting fal.ai request with prompt:", prompt);
          
          const result = await fal.subscribe("fal-ai/flux-pro/v1.1-ultra", {
            input: {
              prompt: prompt,
            },
            logs: true,
            onQueueUpdate: (update) => {
              console.log("Queue update:", update);
              if (update.status === "IN_PROGRESS") {
                update.logs.map((log) => log.message).forEach(console.log);
                console.log("IN_PROGRESS");
              }
            },
          });

          console.log("FAL result:", result);
          
          if (result.data && result.data.images && result.data.images.length > 0) {
            const imageUrl = result.data.images[0].url;
            console.log("Setting image URL:", imageUrl);
            setImageUrl(imageUrl);
          }
        } catch (error) {
          console.error("FAL API error:", error);
        }
      };

      generateImage();
    }
  }, [prompt]);

  return (
    <div className="container mx-auto py-8">
      <CharacterResult
        onReset={() => window.history.back()}
        imageUrl={imageUrl}
      />
    </div>
  );
}
