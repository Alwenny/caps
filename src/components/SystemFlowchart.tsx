import React from "react";
import { 
  PlayCircle, Settings, AlertTriangle, RotateCw, Compass, Shield, 
  Sliders, Eye, Sun, Clock, Wifi, Activity, Terminal, ArrowRight, ArrowDown
} from "lucide-react";

export function SystemFlowchart() {
  return (
    <div id="flowchart-container" className="bg-[#070710]/95 border border-slate-800 rounded-lg p-5 sm:p-6 relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute inset-0 cyber-panel-grid opacity-5 pointer-events-none" />
      
      {/* Container Header */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-6">
        <Activity className="w-5 h-5 text-[#00f0ff]" />
        <div>
          <span className="font-mono text-xs text-slate-300 font-bold uppercase tracking-wider block">
            // FLUXOGRAMA LÓGICO DO FIRMWARE
          </span>
          <span className="text-[10px] text-slate-500 font-mono block">Sequência de processamento e malha de controle do ESP32 (Estático)</span>
        </div>
      </div>

      <div className="space-y-6">
        
        {/* Step 1: Boot e Setup */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-3 bg-slate-900/60 border border-slate-800 rounded-lg p-3.5 flex flex-col justify-between h-full">
            <div className="flex items-center gap-2 mb-2 text-slate-300 font-mono text-xs font-bold">
              <PlayCircle className="w-4 h-4 text-[#00f0ff]" />
              <span>01. BOOT</span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Alimentação de 5V inicializa o ESP32, carregando as variáveis de calibração de fábrica.
            </p>
          </div>

          <div className="flex justify-center md:col-span-1">
            <ArrowRight className="w-5 h-5 text-[#9d00ff] rotate-90 md:rotate-0" />
          </div>

          <div className="md:col-span-5 bg-[#0d47a1]/10 border border-blue-900/50 rounded-lg p-3.5 flex flex-col justify-between h-full">
            <div className="flex items-center gap-2 mb-2 text-blue-400 font-mono text-xs font-bold">
              <Settings className="w-4 h-4" />
              <span>02. SETUP INICIAL DO CONTEXTO</span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed mb-2">
              Associa os pinos ADC aos sensores, inicia o PWM do servo a 1500μs (posição neutra), configura o acelerômetro MPU6050 e conecta à rede local Wi-Fi.
            </p>
          </div>

          <div className="flex justify-center md:col-span-1">
            <ArrowRight className="w-5 h-5 text-[#9d00ff] rotate-90 md:rotate-0" />
          </div>

          <div className="md:col-span-2 bg-red-950/20 border border-red-900/50 rounded-lg p-3.5 flex flex-col justify-center h-full">
            <div className="flex items-center gap-2 mb-1.5 text-red-400 font-mono font-bold text-[10px]">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>HALT POR SEGURANÇA</span>
            </div>
            <p className="text-[10px] text-slate-400 font-sans leading-normal">
              Se houver falha ao inicializar o acelerômetro, o sistema trava o firmware de forma segura com alerta no LED físico.
            </p>
          </div>
        </div>

        {/* Connector row 1 */}
        <div className="flex justify-center py-1">
          <ArrowDown className="w-6 h-6 text-[#9d00ff]/60 animate-pulse" />
        </div>

        {/* Step 2: Loop Principal de Leituras */}
        <div className="bg-black/30 border border-slate-900 rounded-lg p-4 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-900 pb-2">
            <RotateCw className="w-4 h-4 text-[#9d00ff]" />
            <span className="font-mono text-xs font-bold text-slate-300">03. CICLO INFINITO: loop() - COLETA & FILTRAGEM DE RUÍDOS</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#070715] border border-slate-800 p-3 rounded space-y-1.5">
              <span className="text-[10px] font-mono text-blue-400 font-bold uppercase block">// LEITURA LDRs (ADC)</span>
              <p className="text-[11px] text-slate-400 leading-normal">
                Efetua amostragem analógica de milivolts nos pinos de leitura leste e oeste para calcular o diferencial luminoso.
              </p>
            </div>
            
            <div className="bg-[#070715] border border-slate-800 p-3 rounded space-y-1.5">
              <span className="text-[10px] font-mono text-teal-400 font-bold uppercase block">// ACELERÔMETRO MPU6050</span>
              <p className="text-[11px] text-slate-400 leading-normal">
                Mede a aceleração gravitacional e inercial e transmite os dados via protocolo I2C, garantindo que o painel conheça seu ângulo físico instantâneo.
              </p>
            </div>

            <div className="bg-[#070715] border border-slate-800 p-3 rounded space-y-1.5">
              <span className="text-[10px] font-mono text-yellow-400 font-bold uppercase block">// FILTRO DE MÉDIA MÓVEL</span>
              <p className="text-[11px] text-slate-400 leading-normal">
                Atenua picos de ruídos causados por sombras de nuvens, calculando uma média móvel circular para suavizar as saídas.
              </p>
            </div>
          </div>
        </div>

        {/* Connector row 2 */}
        <div className="flex justify-center py-1">
          <ArrowDown className="w-6 h-6 text-[#9d00ff]/60" />
        </div>

        {/* Step 3: Malha PID e Decisões de Controle */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          <div className="md:col-span-5 bg-amber-950/10 border border-amber-900/50 rounded-lg p-3.5 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold">
              <Clock className="w-4 h-4" />
              <span>04. CONTROLE TEMPORAL DA ALÇA</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              O firmware executa verificações a cada pulso de 10 milissegundos (intervalo regulamentado por software), poupando carga da CPU e tráfego desnecessário de telemetria na rede.
            </p>
          </div>

          <div className="flex justify-center md:col-span-2">
            <ArrowRight className="w-5 h-5 text-[#9d00ff] rotate-90 md:rotate-0" />
          </div>

          <div className="md:col-span-5 bg-[#d84315]/10 border border-orange-900/50 rounded-lg p-3.5 space-y-2">
            <div className="flex items-center gap-2 text-orange-400 font-mono text-xs font-bold">
              <Activity className="w-4 h-4" />
              <span>05. CONTROLE PID</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Calcula o erro diferencial de luz entre Leste e Oeste. Injeta na fórmula de correção (Proporcional, Integral, Derivativa) e utiliza técnica de multiamostragem para evitar micro-oscilações repetitivas ou desgastes mecânicos.
            </p>
          </div>
        </div>

        {/* Connector row 3 */}
        <div className="flex justify-center py-1">
          <ArrowDown className="w-6 h-6 text-[#9d00ff]/60 animate-pulse" />
        </div>

        {/* Step 4: Atuação Física e Telemetria */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="bg-blue-950/20 border border-blue-900/50 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-bold">
              <Sliders className="w-4 h-4" />
              <span>06. ATUAÇÃO DO SERVOMOTOR (PWM)</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Converte as correções matemáticas do filtro PID em comprimento de pulso PWM estável de 50Hz, movendo o servomotor MG995 acoplado para reposicionar as placas faceando o Sol.
            </p>
          </div>

          <div className="bg-orange-950/10 border border-orange-950/50 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-orange-400 font-mono text-xs font-bold">
              <Wifi className="w-4 h-4" />
              <span>07. POST DE ENVIOS DE REDE (WIFI)</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Empacota as métricas de geração solar lidas, a indicação angular e as tensões médias em strings estruturadas em JSON. Despacha via HTTP POST a cada 2000 milissegundos de forma assíncrona para o servidor local Python.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3.5 border-t border-slate-900/80 flex items-center justify-center gap-1.5 text-[9.5px] text-slate-500 font-mono uppercase text-center">
        <span className="w-1.5 h-1.5 bg-[#00f0ff] rounded-full" />
        Processo automatizado e autônomo de calibração eletrônica direta
      </div>
    </div>
  );
}
