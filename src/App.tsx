import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sun, 
  Cpu, 
  Database, 
  HelpCircle, 
  Layers, 
  BookOpen, 
  TrendingUp, 
  Video, 
  Award, 
  Calendar, 
  Wifi, 
  Clock, 
  ExternalLink,
  Github,
  Zap,
  RefreshCw,
  Sliders,
  Play
} from "lucide-react";
import { TEAM_MEMBERS, REQUIRED_VIDEOS, DEVELOPMENT_STAGES } from "./data";
import { ExternalImage } from "./components/ExternalImage";
import { SystemFlowchart } from "./components/SystemFlowchart";
import { CommunicationArchitecture } from "./components/CommunicationArchitecture";

export default function App() {
  const [currentSection, setCurrentSection] = useState<string>("home");
  const [systemTime, setSystemTime] = useState<string>("15:38:19");
  const [systemUptime, setSystemUptime] = useState<number>(0);
  const [playedVideos, setPlayedVideos] = useState<Record<string, boolean>>({});

  // Simple interval to increment uptime and simulate live terminal stats
  useEffect(() => {
    const timeInterval = setInterval(() => {
      const now = new Date();
      setSystemTime(now.toLocaleTimeString());
    }, 1000);

    const uptimeInterval = setInterval(() => {
      setSystemUptime(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(uptimeInterval);
    };
  }, []);

  const sections = [
    { id: "home", label: "01. Página Inicial", icon: Sun },
    { id: "problem", label: "02. Descrição do Problema", icon: HelpCircle },
    { id: "architecture", label: "03. Arquitetura do Sistema", icon: Layers },
    { id: "technologies", label: "04. Tecnologias Utilizadas", icon: Cpu },
    { id: "development", label: "05. Desenvolvimento do Projeto", icon: BookOpen },
    { id: "results", label: "06. Resultados Obtidos", icon: TrendingUp },
    { id: "media", label: "07. Vídeos Obrigatórios", icon: Video },
    { id: "conclusion", label: "08. Conclusão", icon: Award }
  ];

  return (
    <div id="caps-root" className="min-h-screen bg-[#030307] text-[#e2e8f0] relative scanline-overlay flex flex-col animate-fade-in">
      {/* Decorative Cyber Grid Backgrounds */}
      <div className="absolute inset-0 cyber-panel-grid opacity-10 pointer-events-none" />
      <div className="absolute inset-0 cyber-panel-grid-dense opacity-15 pointer-events-none" />

      {/* HEADER BAR */}
      <header id="header-bar" className="border-b border-[#00f0ff]/30 bg-[#04040a]/95 backdrop-blur z-30 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 pt-6 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-sm bg-gradient-to-tr from-[#9d00ff] to-[#00f0ff] p-[1.5px] shadow-[0_0_12px_rgba(0,240,255,0.4)] flex items-center justify-center">
                <Sun className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div className="absolute -inset-0.5 bg-[#00f0ff]/20 blur-sm rounded" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <h1 className="font-mono text-xl font-bold text-glow-cyan tracking-wider text-[#00f0ff]">CAPS</h1>
              </div>
              <p className="text-[10px] font-mono text-slate-400 tracking-tight uppercase">Controle Automatizado de Painel Solar</p>
            </div>
          </div>

          {/* Core System Live Stats and GitHub Link */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400 bg-slate-900/50 px-3 py-2 rounded-sm border border-slate-800">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#39ff14] rounded-full animate-pulse" />
                <span>Status: Ativo</span>
              </div>
              <div className="hidden md:block h-3.5 w-[1px] bg-slate-800" />
              <div className="hidden md:flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span>Horário Local: <span className="text-white text-glow-cyan">{systemTime}</span></span>
              </div>
            </div>

            <a 
              href="https://github.com/matsunaga-t/girassol-esp32" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[11px] font-mono text-[#00f0ff] border border-[#00f0ff]/40 bg-[#00f0ff]/5 px-3 py-2 rounded-sm hover:bg-[#00f0ff]/15 hover:border-[#00f0ff] hover:text-glow-cyan transition-all flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Código-Fonte (GitHub)</span>
            </a>
          </div>

        </div>
      </header>

      {/* GRID CONTAINER */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start z-10">
        
        {/* LEFT COLUMN: NAVIGATION */}
        <nav id="sidebar-nav" className="lg:col-span-3 bg-[#070710]/90 border border-slate-800 rounded-lg p-4 space-y-4 lg:sticky lg:top-24">
          <div className="border-b border-slate-800 pb-2 flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">Menu de Navegação</span>
            <Database className="w-3.5 h-3.5 text-[#9d00ff]" />
          </div>

          <div className="space-y-1.5">
            {sections.map((sect) => {
              const IconComp = sect.icon;
              return (
                <button
                  key={sect.id}
                  onClick={() => setCurrentSection(sect.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 font-mono text-xs text-left rounded border transition-all ${
                    currentSection === sect.id
                      ? "bg-[#9d00ff]/10 border-[#9d00ff] text-glow-purple text-[#9d00ff] font-bold shadow-[0_0_10px_rgba(157,0,255,0.15)]"
                      : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-[#121324]/50"
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${currentSection === sect.id ? "text-[#9d00ff]" : "text-slate-500"}`} />
                  {sect.label}
                </button>
              );
            })}
          </div>

          <div className="border-t border-slate-800 pt-3 text-[10px] font-mono text-slate-500 space-y-2">
            <div className="flex flex-col gap-1">
              <span>INSTITUIÇÃO:</span>
              <span className="text-slate-300 font-bold text-[#00f0ff] text-[11px]">USF - UNIVERSIDADE SÃO FRANCISCO</span>
            </div>
            <div className="bg-[#121324] p-2.5 rounded border border-slate-800 text-slate-400 leading-normal text-[9px]">
              <span className="text-[#9d00ff] font-bold">Informação:</span> Protótipo experimental para rastreabilidade solar da Universidade São Francisco.
            </div>
            <div className="pt-1">
              <a 
                href="https://github.com/matsunaga-t/girassol-esp32"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-[10px] font-mono font-bold text-slate-300 border border-slate-850 bg-slate-900/60 rounded hover:bg-[#00f0ff]/10 hover:border-[#00f0ff]/60 hover:text-[#00f0ff] transition-all"
              >
                <Github className="w-3.5 h-3.5 text-[#00f0ff]" />
                REPOSITÓRIO GITHUB
              </a>
            </div>
          </div>
        </nav>

        {/* CENTER / MAIN CONTENT PANEL */}
        <main id="main-frame" className="lg:col-span-9 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="bg-[#070710]/95 border border-slate-800 rounded-lg p-5 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
            >
              
              {/* PAGE 1: PÁGINA INICIAL */}
              {currentSection === "home" && (
                <div id="section-home" className="space-y-6">
                  
                  {/* Banner header */}
                  <div className="relative h-44 rounded-lg bg-cover bg-center overflow-hidden border border-[#00f0ff]/40 flex flex-col justify-end p-5" style={{ backgroundImage: "url('https://i.ibb.co/7dFvwBcN/IMG-20260523-WA0019.jpg')" }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-slate-950/60 to-transparent pointer-events-none" />
                    <div className="relative z-10 space-y-1">
                      <span className="text-[10px] font-mono text-[#00f0ff] uppercase tracking-wider bg-[#00f0ff]/10 py-0.5 px-2 rounded border border-[#00f0ff]/40">PROTÓTIPO EXPERIMENTAL</span>
                      <h2 className="text-2xl sm:text-3xl font-mono font-bold text-glow-cyan text-white">CONTROLE AUTOMATIZADO DE PAINEL SOLAR</h2>
                      <p className="text-xs font-mono text-slate-300">Rastreabilidade angular e melhora da eficiência fotovoltaica via hardware microcontrolado.</p>
                    </div>
                  </div>

                  {/* Objective and Pitch */}
                  <div className="border-l-4 border-[#9d00ff] pl-4 space-y-2">
                    <span className="font-mono text-xs text-[#9d00ff] font-bold block">// OBJETIVO PRINCIPAL DO PROJETO</span>
                    <p className="text-sm font-mono text-[#e2e8f0] leading-relaxed">
                      <strong className="text-white text-glow-cyan">Objetivo Principal:</strong> Desenvolver um sistema automatizado capaz de ajustar em tempo real a inclinação mecânica de placas solares com base na intensidade de luz solar, maximizando a captação de energia e eliminando as perdas associadas à posição estática convencional ao longo do dia.
                    </p>
                  </div>

                  {/* Physical Prototype Specifications Card */}
                  <div className="bg-[#040409] border border-slate-800 rounded-lg p-5 space-y-4">
                    <span className="font-mono text-xs text-slate-300 uppercase tracking-wider block font-bold">// ESPECIFICAÇÕES FÍSICAS & ARRANJO MECÂNICO DO PROTÓTIPO</span>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                      <div className="space-y-2 bg-[#0b0c15] p-4 rounded border border-slate-850">
                        <span className="text-[#00f0ff] font-mono font-bold block">// Estrutura de Suporte</span>
                        <p className="text-slate-400 leading-relaxed text-[11px]">
                          Estrutura de madeira com peças impressas em 3D vinculadas a motor, permitindo estabilidade e a rotação do eixo.
                        </p>
                      </div>

                      <div className="space-y-2 bg-[#0b0c15] p-4 rounded border border-slate-850">
                        <span className="text-[#9d00ff] font-mono font-bold block">// Atuação e Transmissão</span>
                        <p className="text-slate-400 leading-relaxed text-[11px]">
                          Movimentado por um servomotor MG995 de rotação continua, acoplado diretamente ao suporte basculante principal. Limites mecânicos de rotação parametrizados em software.
                        </p>
                      </div>

                      <div className="space-y-2 bg-[#0b0c15] p-4 rounded border border-slate-850">
                        <span className="text-amber-400 font-mono font-bold block">// Sensores Luminosos</span>
                        <p className="text-slate-400 leading-relaxed text-[11px]">
                          Dois fotorresistores (LDR) de 5mm instalados um de cada lado da placa, em calhas opostas..
                        </p>
                      </div>

                      <div className="space-y-2 bg-[#0b0c15] p-4 rounded border border-slate-850">
                        <span className="text-[#39ff14] font-mono font-bold block">// Mini-Painel Solar</span>
                        <p className="text-slate-400 leading-relaxed text-[11px]">
                          Célula fotovoltaica experimental de silício policristalino de 5V 1W acoplada ao topo do suporte móvel para rastrear a eficiência de geração passiva vs. ativa.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Imagem do Protótipo na Página Inicial */}
                  <ExternalImage 
                    imageUrl="https://i.ibb.co/7dFvwBcN/IMG-20260523-WA0019.jpg"
                    alt="Protótipo Físico CAPS - Visão Completa"
                    landingUrl="https://ibb.co/q3wBthGF"
                    title="// REGISTRO COMPLETO DO PROTÓTIPO"
                  />

                  {/* Team Members Section */}
                  <div className="space-y-4">
                    <div className="border-b border-slate-800 pb-2">
                      <h3 className="font-mono text-xs text-slate-400 uppercase tracking-wider font-bold">INTEGRANTES DO GRUPO</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {TEAM_MEMBERS.map((member) => (
                        <div key={member.id} className="bg-[#0b0c15] border border-slate-800 rounded px-4 py-3 hover:border-[#9d00ff]/40 transition-all text-center flex items-center justify-center">
                          <h4 className="font-mono text-xs text-slate-200 font-bold tracking-tight">{member.name}</h4>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* PAGE 2: DESCRIÇÃO DO PROBLEMA */}
              {currentSection === "problem" && (
                <div id="section-problem" className="space-y-6">
                  <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-mono text-[#00f0ff] font-bold text-glow-cyan uppercase">02. Descrição do Problema</h2>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">Análise do problema de eficiência energética em painéis fixos.</p>
                    </div>
                    <HelpCircle className="w-5 h-5 text-[#00f0ff]" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-[#121324] border border-slate-800 p-4 rounded-sm">
                        <span className="text-[#9d00ff] text-xs font-mono font-bold block mb-2">// PROBLEMA RESOLVIDO</span>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Painéis solares fixos convencionais sofrem um declínio de eficiência ao longo do dia, perdendo até 40% da capacidade total de captação de energia devido à variação do ângulo de incidência dos raios solares (movimento aparente do sol de leste a oeste). O CAPS ajusta a inclinação dinamicamente para mitigar essa perda.
                        </p>
                      </div>

                      <div className="bg-[#121324] border border-slate-800 p-4 rounded-sm">
                        <span className="text-[#00f0ff] text-xs font-mono font-bold block mb-2">// CONTEXTO DE APLICAÇÃO</span>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          O sistema automatizado foi projetado conceitualmente para aplicação residencial de microgeração de energia, fazendas solares descentralizadas de agrotecnologia, e projetos industriais de autossuficiência energética.
                        </p>
                      </div>
                    </div>

                    <div className="bg-[#0b0c15] border border-slate-800 p-5 rounded-lg flex flex-col justify-between">
                      <div className="space-y-3">
                        <span className="text-[#39ff14] text-xs font-mono font-bold block uppercase tracking-wider">// IMPORTÂNCIA DA SOLUÇÃO</span>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          A adoção de um rastreador ativo promove um expressivo ganho de eficiência no sistema, acelerando o retorno financeiro do investimento fotovoltaico. Adicionalmente, otimiza o pico diário de captação de energia e reduz a necessidade de espaço físico extra para instalação de novas placas solares.
                        </p>
                      </div>

                      <div className="mt-5 p-3.5 bg-black/60 rounded border border-[#39ff14]/20 text-[10px] font-mono text-[#39ff14]">
                        <span className="font-bold uppercase">[IMPACTO AMBIENTAL]:</span> Otimiza a captação por metro quadrado, minimizando a pegada física das superfícies úteis e incentivando fontes sustentáveis inteligentes.
                      </div>
                    </div>
                  </div>



                </div>
              )}



              {/* PAGE 3: ARQUITETURA DO SISTEMA */}
              {currentSection === "architecture" && (
                <div id="section-architecture" className="space-y-6">
                  <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-mono text-[#00f0ff] font-bold text-glow-cyan uppercase">03. Arquitetura do Sistema</h2>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">Esquemas elétricos, fluxogramas, diagramas de comunicação e descrição de hardware e software.</p>
                    </div>
                    <Layers className="w-5 h-5 text-[#00f0ff]" />
                  </div>

                  {/* Esquema Elétrico Image Block */}
                  <ExternalImage 
                    imageUrl="https://i.ibb.co/fV8DpP9h/esquemas-el-tricos.jpg"
                    alt="Esquema Elétrico - CAPS"
                    landingUrl="https://ibb.co/hxXYWtcP"
                    title="// ESQUEMA ELÉTRICO DO HARDWARE"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#121324] p-4 rounded border border-slate-800">
                      <span className="text-slate-300 font-mono text-xs block mb-1.5 font-bold uppercase">// Descrição do Software</span>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        O firmware foi modularizado e escrito em linguagem C++. Realiza leituras nas entradas analógicas (LDRs) através dos pinos ADC do microcontrolador ESP32. Com base na diferença luminosa amostrada, aciona o servomotor por meio de modulação por largura de pulso (PWM) com excelente tempo de resposta.
                      </p>
                    </div>

                    <div className="bg-[#121324] p-4 rounded border border-slate-800">
                      <span className="text-slate-300 font-mono text-xs block mb-1.5 font-bold uppercase">// Descrição do Hardware</span>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        A estrutura física do rastreador conta com fiação blindada de sinal para comunicação I2C física entre o módulo GY-521, que contém o acelerômetro MPU-6050, e o ESP32. Divisores de tensão analógicos bem estruturados fornecem referências com baixo ruído nas leituras de posicionamento do painel.
                      </p>
                    </div>
                  </div>

                  {/* Flowchart Component Block */}
                  <SystemFlowchart />

                  {/* Communication Architecture Component Block */}
                  <CommunicationArchitecture />

                </div>
              )}

              {/* PAGE 4: TECNOLOGIAS UTILIZADAS */}
              {currentSection === "technologies" && (
                <div id="section-technologies" className="space-y-6">
                  <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-mono text-[#00f0ff] font-bold text-glow-cyan uppercase">04. Tecnologias Utilizadas</h2>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">Microcontroladores, sensores, atuadores, linguagens, protocolos de comunicação e plataformas utilizadas.</p>
                    </div>
                    <Cpu className="w-5 h-5 text-[#00f0ff]" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    
                    {/* Tech item */}
                    <div className="bg-[#0b0c15] border border-slate-800 p-4 rounded space-y-2">
                      <span className="text-[#00f0ff] font-mono text-xs font-bold block">// MICROCONTROLADOR</span>
                      <h4 className="font-mono text-white text-sm font-bold">ESP32 (WROOM-32D)</h4>
                      <p className="text-xs text-slate-400">Responsável pelo processamento lógico geral, conversão linear ADC rápida, gerenciamento Wi-Fi e geração de PWM de 50Hz para os motores.</p>
                    </div>

                    {/* Tech item */}
                    <div className="bg-[#0b0c15] border border-slate-800 p-4 rounded space-y-2">
                      <span className="text-[#9d00ff] font-mono text-xs font-bold block">// SENSORES PRINCIPAIS</span>
                      <h4 className="font-mono text-white text-sm font-bold">LDRs & Acelerômetro</h4>
                      <p className="text-xs text-slate-400">Medem a iluminância nos quadrantes Leste/Oeste e o acelerômetro monitora em graus decimais exatos a inclinação física do painel.</p>
                    </div>

                    {/* Tech item */}
                    <div className="bg-[#0b0c15] border border-slate-800 p-4 rounded space-y-2">
                      <span className="text-[#fefe00] font-mono text-xs font-bold block">// ATUADORES DE FORÇA</span>
                      <h4 className="font-mono text-white text-sm font-bold">Servomotor de Rotação</h4>
                      <p className="text-xs text-slate-400">Atuador físico acoplado a engrenagem longitudinal para girar o painel levemente de forma constante até zerar os erros de incidência solar.</p>
                    </div>

                    {/* Tech item */}
                    <div className="bg-[#0b0c15] border border-slate-800 p-4 rounded space-y-2">
                      <span className="text-[#39ff14] font-mono text-xs font-bold block">// PROTOCOLOS DE COMUNICAÇÃO</span>
                      <h4 className="font-mono text-white text-sm font-bold">HTTP (LAN) & I2C</h4>
                      <p className="text-xs text-slate-400">O microcontrolador conversa com o acelerômetro via I2C físico no barramento SDA/SCL, e envia os pacotes usando requisições JSON HTTP Client.</p>
                    </div>

                    {/* Tech item */}
                    <div className="bg-[#0b0c15] border border-slate-800 p-4 rounded space-y-2">
                      <span className="text-[#9d00ff] font-mono text-xs font-bold block">// LINGUAGENS DO ECOSSISTEMA</span>
                      <h4 className="font-mono text-white text-sm font-bold">C++ & Python Core</h4>
                      <p className="text-xs text-slate-400">C++ estruturado embarcado no ESP32 usando o framework Arduino IDE, e Python no backend Express/REST do Dashboard local.</p>
                    </div>

                    {/* Tech item */}
                    <div className="bg-[#0b0c15] border border-slate-800 p-4 rounded space-y-2">
                      <span className="text-slate-400 font-mono text-xs font-bold block">// INFRAESTRUTURA IOT</span>
                      <h4 className="font-mono text-white text-sm font-bold">Servidor Local Desktop</h4>
                      <p className="text-xs text-slate-400">Ambiente de servidor REST customizado e fechado na rede interna local, o que garante imunidade contra oscilações de roteamento externo na nuvem.</p>
                    </div>

                  </div>

                </div>
              )}

              {/* PAGE 5: DESENVOLVIMENTO DO PROJETO */}
              {currentSection === "development" && (
                <div id="section-development" className="space-y-6">
                  <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-mono text-[#00f0ff] font-bold text-glow-cyan uppercase">05. Desenvolvimento do Projeto</h2>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">Etapas do desenvolvimento, dificuldades encontradas, testes realizados e melhorias implementadas.</p>
                    </div>
                    <BookOpen className="w-5 h-5 text-[#00f0ff]" />
                  </div>

                  {/* Stage Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {DEVELOPMENT_STAGES.map((stage, idx) => (
                      <div key={idx} className="bg-[#0b0c15] border border-slate-800 p-4 rounded relative overflow-hidden">
                        <div className="absolute right-2 top-2 text-[26px] font-mono font-bold text-slate-800/20">{idx + 1}</div>
                        <h4 className="font-mono text-[#9d00ff] font-bold text-xs mb-2 uppercase">{stage.title}</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">{stage.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Obstacles and optimizations */}
                  <div className="bg-[#121324] border border-dashed border-[#9d00ff]/40 p-5 rounded-lg space-y-3">
                    <span className="font-mono text-xs text-[#9d00ff] font-bold block uppercase tracking-wider">// DIFICULDADES ENCONTRADAS E MELHORIAS EM BANCADA</span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong>Infraestrutura de Rede e Quedas do Wi-Fi:</strong> Conseguir criar uma comunicação estável entre o ESP32 e o dashboard de renderização foi o maior desafio prático. Roteadores residenciais apresentavam instabilidade de DHCP. A equipe superou o entrave redirecionando a conectividade para uma rede roteada de smartphone móvel local estável.
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong>Pivotamento do Servidor (Raspberry Pi vs Computador Local):</strong> O cronograma inicial contemplava embarcar o REST host em um Raspberry Pi autônomo. No entanto, diante de falhas insolúveis de transmissão de dados na placa interna, a arquitetura foi elegantemente adaptada para rodar localmente no PC Desktop conectado de forma móvel. Isso viabilizou todas as comunicações de forma limpa e no tempo correto.
                    </p>
                  </div>

                </div>
              )}

              {/* PAGE 6: RESULTADOS OBTIDOS */}
              {currentSection === "results" && (
                <div id="section-results" className="space-y-6">
                  <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-mono text-[#00f0ff] font-bold text-glow-cyan uppercase">06. Resultados Obtidos</h2>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">Funcionamento do sistema, galeria de imagens/gráficos do protótipo, dados experimentais e limites técnicos.</p>
                    </div>
                    <TrendingUp className="w-5 h-5 text-[#39ff14]" />
                  </div>

                  {/* Operation & Experimental Results Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#0b0c15] border border-slate-800 p-5 rounded-lg space-y-3">
                      <span className="font-mono text-xs text-[#00f0ff] font-bold block uppercase tracking-wider">// FUNCIONAMENTO DO SISTEMA</span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Durante as validações analógicas dinâmicas realizadas com feixes de iluminação artificial direcionada em bancada, o protótipo do <strong>Controle Automatizado de Painel Solar (CAPS)</strong> alcançou 100% de conformidade de alinhamento diferencial de forma imediata aos estímulos. 
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Os LDRs enviaram os gradientes resistivos correspondentes ao ADC do ESP32 com extrema fidelidade. A rotina lógica de histerese calculada em C++ evitou micro-ajustes desgastantes e repetitivos, cessando a rotação angular do servomotor sob sincronia exata exatamente no vetor focal geométrico central.
                      </p>
                    </div>

                    <div className="bg-[#0b0c15] border border-slate-800 p-5 rounded-lg space-y-3">
                      <span className="font-mono text-xs text-[#9d00ff] font-bold block uppercase tracking-wider">// RESULTADOS EXPERIMENTAIS</span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        As leituras de rotação física do acelerômetro <strong>GY-01</strong> comunicaram-se instantaneamente sob o barramento I2C, gerando leituras decimais de graus de inclinação física precisas e estotadas para transmissão na rede.
                      </p>
                    </div>
                  </div>

                  {/* Dashboard telemetry image view */}
                  <ExternalImage 
                    imageUrl="https://i.ibb.co/7dj1cCwy/Dashboard.jpg"
                    alt="Telemetry Dashboard - CAPS"
                    landingUrl="https://ibb.co/cSkr53GT"
                    title="// PAINEL DE TELEMETRIA DO SISTEMA"
                  />

                  {/* Registros do Protótipo Real */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ExternalImage 
                      imageUrl="https://i.ibb.co/7dFvwBcN/IMG-20260523-WA0019.jpg"
                      alt="Protótipo Físico CAPS"
                      landingUrl="https://ibb.co/q3wBthGF"
                      title="// REGISTRO COMPLETO DO PROTÓTIPO"
                    />
                    <ExternalImage 
                      imageUrl="https://i.ibb.co/fVw7wPqg/IMG-20260523-WA0016.jpg"
                      alt="Protótipo CAPS em Funcionamento"
                      landingUrl="https://ibb.co/SDCpC95j"
                      title="// PROTÓTIPO ATIVO EM BANCADA"
                    />
                  </div>



                  {/* Current Limitations */}
                  <div className="bg-[#9d00ff]/5 border border-[#9d00ff]/30 p-5 rounded-lg space-y-3">
                    <span className="font-mono text-xs text-[#9d00ff] font-bold block uppercase tracking-wider">// LIMITAÇÕES ATUAIS DO PROTÓTIPO TESTADO</span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong>Ausência de Medição de Geração Líquida Real:</strong> Nas condições experimentais atuais, o protótipo não foi submetido a testes de carga integrados em condições reais de incidência de luz solar por períodos longos sustentados (como ciclos contínuos de 12 horas).
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Também não foi implementado um shunt de corrente para avaliar o custo energético consumido pela eletrônica embarcada (ESP32 de 240MHz, barramentos de conexões e atuador mecânico) e descontá-lo da receita de Wh extra captados pelo painel dinâmico móvel.
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong>Instabilidade sob Alta Radiação Solar (Calibração de Luz):</strong> Durante os testes de campo com incidência de luz solar real e direta, foi constatada uma certa instabilidade de oscilação em direção ao final do ensaio. Esse comportamento é justificado pelo fato de o controlador ter sido calibrado originalmente para fontes de luz artificial de intensidade menos intensa em bancada. Sob forte radiação solar direta, a alta saturação dos sensores LDR alterou os valores de sensibilidade diferencial, gerando leves flutuações pontuais de correção que necessitam de adaptação no algoritmo de histerese do firmware para ambientes externos de alta insolação.
                    </p>
                  </div>

                </div>
              )}

              {/* PAGE 7: VÍDEOS OBRIGATÓRIOS */}
              {currentSection === "media" && (
                <div id="section-media" className="space-y-6">
                  <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-mono text-[#00f0ff] font-bold text-glow-cyan uppercase">07. Vídeos Obrigatórios</h2>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">Vídeos da apresentação contendo demonstração do funcionamento, montagem em bancada e explicação técnica do projeto.</p>
                    </div>
                    <Video className="w-5 h-5 text-[#00f0ff]" />
                  </div>

                  <div className="grid grid-cols-1 max-w-2xl mx-auto gap-6">
                    {REQUIRED_VIDEOS.map((video) => (
                      <div key={video.id} className="bg-[#0b0c15] border border-slate-800 rounded-lg p-5 flex flex-col justify-between relative overflow-hidden space-y-4">
                        <div>
                          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                            <h4 className="font-mono text-xs font-bold text-white uppercase truncate pr-2" title={video.title}>{video.title}</h4>
                            <span className="text-[9px] font-mono text-[#39ff14] bg-[#39ff14]/10 border border-[#39ff14]/30 px-2 py-0.5 rounded font-bold shrink-0">YOUTUBE</span>
                          </div>
                          
                          {/* Embedded YouTube Player or Poster Placeholder */}
                          {playedVideos[video.id] ? (
                            <div className="h-52 bg-black rounded-md overflow-hidden border border-slate-800">
                              <iframe 
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${video.embedId}?autoplay=1`} 
                                title={video.title} 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          ) : (
                            <div 
                              onClick={() => setPlayedVideos(prev => ({ ...prev, [video.id]: true }))}
                              className="h-52 bg-black/90 rounded-md relative flex flex-col items-center justify-center border border-slate-800 overflow-hidden group cursor-pointer hover:border-[#00f0ff]/50 transition-all shadow-inner"
                            >
                              <div className="cyber-panel-grid absolute inset-0 opacity-15" />
                              <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/25 transition-colors" />
                              <div className="space-y-3 z-10 flex flex-col items-center p-4">
                                <div className="p-3 bg-slate-900/80 rounded-full border border-slate-850 group-hover:scale-110 group-hover:border-[#00f0ff]/80 transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.1)] group-hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                                  <Play className="w-8 h-8 text-[#00f0ff]" />
                                </div>
                                <div className="text-center">
                                  <span className="text-[10px] font-mono text-slate-300 font-bold block uppercase tracking-wider">Assistir no Site</span>
                                  <span className="text-[8px] font-mono text-slate-500 block mt-0.5 max-w-[250px] truncate">{video.url}</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="space-y-3 pt-1">
                          <p className="text-xs text-slate-400 leading-relaxed min-h-[48px]">
                            {video.desc}
                          </p>
                          <div className="flex justify-end pt-1 border-t border-slate-900">
                            <a 
                              href={video.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-[10px] font-mono uppercase text-[#00f0ff] hover:text-[#9d00ff] flex items-center gap-1 transition-colors py-1 px-2 hover:bg-slate-900 rounded"
                            >
                              Abrir no YouTube <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* PAGE 8: CONCLUSÃO */}
              {currentSection === "conclusion" && (
                <div id="section-conclusion" className="space-y-6">
                  <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-mono text-[#00f0ff] font-bold text-glow-cyan uppercase">08. Conclusão</h2>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">Retrospectiva dos resultados alcançadas, melhorias propostas e evolução futura do projeto.</p>
                    </div>
                    <Award className="w-5 h-5 text-[#00f0ff]" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#0b0c15] border border-slate-800 p-5 rounded-lg space-y-3">
                      <span className="font-mono text-xs text-[#9d00ff] font-bold block uppercase tracking-wider">// O PROJETO ATINGIU OS OBJETIVOS?</span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        **Sim, com êxito!** O sistema projetado para o CAPS foi construído de forma sólida e estabilizado mecanicamente. Sob simulações práticas direcionadas com feixes de lanternas em bancada, o painel seguiu com precisão os estímulos diferenciais de luminosidade no plano de rotação, cessando o movimento sob alinhamento focal exato graças ao algoritmo de histerese.
                      </p>
                      <p className="text-xs text-slate-300 font-bold block mt-2">
                        O que poderia ser melhorado:
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Realizar ensaios de campo contínuos em condições climáticas externas naturais por mais de 12 horas e acoplar sensores de corrente para balancear rigorosamente o lucro líquido gerado contra o sutil consumo de carga do motor do sistema.
                      </p>
                    </div>

                    <div className="bg-[#9d00ff]/5 border border-[#9d00ff]/30 p-5 rounded-lg space-y-3">
                      <span className="font-mono text-xs text-[#9d00ff] font-bold block uppercase tracking-wider">// COMO O PROJETO PODERIA EVOLUIR FUTURAMENTE?</span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Uma relevante evolução futura para o projeto foca no problema do <strong>estresse térmico de placas solares</strong>. Em dias de calor extremo, a eficiência natural das células fotovoltaicas diminui drasticamente à medida que a temperatura do silício sobe.
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Um redesenho futuro do CAPS incorporaria um recuo mecânico (espaçamento de poucos centímetros) entre as placas solares e o suporte de telhado/solo. Isso induz de forma totalmente passiva um canal de convecção térmica por fluxo de ar, arrefecendo as células por ventilação natural sem demandar consumo elétrico de ventilação ativa do sistema.
                      </p>
                    </div>
                  </div>

                </div>
              )}

            </motion.div>
          </AnimatePresence>



        </main>

      </div>


    </div>
  );
}
