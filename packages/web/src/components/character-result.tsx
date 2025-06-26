import { useState, useEffect } from 'react';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import { OrnateButton, OrnateFrame } from '@/components/ui-elements';

export default function CharacterResult({
  onReset,
  imageUrl,
}: {
  onReset: () => void;
  imageUrl: string | null;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (imageUrl) {
      setIsLoading(false);
    }
  }, [imageUrl]);

  const handleDownload = async () => {
    if (!imageUrl) return;
    
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `lorespark-portrait-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <OrnateFrame className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h1
          className="text-4xl font-bold text-[#ffc866] mb-2"
          style={{ textShadow: '0 0 5px rgba(255, 200, 102, 0.5)' }}
        >
          Your Generated Portrait
        </h1>
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
            imageUrl && (
              <img
                src={imageUrl}
                alt="Generated portrait"
                className="w-full h-[400px] object-cover rounded-lg"
              />
            )
          )}
        </div>
        <div className="flex-1 space-y-4">
          <div className="bg-[#030a13] border border-[#1a3853] p-4 rounded-lg">
            <h2 className="text-[#ffc866] font-bold mb-2">Your Portrait</h2>
            <p className="text-[#4cc1e6]">
              Your portrait has been generated! You can download it or share it
              with others.
            </p>
          </div>
          <div className="flex gap-4">
            <OrnateButton onClick={onReset}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </OrnateButton>
            <OrnateButton onClick={handleDownload} disabled={!imageUrl}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </OrnateButton>
            <OrnateButton>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </OrnateButton>
          </div>
        </div>
      </div>
    </OrnateFrame>
  );
}
