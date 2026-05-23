import React, { useState } from "react";
import { 
  PlayCircle, Settings, AlertTriangle, RotateCw, Compass, Shield, 
  Sliders, Eye, Sun, Clock, Wifi, Activity, Terminal, ArrowRight, ArrowDown, HelpCircle, Check, X
} from "lucide-react";

interface FlowNode {
  id: string;
  title: string;
  subtitle?: string;
  desc: string;
  category: "start" | "setup" | "danger" | "loop" | "accel" | "halt" | "ldr" | "timer" | "wifi" | "pid" | "motor" | "debug" | "inactive";
  colorClass: string;
  borderClass: string;
  icon: React.ComponentType<{ className?: string }>;
  details?: string;
  codeSnippet?: string;
}

export function SystemFlowchart() {
  const [selectedNode, setSelectedNode] = useState<string | null>("setup");

  const nodes: FlowNode[] = [
    {
      id: "start",
      title: "Início",
      subtitle: "Inicialização básica",
      desc: "Primeiro boot do microcontrolador ESP32 do sistema CAPS.",
      category: "start",
      colorClass: "bg-slate-900 border-slate-700 text-slate-100",
      borderClass: "border-slate-600 hover:border-slate-500",
      icon: PlayCircle,
      details: "Alimentação de 5V energiza o ESP32. O hardware realiza a verificação de registradores e prepara o ambiente de execução em C++.",
      codeSnippet: `void setup() {\n  // Inicia a execução do firmware\n}`
    },
    {
      id: "setup",
      title: "Função setup()",
      subtitle: "Configurações de Hardware",
      desc: "Inicia Serial, PWM do servo, pinos LDR, acelerômetro MPU6050 e Wi-Fi.",
      category: "setup",
      colorClass: "bg-[#0d47a1]/15 border-blue-800 text-blue-100 shadow-[0_0_10px_rgba(13,71,161,0.15)]",
      borderClass: "border-blue-700 hover:border-[#00f0ff]",
      icon: Settings,
      details: "Associa os pinos ADC aos sensores LDR e ao painel. Atribui o canal PWM do servomotor no seu ponto neutro (1500μs). Tenta estabelecer conexão com o AP local e inicializa as rotinas de I2C do MPU6050.",
      codeSnippet: `void setup() { \n  Serial.begin(115200);\n  motor.attach(SERVO_PIN, 500, 2500);\n  motor.writeMicroseconds(1500);\n  mpu.begin();\n  conectarWiFi();\n}`
    },
    {
      id: "security-lock",
      title: "Trava de Segurança",
      subtitle: "LED de Status ON // HALT",
      desc: "Caso haja falha crítica na inicialização (ex: MPU6050 offline), o sistema trava.",
      category: "danger",
      colorClass: "bg-red-950/20 border-red-900 text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.15)]",
      borderClass: "border-red-800 hover:border-red-500",
      icon: AlertTriangle,
      details: "Interrompe as principais rotinas para evitar curtos no servomotor ou posicionamento indesejado. Aciona porta digital do LED vermelho físico em alta intensidade até o reset.",
      codeSnippet: `if (!mpu.testConnection()) {\n  digitalWrite(LED_PIN, HIGH);\n  while (true) { \n    // Trava do hardware por segurança \n  }\n}`
    },
    {
      id: "loop-start",
      title: "loop() - Início",
      subtitle: "Loop C++ Principal",
      desc: "Começo do ciclo imediato executado de forma contínua pelo ESP32.",
      category: "loop",
      colorClass: "bg-[#9d00ff]/10 border-purple-900/60 text-purple-100 shadow-[0_0_10px_rgba(157,0,255,0.1)]",
      borderClass: "border-purple-800/80 hover:border-[#9d00ff]",
      icon: RotateCw,
      details: "Executado infinitamente. Cada loop consome bilissegundos, gerando altíssimo nível de paralelismo virtual para varredura de eventos.",
      codeSnippet: `void loop() {\n  // Início da rotina cíclica\n}`
    },
    {
      id: "accel",
      title: "Acelerômetro MPU6050",
      subtitle: "USE_ACCELEROMETER",
      desc: "Coleta as leituras inerciais e ajusta as inclinações limites do PID dinamicamente.",
      category: "accel",
      colorClass: "bg-teal-950/20 border-teal-800/80 text-teal-200 shadow-[0_0_10px_rgba(20,184,166,0.1)]",
      borderClass: "border-teal-700 hover:border-teal-400",
      icon: Compass,
      details: "Se a flag USE_ACCELEROMETER estiver compilada como verdadeira, lê a aceleração do eixo longitudinal (Y) e gravidade (Z) da MPU6050 via barramento físico I2C e converte em graus centesimais perfeitos.",
      codeSnippet: `if (USE_ACCELEROMETER) {\n  mpu.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);\n  float angle = atan2(ay, az) * 180.0 / M_PI;\n  ajustarLimitesPID(angle);\n}`
    },
    {
      id: "halt-check",
      title: "Varredura HALT_PIN",
      subtitle: "ENABLE_HALT (Inativo)",
      desc: "Lê o pino físico de parada manual para ligar/desligar atuadores.",
      category: "inactive",
      colorClass: "bg-slate-900 border-slate-800 text-slate-400 opacity-60",
      borderClass: "border-slate-800 hover:border-slate-700",
      icon: Shield,
      details: "Checa se o operador humano acionou a chave geral física de bypass. Se pressionado, altera estado interno para inativo, congelando o motor.",
      codeSnippet: `if (ENABLE_HALT) {\n  runningState ^= digitalRead(HALT_PIN);\n}`
    },
    {
      id: "pid-gain-check",
      title: "Modo Sintonia Remota",
      subtitle: "CHANGE_PID_GAIN (Inativo)",
      desc: "Lê potenciômetros manuais e sobrescreve as variáveis Kp, Ki e Kd.",
      category: "inactive",
      colorClass: "bg-slate-900 border-slate-800 text-slate-400 opacity-60",
      borderClass: "border-slate-800 hover:border-slate-700",
      icon: Sliders,
      details: "Quando ativo, possibilita calibragem manual instantânea via hardware sem precisar recompilar código. Lê 3 conectores analógicos dedicados para setar ganhos PID.",
      codeSnippet: `if (CHANGE_PID_GAIN) {\n  float kp = analogRead(POT_KP_PIN) / 4095.0 * 2.0;\n  pidCon.setGains(kp, ki, kd);\n}`
    },
    {
      id: "read-ldr",
      title: "Amostragem dos LDRs",
      subtitle: "Leitura média em volts",
      desc: "Gera a amostragem filtrada dos miliVolts de fluxo luminoso no Leste e Oeste.",
      category: "ldr",
      colorClass: "bg-blue-950/20 border-blue-900 text-blue-200 shadow-[0_0_10px_rgba(37,99,235,0.1)]",
      borderClass: "border-blue-800 hover:border-blue-400",
      icon: Eye,
      details: "Para amenizar picos de leitura induzidos por ruídos e variações rápidas de nuvens, o software realiza a leitura bruta de miliVolts em cada iteração via analogReadMilliVolts e adiciona à média móvel circular.",
      codeSnippet: `int ldrLeste = analogReadMilliVolts(LDR_L_PIN);\nint ldrOeste = analogReadMilliVolts(LDR_O_PIN);\nsamplesL.addSample(ldrLeste);\nsamplesO.addSample(ldrOeste);`
    },
    {
      id: "read-panel",
      title: "Leitura do Painel Solar",
      subtitle: "Amostragem de Geração",
      desc: "Amostra a tensão instantânea gerada pela célula fotovoltaica.",
      category: "ldr",
      colorClass: "bg-blue-950/20 border-blue-900 text-blue-200 shadow-[0_0_10px_rgba(37,99,235,0.1)]",
      borderClass: "border-blue-800 hover:border-blue-400",
      icon: Sun,
      details: "Utiliza um divisor de tensão seguro de 10k/10k para ler a tensão de geração analógica e acumula em uma estrutura circular de média móvel.",
      codeSnippet: `int vSolar = analogReadMilliVolts(SOLAR_PIN);\nsamplesSolar.addSample(vSolar);`
    },
    {
      id: "timer-check",
      title: "Vigilância do Timer",
      subtitle: "timer >= nextControllTime?",
      desc: "Estrutura condicional que dita ciclos periódicos fixos para PID e Wi-Fi.",
      category: "timer",
      colorClass: "bg-amber-950/20 border-amber-900 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.15)]",
      borderClass: "border-amber-800 hover:border-amber-400",
      icon: Clock,
      details: "Garante que o microcontrolador não execute processamento de rede e cálculo do filtro PID a cada microssegundo, poupando energia e estabilizando o barramento Wi-Fi.",
      codeSnippet: `if (millis() >= nextControllTime) {\n  // Dispara a cada PID_CONTROLL_DELAY\n}`
    },
    {
      id: "wifi-send",
      title: "Telemetria Cloud via Wi-Fi",
      subtitle: "USE_WIFI (HTTP POST)",
      desc: "Serializa médias móveis em JSON direto e envia ao painel local de telemetria.",
      category: "wifi",
      colorClass: "bg-orange-950/20 border-orange-900 text-orange-200 shadow-[0_0_10px_rgba(249,115,22,0.1)]",
      borderClass: "border-orange-850 hover:border-orange-400",
      icon: Wifi,
      details: "Estrutura um payload JSON contendo leituras médias e inclinação instantânea física. Dispara uma requisição HTTP REST POST de maneira silenciosa para o servidor NodeJS/Python.",
      codeSnippet: `if (USE_WIFI && wifiConnected) {\n  String payload = serializeData();\n  http.POST(payload);\n}`
    },
    {
      id: "timer-update",
      title: "Incremento de Cronograma",
      subtitle: "Ajuste do próximo pulso",
      desc: "Atualiza a váriavel de controle temporal somando o atraso parametrizado.",
      category: "pid",
      colorClass: "bg-[#d84315]/15 border-orange-800/80 text-orange-200 shadow-[0_0_10px_rgba(216,67,21,0.1)]",
      borderClass: "border-orange-700 hover:border-orange-400",
      icon: Activity,
      details: "Ajusta a janela dinâmica de agendamento usando o delay regulamentado de execução (comumente 100ms a 250ms). Evita problemas acumulativos do temporizador interno do ESP32.",
      codeSnippet: `nextControllTime += PID_CONTROLL_DELAY;`
    },
    {
      id: "calc-illuminance",
      title: "Cálculo de Iluminância",
      subtitle: "Equações de Lux Dinâmico",
      desc: "Processa arrays das médias para obter variáveis exatas de iluminação.",
      category: "pid",
      colorClass: "bg-[#d84315]/15 border-orange-800/80 text-orange-200 shadow-[0_0_10px_rgba(216,67,21,0.1)]",
      borderClass: "border-orange-700 hover:border-orange-400",
      icon: Sun,
      details: "Calcula a amplitude diferencial entre o sensor Leste e Oeste, decodifica a curva fotométrica dos LDRs de acordo com curvas exponenciais de resistividade convertidas para nível Lux.",
      codeSnippet: `float avgLeste = samplesL.getAverage();\nfloat avgOeste = samplesO.getAverage();\nfloat diffLux = toIlluminance(avgLeste) - toIlluminance(avgOeste);`
    },
    {
      id: "pid-update",
      title: "Compensador Ativo PID",
      subtitle: "pidCon.update()",
      desc: "Injeta a diferença obtida na malha matemática PID, gerando a compensação exata.",
      category: "pid",
      colorClass: "bg-[#d84315]/15 border-orange-800/80 text-orange-200 shadow-[0_0_10px_rgba(216,67,21,0.1)]",
      borderClass: "border-orange-700 hover:border-orange-400",
      icon: Activity,
      details: "Com base nas constantes Kp, Ki e Kd, o software calcula os componentes proporcional, integral e derivativo sobre o erro de luminosidade. Aplica um algoritmo de histerese para ignorar pequenas flutuações e descarta oscilações parasitas.",
      codeSnippet: `float error = diffLux;\nfloat PID_output = pidCon.update(error);\nPID_output = constrain(PID_output, -250, 250);`
    },
    {
      id: "motor-write",
      title: "Comando Físico ao Servomotor",
      subtitle: "motor.writeMicroseconds()",
      desc: "Envia o sinal PWM final de comando para tracionamento mecânico real.",
      category: "motor",
      colorClass: "bg-[#0d47a1]/15 border-blue-800 text-blue-100 shadow-[0_0_10px_rgba(13,71,161,0.15)]",
      borderClass: "border-blue-700 hover:border-[#00f0ff]",
      icon: Activity,
      details: "Se o sistema estiver rodando, converte a resposta matemática do PID para pulse width em microssegundos (geralmente centrado em 1500μs, variando de 1250μs a 1750μs) e envia ao periférico acoplado de hardware.",
      codeSnippet: `if (runningState) {\n  int pulse = 1500 + (int)PID_output;\n  motor.writeMicroseconds(pulse);\n} else {\n  motor.writeMicroseconds(1500); // Força parada\n}`
    },
    {
      id: "debug-output",
      title: "Logs de Telemetria UART",
      subtitle: "Serial.println() (Inativo)",
      desc: "Cospe logs contendo variáveis exatas de telemetria serial se habilitado.",
      category: "inactive",
      colorClass: "bg-slate-900 border-slate-800 text-slate-400 opacity-60",
      borderClass: "border-slate-800 hover:border-slate-700",
      icon: Terminal,
      details: "Auxilia na depuração de ruídos de dados diretos via cabo micro-USB conectado em bancada. Desligado de forma geral para evitar consumo de CPU desnecessário em campo.",
      codeSnippet: `if (DEBUG_ENABLE) {\n  Serial.printf("L:%f, O:%f, Err:%f\\n", avgL, avgO, error);\n}`
    }
  ];

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeId);
  };

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case "start": return "bg-slate-950 text-slate-300 border-slate-800";
      case "setup": return "bg-blue-950/30 text-blue-400 border-blue-900";
      case "danger": return "bg-red-950/30 text-red-400 border-red-900";
      case "loop": return "bg-purple-950/30 text-purple-400 border-purple-900";
      case "accel": return "bg-teal-950/30 text-teal-400 border-teal-900";
      case "ldr": return "bg-blue-950/30 text-blue-400 border-blue-900";
      case "timer": return "bg-amber-950/30 text-amber-400 border-amber-900";
      case "wifi": return "bg-orange-950/30 text-orange-400 border-orange-900";
      case "pid": return "bg-orange-950/30 text-orange-400 border-orange-900";
      case "motor": return "bg-[#0d47a1]/20 text-blue-300 border-blue-800";
      default: return "bg-slate-950 text-slate-500 border-slate-900 opacity-60";
    }
  };

  const selectedNodeObj = nodes.find(n => n.id === selectedNode) || nodes[0];

  return (
    <div id="flowchart-container" className="bg-[#070710]/95 border border-slate-800 rounded-lg p-5 relative overflow-hidden">
      {/* Cyberpunk Grid Overlay */}
      <div className="absolute inset-0 cyber-panel-grid opacity-10 pointer-events-none" />
      
      {/* Container Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-4 mb-5 gap-3 z-10 relative">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#9d00ff]" />
          <span className="font-mono text-xs text-slate-300 font-bold tracking-wider">
            // FLUXOGRAMA
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        {/* LEFT COLUMN: THE INTERACTIVE GRAPH DIAGRAM PANEL / LOGIC FLOW */}
        <div className="lg:col-span-8 space-y-4 max-h-[650px] overflow-y-auto pr-2 custom-scrollbar">
          
          <div className="space-y-4">
              
              {/* SECTION: BOOT & SETUP */}
              <div className="bg-black/25 border border-slate-900 rounded p-4 relative">
                <span className="absolute -top-2.5 left-4 px-2 py-0.5 bg-slate-950 border border-slate-900 rounded font-mono text-[9px] text-slate-500 tracking-wider font-bold">
                  FASE DE INICIALIZAÇÃO (SETUP)
                </span>
                
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-2 mt-1">
                  
                  {/* START ID */}
                  <div 
                    onClick={() => handleNodeClick("start")}
                    className={`cursor-pointer transition-all border p-3 rounded-lg text-center font-mono w-full md:w-1/4 ${
                      selectedNode === "start" ? "border-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.2)] bg-slate-900" : "border-slate-800 bg-slate-950/40"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <PlayCircle className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-[10px] font-bold text-slate-300 uppercase">Início</span>
                    </div>
                    <span className="text-[9px] text-slate-500 block">Boot ESP32</span>
                  </div>

                  <div className="text-slate-700 font-mono text-xs hidden md:block">
                    <ArrowRight className="w-4 h-4 text-[#9d00ff]" />
                  </div>

                  {/* SETUP ID */}
                  <div 
                    onClick={() => handleNodeClick("setup")}
                    className={`cursor-pointer transition-all border p-3 rounded-lg font-mono w-full md:w-2/5 ${
                      selectedNode === "setup" ? "border-blue-400 bg-blue-950/30 shadow-[0_0_12px_rgba(0,240,255,0.2)]" : "border-blue-900/60 bg-[#0d47a1]/5"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-blue-400">
                      <Settings className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase">Setup Inicial</span>
                    </div>
                    <span className="text-[9px] text-slate-400 block truncate">Serial, PWM, I2C, conectarWiFi</span>
                  </div>

                  <div className="text-slate-700 font-mono text-xs text-center flex md:flex-col gap-1 items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-red-500/80 md:hidden" />
                    <span className="text-[9px] text-red-400 bg-red-950/50 border border-red-900/40 px-1 py-0.5 rounded font-bold uppercase">Em Falha</span>
                    <ArrowDown className="w-4 h-4 text-red-500/80 hidden md:block" />
                  </div>

                  {/* TRAVA DE SEGURANÇA */}
                  <div 
                    onClick={() => handleNodeClick("security-lock")}
                    className={`cursor-pointer transition-all border p-3 rounded-lg font-mono w-full md:w-1/3 ${
                      selectedNode === "security-lock" ? "border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.2)] bg-red-950/30" : "border-red-900/50 bg-red-950/10"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-red-400">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                      <span className="text-[10px] font-bold uppercase">Trava de Segurança</span>
                    </div>
                    <span className="text-[9px] text-slate-400 block truncate">LED vermelho aceso // HALT</span>
                  </div>

                </div>

              </div>
              
              <div className="flex justify-center my-1">
                <ArrowDown className="w-5 h-5 text-[#9d00ff] animate-pulse" />
              </div>

              {/* SECTION: LOOP SYSTEM */}
              <div className="bg-[#070715] border border-slate-800/80 rounded-xl p-4 relative space-y-4">
                <span className="absolute -top-3 left-4 px-2 py-0.5 bg-slate-950 border border-slate-800/80 rounded font-mono text-[9px] text-[#9d00ff] tracking-wider font-bold">
                  CICLO INFINITO (LOOP PRINCIPAL C++)
                </span>

                {/* LOOP LEAD CONTAINER */}
                <div className="flex items-center justify-between border-b border-slate-800/65 pb-2">
                  <div 
                    onClick={() => handleNodeClick("loop-start")}
                    className={`cursor-pointer transition-all border px-3 py-1.5 rounded-md font-mono flex items-center gap-2 ${
                      selectedNode === "loop-start" ? "border-[#9d00ff] bg-[#9d00ff]/15" : "border-purple-900/60 bg-[#9d00ff]/5"
                    }`}
                  >
                    <RotateCw className="w-3.5 h-3.5 text-[#9d00ff]" />
                    <span className="text-[10px] font-bold text-slate-200 uppercase">loop() - Início</span>
                  </div>
                  <span className="text-[9px] font-mono text-slate-500">Varreduras instantâneas</span>
                </div>

                {/* EXTRA FEATURES CHECK (ACCEL & INACTIVE OPTIONS) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  
                  {/* USE_ACCELEROMETER */}
                  <div 
                    onClick={() => handleNodeClick("accel")}
                    className={`cursor-pointer transition-all border p-3 rounded-lg font-mono ${
                      selectedNode === "accel" ? "border-teal-400 bg-teal-950/30" : "border-teal-900/50 bg-teal-950/5"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-teal-400">
                      <Compass className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-bold uppercase">Acelerômetro MPU</span>
                    </div>
                    <span className="text-[9px] text-slate-400 block">Lê MPU6050 e ajusta limites</span>
                  </div>

                  {/* HALT */}
                  <div 
                    onClick={() => handleNodeClick("halt-check")}
                    className={`cursor-pointer transition-all border p-3 rounded-lg font-mono bg-slate-950/25 ${
                      selectedNode === "halt-check" ? "border-slate-500 opacity-100" : "border-slate-800/80 opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-slate-400">
                      <Shield className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-bold uppercase">Parada Manual</span>
                    </div>
                    <span className="text-[9px] text-slate-500 block">ENABLE_HALT (Inativo)</span>
                  </div>

                  {/* CHANGE_PID_GAIN */}
                  <div 
                    onClick={() => handleNodeClick("pid-gain-check")}
                    className={`cursor-pointer transition-all border p-3 rounded-lg font-mono bg-slate-950/25 ${
                      selectedNode === "pid-gain-check" ? "border-slate-500 opacity-100" : "border-slate-800/80 opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-slate-400">
                      <Sliders className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-bold uppercase">Sintonia Remota</span>
                    </div>
                    <span className="text-[9px] text-slate-500 block">Sobrescrever Kp, Ki, Kd</span>
                  </div>

                </div>

                <div className="flex justify-center items-center py-1">
                  <ArrowDown className="w-4 h-4 text-slate-700" />
                </div>

                {/* SENSORS ACQUISITION ROW */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  
                  {/* READ_LDR */}
                  <div 
                    onClick={() => handleNodeClick("read-ldr")}
                    className={`cursor-pointer transition-all border p-3 rounded-lg font-mono ${
                      selectedNode === "read-ldr" ? "border-blue-400 bg-blue-950/30" : "border-blue-900/60 bg-blue-950/5"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-blue-400">
                      <Eye className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase">Sensor de Luz LDR Leste/Oeste</span>
                    </div>
                    <p className="text-[9px] text-slate-400 block">Esquema analógico lê mV e adiciona as amostras na janela média circular móvel.</p>
                  </div>

                  {/* READ_PANEL */}
                  <div 
                    onClick={() => handleNodeClick("read-panel")}
                    className={`cursor-pointer transition-all border p-3 rounded-lg font-mono ${
                      selectedNode === "read-panel" ? "border-blue-400 bg-blue-950/30" : "border-blue-900/60 bg-blue-950/5"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-blue-400">
                      <Sun className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase">Geração Solar do Painel</span>
                    </div>
                    <p className="text-[9px] text-slate-400 block">Mede miliVolts instantâneos gerados e computa no array cirular de dados do dia.</p>
                  </div>

                </div>

                <div className="flex justify-center items-center py-1">
                  <ArrowDown className="w-4 h-4 text-slate-700" />
                </div>

                {/* CONDITIONAL TIMER DECISION BLOCK */}
                <div 
                  onClick={() => handleNodeClick("timer-check")}
                  className={`cursor-pointer transition-all border p-4 rounded-xl font-mono text-center relative overflow-hidden flex flex-col items-center justify-center ${
                    selectedNode === "timer-check" 
                      ? "border-amber-400 bg-amber-950/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]" 
                      : "border-amber-900/60 bg-amber-950/5"
                  }`}
                >
                  <div className="absolute top-0 right-0 bg-amber-900/20 text-amber-400 font-bold border-l border-b border-amber-950 text-[10px] px-2 py-0.5 uppercase">
                    Tomada de Decisão
                  </div>
                  <Clock className="w-5 h-5 text-amber-400 mb-1.5 animate-pulse" />
                  <span className="text-[11px] font-bold text-slate-100 uppercase mb-0.5">timer {`>=`} nextControllTime?</span>
                  <p className="text-[9px] text-slate-400 max-w-md">Controle temporal para evitar travamento da CPU do ESP32 por excesso de pacotes REST HTTP.</p>
                </div>


                {/* FORK ARROWS */}
                <div className="flex justify-between items-center px-8 text-xs font-bold font-mono">
                  <div className="flex flex-col items-center gap-1 text-green-400 bg-green-950/30 border border-green-900/40 px-2 py-0.5 rounded">
                    <span>SIM (Estouro do timer)</span>
                    <ArrowDown className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="flex flex-col items-center gap-1 text-red-500 bg-red-950/30 border border-red-900/40 px-2 py-0.5 rounded">
                    <span>NÃO (Bypass imediato)</span>
                    <div className="flex items-center gap-1">
                      <span>Pula para o Motor</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>


                {/* ACTIVE COMPENSATOR TIMER-BLOCKS (SIM BRANCH) */}
                <div className="bg-black/30 border border-slate-900 p-4 rounded-lg space-y-3 relative">
                  <div className="absolute right-3 top-3 text-[10px] font-bold font-mono bg-green-900/20 text-green-400 rounded px-1.5 py-0.5 border border-green-800/40">
                    RAMIFICAÇÃO ATIVA (A CADA 250ms)
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 py-2">
                    
                    {/* SEND WIFI */}
                    <div 
                      onClick={() => handleNodeClick("wifi-send")}
                      className={`cursor-pointer transition-all border p-3 rounded-lg font-mono text-center ${
                        selectedNode === "wifi-send" ? "border-orange-400 bg-orange-950/30" : "border-orange-900/60 bg-orange-950/5"
                      }`}
                    >
                      <Wifi className="w-4 h-4 text-orange-400 mx-auto mb-1.5" />
                      <span className="text-[9px] font-bold uppercase block text-orange-200">Post Telemetria</span>
                      <span className="text-[8px] text-slate-500 block mt-0.5">REST JSON</span>
                    </div>

                    {/* UPDATE TIMER */}
                    <div 
                      onClick={() => handleNodeClick("timer-update")}
                      className={`cursor-pointer transition-all border p-3 rounded-lg font-mono text-center ${
                        selectedNode === "timer-update" ? "border-orange-400 bg-orange-950/30" : "border-orange-900/60 bg-[#d84315]/5"
                      }`}
                    >
                      <Clock className="w-4 h-4 text-orange-400 mx-auto mb-1.5" />
                      <span className="text-[9px] font-bold uppercase block text-orange-200">Ajuste Prazo</span>
                      <span className="text-[8px] text-slate-500 block mt-0.5">nextControllTime +=</span>
                    </div>

                    {/* CALC ILLUMINANCE */}
                    <div 
                      onClick={() => handleNodeClick("calc-illuminance")}
                      className={`cursor-pointer transition-all border p-3 rounded-lg font-mono text-center ${
                        selectedNode === "calc-illuminance" ? "border-orange-400 bg-orange-950/30" : "border-orange-900/60 bg-[#d84315]/5"
                      }`}
                    >
                      <Sun className="w-4 h-4 text-orange-400 mx-auto mb-1.5" />
                      <span className="text-[9px] font-bold uppercase block text-orange-200">Médias & Lux</span>
                      <span className="text-[8px] text-slate-500 block mt-0.5">Variação L/O</span>
                    </div>

                    {/* PID UPDATE */}
                    <div 
                      onClick={() => handleNodeClick("pid-update")}
                      className={`cursor-pointer transition-all border p-3 rounded-lg font-mono text-center ${
                        selectedNode === "pid-update" ? "border-orange-400 bg-orange-950/30" : "border-orange-900/60 bg-[#d84315]/5"
                      }`}
                    >
                      <Settings className="w-4 h-4 text-orange-400 mx-auto mb-1.5 animate-spin" style={{ animationDuration: "3s" }} />
                      <span className="text-[9px] font-bold uppercase block text-orange-200">Algoritmo PID</span>
                      <span className="text-[8px] text-slate-500 block mt-0.5">pidCon.update()</span>
                    </div>

                  </div>

                </div>

                {/* END CONVERGENCE CONVERSION */}
                <div className="flex justify-center items-center py-1">
                  <ArrowDown className="w-4 h-4 text-slate-700" />
                </div>

                {/* SERVOMOTOR COMMAND */}
                <div 
                  onClick={() => handleNodeClick("motor-write")}
                  className={`cursor-pointer transition-all border p-4 rounded-xl font-mono text-center relative overflow-hidden flex flex-col items-center justify-center ${
                    selectedNode === "motor-write" 
                      ? "border-blue-400 bg-blue-950/35 shadow-[0_0_12px_rgba(0,240,255,0.2)]" 
                      : "border-blue-900/60 bg-blue-950/5"
                  }`}
                >
                  <Activity className="w-5 h-5 text-blue-400 mb-1.5" />
                  <span className="text-[11px] font-bold text-slate-100 uppercase mb-0.5">motor.writeMicroseconds()</span>
                  <p className="text-[9px] text-slate-400 max-w-md">Emissão física definitiva do sinal PWM de ciclo de trabalho de posicionamento mecânico.</p>
                </div>

                <div className="flex justify-between items-center px-4">
                  {/* DEBUG */}
                  <div 
                    onClick={() => handleNodeClick("debug-output")}
                    className={`cursor-pointer transition-all border px-3 py-1.5 rounded font-mono flex items-center gap-2 ${
                      selectedNode === "debug-output" ? "border-slate-500 opacity-100 bg-slate-900" : "border-slate-800 opacity-60 bg-slate-950/20"
                    }`}
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span className="text-[9px] font-bold uppercase">Log UART</span>
                  </div>

                  <span className="text-[10px] font-mono text-slate-500 tracking-wider font-bold">REPETIR CICLO AUTOMATICAMENTE</span>
                </div>

              </div>

            </div>

        </div>

        {/* RIGHT COLUMN: DETAIL WORKSHOP FOR HIGHLIGHTED NODES */}
        <div className="lg:col-span-4 bg-[#0a0b12] border border-slate-800/85 rounded-lg p-4 flex flex-col justify-between min-h-[320px]">
          <div>
            <div className={`p-1.5 rounded border inline-block text-[10px] font-mono font-bold uppercase mb-3 ${getCategoryTheme(selectedNodeObj.category)}`}>
              {selectedNodeObj.category === "inactive" ? "// ESTADO INATIVO NO HARDWARE" : `// REGISTRO DE FLUXO: ${selectedNodeObj.category.toUpperCase()}`}
            </div>

            <h3 className="font-mono text-sm text-white font-bold tracking-tight">
              {selectedNodeObj.title}
            </h3>
            
            {selectedNodeObj.subtitle && (
              <span className="font-mono text-[10px] text-slate-500 block mt-0.5">
                {selectedNodeObj.subtitle}
              </span>
            )}

            <p className="text-xs text-slate-300 mt-4 leading-relaxed">
              {selectedNodeObj.desc}
            </p>

            <div className="mt-5 p-3.5 bg-black/40 rounded border border-slate-900 text-[11px] leading-relaxed text-slate-400">
              <div className="font-mono text-[9px] text-[#00f0ff] font-bold uppercase mb-1.5 flex items-center gap-1">
                <HelpCircle className="w-3 h-3" /> Detalhamento de Operação:
              </div>
              {selectedNodeObj.details}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-900 text-center">
            <span className="text-[10px] font-mono text-slate-500">
              Selecione caixas no fluxo interativo para visualizar o registro lógico.
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
