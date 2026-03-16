import React from "react";
import Icon from "@/components/ui/icon";

const INFO_CARDS = [
  {
    icon: "Brain",
    title: "Что такое прокрастинация?",
    text: "Прокрастинация — это откладывание важных дел на потом, замена их менее значимыми занятиями. Это не лень: это эмоциональная реакция на задачу, которая вызывает тревогу, скуку или неуверенность.",
    color: "from-violet-500/20 to-indigo-500/20",
    border: "border-violet-500/30",
  },
  {
    icon: "Zap",
    title: "Почему мы прокрастинируем?",
    text: "Мозг избегает дискомфорта прямо сейчас ради мгновенного удовольствия. Перфекционизм, страх неудачи, размытые цели и усталость — главные триггеры. Задача кажется огромной, и мы не знаем с чего начать.",
    color: "from-orange-500/20 to-rose-500/20",
    border: "border-orange-500/30",
  },
  {
    icon: "Sparkles",
    title: "Как с этим бороться?",
    text: "Разбивайте задачи на микрошаги. Используйте технику «2 минуты»: если дело занимает меньше 2 минут — сделайте сразу. Убирайте отвлекающие факторы. Награждайте себя за каждый шаг.",
    color: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/30",
  },
  {
    icon: "Clock",
    title: "Техника Помодоро",
    text: "25 минут фокусной работы + 5 минут отдыха. После 4 циклов — длинный перерыв 20-30 минут. Этот метод превращает неподъёмную задачу в серию маленьких спринтов, которые мозг воспринимает легко.",
    color: "from-sky-500/20 to-blue-500/20",
    border: "border-sky-500/30",
  },
];

interface HeroInfoSectionProps {
  homeRef: React.RefObject<HTMLDivElement>;
  infoRef: React.RefObject<HTMLDivElement>;
  onNavigate: (id: string) => void;
}

export default function HeroInfoSection({ homeRef, infoRef, onNavigate }: HeroInfoSectionProps) {
  return (
    <>
      {/* HERO */}
      <section ref={homeRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ background: "radial-gradient(circle,#7c3aed,transparent)" }} />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15"
            style={{ background: "radial-gradient(circle,#db2777,transparent)", animationDelay: "1s" }} />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-3xl opacity-10"
            style={{ background: "radial-gradient(circle,#4f46e5,transparent)" }} />
          <div className="absolute inset-0" style={{
            backgroundImage: "linear-gradient(rgba(124,58,237,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.06) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
            style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)", color: "#c4b5fd" }}>
            <Icon name="Sparkles" size={13} />
            Образовательный ресурс
          </div>

          <h1 className="leading-none mb-6" style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}>
            <span className="block text-white" style={{ fontSize: "clamp(3rem,10vw,7rem)" }}>ТЫ</span>
            <span className="block" style={{
              fontSize: "clamp(2.5rem,9vw,6.5rem)",
              background: "linear-gradient(135deg,#a78bfa,#f472b6,#fb923c)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>ОТКЛАДЫВАЕШЬ?</span>
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
            Разберись с прокрастинацией раз и навсегда. Узнай что это, пройди тест
            и получи конкретный план действий для любой задачи.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => onNavigate("info")}
              className="px-8 py-4 rounded-2xl font-semibold text-lg transition-all hover:opacity-90 hover:scale-105"
              style={{ background: "linear-gradient(135deg,#7c3aed,#db2777)", boxShadow: "0 20px 40px rgba(124,58,237,0.3)" }}>
              Узнать больше
            </button>
            <button onClick={() => onNavigate("test")}
              className="px-8 py-4 rounded-2xl font-semibold text-lg transition-all hover:scale-105"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
              Пройти тест →
            </button>
          </div>

          <div className="mt-20 grid grid-cols-3 gap-8 max-w-sm mx-auto">
            {[
              { num: "88%", label: "людей прокрастинируют" },
              { num: "4 ч", label: "теряется ежедневно" },
              { num: "3 шага", label: "до изменений" },
            ].map((s) => (
              <div key={s.num} className="text-center">
                <div style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "1.75rem", background: "linear-gradient(135deg,#a78bfa,#f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {s.num}
                </div>
                <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce" style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.75rem" }}>
          <span>Прокрути вниз</span>
          <Icon name="ChevronDown" size={15} />
        </div>
      </section>

      {/* INFO */}
      <section ref={infoRef} className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{ background: "rgba(79,70,229,0.12)", border: "1px solid rgba(79,70,229,0.25)", color: "#a5b4fc" }}>
              <Icon name="BookOpen" size={13} />
              Информация
            </div>
            <h2 className="leading-none mb-4" style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "clamp(2rem,6vw,4rem)" }}>
              ВСЁ, ЧТО НУЖНО
              <span className="block" style={{ background: "linear-gradient(135deg,#818cf8,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                ЗНАТЬ
              </span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "1.05rem" }}>Четыре ключевых блока о природе прокрастинации</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {INFO_CARDS.map((card, i) => (
              <div key={i}
                className="p-7 rounded-2xl transition-transform duration-300 hover:scale-[1.02] group"
                style={{ background: `linear-gradient(135deg, var(--card-bg-${i}))`, border: `1px solid var(--card-border-${i})` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(255,255,255,0.08)" }}>
                    <Icon name={card.icon as "Brain" | "Zap" | "Sparkles" | "Clock"} size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-white mb-3" style={{ fontFamily: "'Oswald',sans-serif" }}>{card.title}</h3>
                    <p className="leading-relaxed text-[15px]" style={{ color: "rgba(255,255,255,0.6)" }}>{card.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-2xl" style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.12),rgba(219,39,119,0.08))", border: "1px solid rgba(124,58,237,0.2)" }}>
            <div className="flex items-center gap-3 mb-4">
              <Icon name="Lightbulb" size={20} style={{ color: "#facc15" }} />
              <span className="font-semibold text-lg text-white" style={{ fontFamily: "'Oswald',sans-serif" }}>Быстрые советы</span>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
              {["🎯 Правило 2 минут", "📱 Телефон — в другую комнату", "📝 Записывай все задачи", "🏆 Отмечай маленькие победы"].map((tip) => (
                <div key={tip} className="px-4 py-3 rounded-xl text-sm transition-colors"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.65)" }}>
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
