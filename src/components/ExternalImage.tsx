import React, { useState } from "react";
import { Image, ExternalLink, RefreshCw, ZoomIn, Info } from "lucide-react";

interface ExternalImageProps {
  imageUrl: string;
  alt: string;
  landingUrl: string;
  className?: string;
  title?: string;
}

export function ExternalImage({ imageUrl, alt, landingUrl, className = "", title }: ExternalImageProps) {
  const [loadFailed, setLoadFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [retryKey, setRetryKey] = useState(0);

  const handleRetry = () => {
    setIsLoading(true);
    setLoadFailed(false);
    setRetryKey(prev => prev + 1);
  };

  return (
    <div className={`relative bg-slate-950/80 border border-slate-800 rounded-lg overflow-hidden group ${className}`}>
      {/* Grid overlay for cyberpunk feel */}
      <div className="absolute inset-0 cyber-panel-grid opacity-10 pointer-events-none" />
      
      {title && (
        <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
            <span className="font-mono text-xs text-slate-300 font-bold uppercase tracking-wider">
              {title}
            </span>
          </div>
          <span className="text-[9px] font-mono text-[#00f0ff] animate-pulse bg-[#00f0ff]/10 px-2 py-0.5 rounded border border-[#00f0ff]/20">
            DIRECT_LINK
          </span>
        </div>
      )}

      <div className="p-4 bg-slate-900/10 min-h-[220px] flex items-center justify-center relative">
        {isLoading && !loadFailed && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/40 backdrop-blur-sm z-10 gap-3">
            <RefreshCw className="w-6 h-6 text-[#00f0ff] animate-spin" />
            <span className="text-[10px] font-mono text-slate-400">Carregando imagem...</span>
          </div>
        )}

        {!loadFailed ? (
          <div className="relative w-full overflow-hidden rounded bg-black/20">
            <img 
              key={retryKey}
              src={imageUrl} 
              alt={alt}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setLoadFailed(true);
              }}
              className="w-full h-auto max-h-[640px] md:max-h-[750px] object-contain block mx-auto rounded transition-all duration-300 group-hover:scale-[1.01]"
              referrerPolicy="no-referrer"
            />
          </div>
        ) : (
          <div className="p-8 flex flex-col items-center justify-center text-center space-y-4 min-h-[280px] w-full z-10">
            <div className="w-12 h-12 rounded-full bg-[#9d00ff]/10 border border-[#9d00ff]/30 flex items-center justify-center text-[#9d00ff]">
              <Image className="w-5 h-5" />
            </div>
            <div>
              <p className="font-mono text-xs text-slate-300 font-bold uppercase">{alt}</p>
              <p className="text-xs text-slate-400 max-w-md mt-2 leading-relaxed">
                Falha ao carregar visualização direta no container local (as políticas de CORS do host ou bloqueadores de rastreio podem restringir o carregamento da imagem direta).
              </p>
            </div>
            <button 
              onClick={handleRetry}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Tentar Novamente
            </button>
          </div>
        )}
      </div>

      {/* Control / view bar */}
      <div className="bg-[#0b0c15] border-t border-slate-800 px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-400 text-[10px]">
          <Info className="w-3.5 h-3.5 text-slate-500" />
          <span>
            Hospedado via: <strong className="text-slate-300">ImgBB Direct Storage</strong>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a 
            href={imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white rounded flex items-center gap-1.5 hover:bg-slate-850 cursor-pointer text-[11px] transition-all"
          >
            <ZoomIn className="w-3 h-3" />
            Link Direto
          </a>
          <a 
            href={landingUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-[#00f0ff]/10 border border-[#00f0ff]/40 text-[#00f0ff] hover:text-white rounded flex items-center gap-1.5 hover:bg-[#00f0ff]/20 transition-all font-bold text-[11px]"
          >
            Página do ImgBB <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
