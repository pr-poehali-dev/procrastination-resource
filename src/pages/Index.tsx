import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";
import NavBar from "@/components/NavBar";
import HeroInfoSection from "@/components/HeroInfoSection";
import QuizSection from "@/components/QuizSection";
import PlannerSection from "@/components/PlannerSection";

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");

  const homeRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const testRef = useRef<HTMLDivElement>(null);
  const plannerRef = useRef<HTMLDivElement>(null);

  const refs: Record<string, React.RefObject<HTMLDivElement>> = {
    home: homeRef,
    info: infoRef,
    test: testRef,
    planner: plannerRef,
  };

  const scrollTo = (id: string) => {
    setActiveSection(id);
    refs[id]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#07070e] text-white" style={{ fontFamily: "'Golos Text', sans-serif" }}>

      <NavBar activeSection={activeSection} onNavigate={scrollTo} />

      <HeroInfoSection homeRef={homeRef} infoRef={infoRef} onNavigate={scrollTo} />

      <QuizSection testRef={testRef} onNavigate={scrollTo} />

      <PlannerSection plannerRef={plannerRef} />

      {/* FOOTER */}
      <footer className="py-10 px-6 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#7c3aed,#db2777)" }}>
            <Icon name="Zap" size={13} className="text-white" />
          </div>
          <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600, color: "rgba(255,255,255,0.4)" }}>
            ПРОКРАСТИ<span style={{ color: "#a78bfa" }}>НЕТ</span>
          </span>
        </div>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.2)" }}>Начни прямо сейчас. Лучшее время — это всегда сейчас.</p>
      </footer>

    </div>
  );
}
