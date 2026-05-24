import React from "react";
import { 
  Cpu, Wifi, HardDrive, Phone, Radio, Sun, ArrowRight, ArrowDown, HelpCircle, Server, Eye, Gauge
} from "lucide-react";

export function CommunicationArchitecture() {
  return (
    <div id="comms-architecture-panel" className="bg-[#070710]/95 border border-slate-800 rounded-lg p-5 sm:p-6 relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute inset-0 cyber-panel-grid opacity-5 pointer-events-none" />

      {/* Header Container */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-6">
        <Wifi className="w-5 h-5 text-[#9d00ff] animate-pulse" />
        <div>
          <span className="font-mono text-xs text-slate-300 font-bold uppercase tracking-wider block">
            // ARQUITETURA DE COMUNICAÇÃO DE DADOS
          </span>
          <span className="text-[10px] text-slate-500 font-mono block">Rotas de transmissão sem fio e processamento local — Sem interações complexas</span>
        </div>
      </div>

      <div className="space-y-6">

        {/* 3-Section Visual Blocks representing the flow */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* BLOCK 1: ESP32 PROTOTYPE */}
          <div className="border border-purple-900/40 bg-black/45 rounded-xl p-4 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 border-b border-purple-950 pb-2 mb-3">
                <Cpu className="w-4 h-4 text-purple-400" />
                <span className="font-mono text-xs text-purple-200 font-bold uppercase tracking-wide">
                  PRÓTOTIPO ESP32 (LOCAL)
                </span>
              </div>
              
              <div className="space-y-3">
                {/* LDR sensors info */}
                <div className="bg-[#05050e] border border-slate-900 rounded p-2.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-blue-400 font-bold">
                    <Eye className="w-3.5 h-3.5" />
                    <span>SENSORES LUMINOSOS (LDRs)</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-sans leading-normal">
                    LDR 1 (Leste - Pino 36) e LDR 2 (Oeste - Pino 39) medem fluxo luminoso em milivolts diretos para focar o Sol.
                  </p>
                </div>

                {/* Voltage & Current Sensors */}
                <div className="bg-[#05050e] border border-slate-900 rounded p-2.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-teal-400 font-bold">
                    <Gauge className="w-3.5 h-3.5" />
                    <span>SENSORIAL PAINEL SOLAR.</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-sans leading-normal">
                    O ADC (Pino 34) afere a tensão gerada utilizando um divisor de tensão, que é essencial para reduzir a voltagem da placa a níveis suportados pelo ESP32. A corrente é calculada com base nos resistores desse divisor, permitindo coletar de forma experimental os miliwatts gerados.
                  </p>
                </div>

                {/* Central CPU */}
                <div className="bg-purple-950/15 border border-purple-900/30 rounded p-2.5 space-y-1.5">
                  <span className="text-[10px] font-mono text-[#a29bfe] font-bold block uppercase">// PROCESSAMENTO LOCAL</span>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    O microcontrolador ESP32 calcula as rotinas matemáticas PID, suaviza as leituras por média móvel circular e aciona mecanicamente o Servomotor MG995 (Pino 25).
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center pt-2">
              <span className="text-[9px] font-mono text-[#00f0ff] uppercase bg-[#00f0ff]/5 border border-[#00f0ff]/20 py-0.5 px-2 rounded">
                TAXA: 1 POST A CADA 2 SEC
              </span>
            </div>
          </div>

          {/* BLOCK 2: WI-FI ROUTING */}
          <div className="flex flex-col justify-center items-center py-4 lg:py-0 relative">
            <div className="hidden lg:block absolute -left-6 text-[#9d00ff]/60">
              <ArrowRight className="w-7 h-7" />
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 text-center space-y-3.5 relative w-full max-w-sm">
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-slate-950 border border-slate-800 rounded font-mono text-[9px] text-purple-400 font-bold">
                ENLACE SEM FIO
              </span>

              <div className="w-12 h-12 bg-[#a29bfe]/10 rounded-full flex items-center justify-center mx-auto border border-[#a29bfe]/30">
                <Radio className="w-6 h-6 text-[#a29bfe] animate-pulse" />
              </div>

              <div>
                <h4 className="font-mono text-xs font-bold text-slate-200">Hotspot Wi-Fi Móvel</h4>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">Operando em banda local de 2.4GHz</p>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed font-sans px-2">
                Conecta de forma autônoma o microcontrolador ESP32 e o computador local em um mesmo roteamento de dados fechado, eliminando dependência de cabos e Wi-Fi institucional instável.
              </p>

              <div className="bg-black/50 p-2.5 rounded border border-slate-900 text-[10.5px] text-slate-400 font-mono">
                <span className="text-emerald-400">Protocolo:</span> POST HTTP (REST)
              </div>
            </div>

            <div className="hidden lg:block absolute -right-6 text-[#6c5ce7]/60">
              <ArrowRight className="w-7 h-7" />
            </div>
          </div>

          {/* BLOCK 3: LOCAL HOST & SERVER */}
          <div className="border border-[#6c5ce7]/40 bg-black/45 rounded-xl p-4 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 border-b border-[#6c5ce7]/30 pb-2 mb-3">
                <Server className="w-4 h-4 text-[#a29bfe]" />
                <span className="font-mono text-xs text-slate-200 font-bold uppercase tracking-wide">
                  COMPUTADOR SERVER (LOCAL)
                </span>
              </div>

              <div className="space-y-3">
                {/* API Python Host */}
                <div className="bg-[#05050e] border border-slate-900 rounded p-2.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-purple-300 font-bold">
                    <Server className="w-3.5 h-3.5" />
                    <span>SERVIDOR PYTHON LOCAL (PORT 5000)</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-sans leading-normal">
                    Servidor leve Python atuando como Host REST. Escuta e decodifica requisições no endpoint /dados, armazenando-as num banco de dados SQLite.
                  </p>
                </div>

                {/* Dashboard visualization component */}
                <div className="bg-[#05050e] border border-slate-900 rounded p-2.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-blue-400 font-bold">
                    <HardDrive className="w-3.5 h-3.5" />
                    <span>DASHBOARD DE TELEMETRIA</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-sans leading-normal">
                    Consolida métricas e renderiza gráficos históricos para acompanhamento prático em bancada.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center pt-2">
              <span className="text-[9.5px] font-mono text-[#9d00ff] bg-[#9d00ff]/5 border border-[#9d00ff]/20 py-0.5 px-2 rounded">
                SISTEMA TOTALMENTE OFFLINE
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
