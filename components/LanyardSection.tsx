"use client";

import { useState, useRef, useCallback, Suspense } from "react";
import Lanyard from "@/components/ui/lanyard";
import CardTemplate, { CardTemplateRef, CardVariant } from "@/components/card-template";

export default function LanyardSection() {
  const [inputValue, setInputValue] = useState("");
  const [cardVariant, setCardVariant] = useState<CardVariant>("dark");
  const [cardTextureUrl, setCardTextureUrl] = useState<string | undefined>(undefined);
  const cardTemplateRef = useRef<CardTemplateRef>(null);

  const handleTextureReady = useCallback((dataUrl: string) => {
    setCardTextureUrl(dataUrl);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <CardTemplate
        ref={cardTemplateRef}
        userName={inputValue}
        variant={cardVariant}
        onTextureReady={handleTextureReady}
      />
      
      {cardTextureUrl ? (
        <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center"><div className="w-8 h-8 border-4 border-purple-500 border-t-transparent animate-spin rounded-full"></div><span className="text-white ml-2">Loading 3D...</span></div>}>
          <Lanyard
            containerClassName="absolute inset-0 z-10 w-full h-full"
            cardTextureUrl={cardTextureUrl}
          />
        </Suspense>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center"><span className="text-white">Generando textura de tarjeta...</span></div>
      )}

      <div className="absolute bottom-8 right-8 z-30 bg-black/60 p-5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl">
        <label className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400 font-black mb-3 uppercase tracking-wider text-sm">
          Personaliza tu Acceso
        </label>
        <input 
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value.substring(0, 16))}
          placeholder="Escribe tu nombre..."
          className="bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 w-full font-mono transition-all"
        />
        <div className="flex gap-2 mt-4">
            <button 
                onClick={() => setCardVariant('dark')} 
                className={`flex-1 px-3 py-2 text-xs font-bold rounded-lg border transition-all ${cardVariant === 'dark' ? 'border-purple-500 bg-purple-500/20 text-white' : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'}`}>
                Modo Oscuro
            </button>
            <button 
                onClick={() => setCardVariant('light')} 
                className={`flex-1 px-3 py-2 text-xs font-bold rounded-lg border transition-all ${cardVariant === 'light' ? 'border-orange-500 bg-orange-500/20 text-white' : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'}`}>
                Modo Claro
            </button>
        </div>
      </div>
    </div>
  )
}
