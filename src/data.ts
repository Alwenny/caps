import { TeamMember } from "./types";

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "gabriel-silveira",
    name: "Gabriel Silveira-202305201",
    role: "Líder de Equipe",
    cyberRole: "Lead Netrunner / Project Manager",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80",
    bio: "Responsável pelo gerenciamento geral do escopo, cronograma, divisão de sub-rotinas e consolidação da integração do firmware ESP32 e dashboard local.",
  },
  {
    id: "anna-beluco",
    name: "Anna Carolina Poscai Beluco-202211484",
    role: "Membro",
    cyberRole: "Core Hardware Architect / Analyst",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    bio: "Projetou e validou a estabilização mecânica do frame solar, cálculo do centro de gravidade para o servo M2, e otimização dos divisores de tensão dos LDRs.",
  },
  {
    id: "davi-machado",
    name: "Davi Barbosa Machado-202337585",
    role: "Membro",
    cyberRole: "Senior Firmware Scripter",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&h=150&q=80",
    bio: "Implementou o código em C++ do ESP32, incluindo os algoritmos diferenciais de luz, mapeamento de duty-cycles e decodificação do acelerômetro via I2C.",
  },
  {
    id: "joao-wolf",
    name: "João Paulo Wolf-202326501",
    role: "Membro",
    cyberRole: "Network & Systems Integrator",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    bio: "Trabalhou na integração do Wi-Fi móvel, montagem do protocolo HTTP cliente-servidor e na conversão da infraestrutura do Raspberry Pi para Host PC local.",
  },
  {
    id: "miguel-ferreira",
    name: "Miguel Augusto Ferreira-202319429",
    role: "Membro",
    cyberRole: "Electronics Grid Engineer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    bio: "Montou o esquema elétrico no KiCad, depurou ruídos nos pinos analógicos causados pelos picos de corrente do servomotor e estruturou os barramentos de energia.",
  },
  {
    id: "takeshi-matsunaga",
    name: "Takeshi Matsunaga-202324035",
    role: "Membro",
    cyberRole: "Subsystem Optimization Engineer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80",
    bio: "Focado na sintonia fina das constantes de tolerância para evitar oscilações persistentes do servo (hunting state) e testes de robustez sob luz externa.",
  }
];

export const TECHNICAL_SPECS = {
  esp32: {
    title: "ESP32 Node",
    details: "Microcontrolador de 32-bits dual-core, operando como o cérebro físico que amostra os analógicos (LDRs) em intervalos regulares e comanda as saídas via PWM sintonizado de 50Hz.",
  },
  ldrs: {
    title: "Sensores LDR",
    details: "Sensores resistivos foto-dependentes acoplados a divisores de tensão com resistores fixos de 10kΩ. Amostram a densidade de fluxo luminoso incidente nos quadrantes Leste e Oeste.",
  },
  accelerometer: {
    title: "Acelerômetro GY-01",
    details: "Módulo inercial contendo acelerômetro eletrônico. Comunica-se com o ESP32 através de uma linha física I2C blindada contra interferências de EMI.",
  },
  servo: {
    title: "Servomotor M2",
    details: "Atuador de rotação contínua robusto. Acionado por pulsos de largura modulada (PWM), girando as engrenagens físicas para mudar o ângulo do painel solar no eixo longitudinal.",
  },
  communication: {
    title: "Link de Rede",
    details: "A conexão é feita através de rede sem fio (Wi-Fi local do celular). As leituras são serializadas em formato JSON e postadas em requisições HTTP para a API local.",
  }
};

export const DEVELOPMENT_STAGES = [
  {
    title: "Etapa 1: Pesquisa & Dimensionamento",
    desc: "Levantamento de consumo dos atuadores e viabilidade do ESP32. Dimensionamento dos divisores de tensão dos sensores LDR e estudo cinemático sobre inclinação de painéis solares."
  },
  {
    title: "Etapa 2: Desenho Esquemático & Hardware",
    desc: "Implementação do esquema eletrônico 'Controle automatizado de painel solar' no KiCad. Soldagem estrutural dos componentes da prototipagem, blindagens dos fios e montagem mecânica do frame giratório."
  },
  {
    title: "Etapa 3: Firmware & Servidor Local",
    desc: "Desenvolvimento do firmware C++ embarcado. Programação de um servidor assíncrono em Python com recepção HTTP POST, armazenamento em banco de dados SQLite e interface gráfica de dashboard."
  },
  {
    title: "Etapa 4: Validação & Ensaios em Bancada",
    desc: "Testes práticos direcionando fachos de luz polarizada de lanternas sob o array fotovoltaico. Sintonia fina do tempo de estabilização do servomotor e gravação dos relatórios de rastreabilidade."
  }
];

export const REQUIRED_VIDEOS = [
  {
    id: "demo",
    title: "Apresentação e Vídeo de Funcionamento",
    url: "https://youtu.be/6o62wL99FsY",
    embedId: "6o62wL99FsY",
    desc: "Apresentação do protótipo CAPS mostrando o projeto físico em pleno funcionamento prático e respondendo aos estímulos diferenciais de luz em bancada."
  },
  {
    id: "control",
    title: "Explicação Técnica da Parte de Controle",
    url: "https://youtu.be/RM-5yvvor5o",
    embedId: "RM-5yvvor5o",
    desc: "Análise técnica minuciosa de controle, explicando os algoritmos de sensibilidade, leitura analógica dos LDRs através do ESP32 e o acionamento do servomotor."
  },
  {
    id: "bancada",
    title: "Apresentação da Bancada",
    url: "https://youtu.be/poRV1Ip-kJU",
    embedId: "poRV1Ip-kJU",
    desc: "Demonstração detalhada da montagem física da bancada de ensaios, destacando as ligações elétricas, o acoplamento do servomotor e os sensores LDR montados no frame."
  }
];
