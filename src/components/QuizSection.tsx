import React, { useState } from "react";
import Icon from "@/components/ui/icon";

const QUIZ_QUESTIONS = [
  {
    question: "Как часто вы откладываете важные задачи на потом?",
    options: ["Почти никогда", "Иногда", "Часто", "Почти всегда"],
  },
  {
    question: "Когда наступает дедлайн, вы обычно...",
    options: ["Сдаю работу заранее", "Сдаю вовремя", "Немного опаздываю", "Часто пропускаю дедлайны"],
  },
  {
    question: "Как вы реагируете на большую сложную задачу?",
    options: ["Сразу разбиваю на части", "Начинаю, но медленно", "Долго думаю перед стартом", "Избегаю как можно дольше"],
  },
  {
    question: "Сколько незавершённых дел у вас сейчас «висит»?",
    options: ["0–1", "2–3", "4–6", "Больше 7"],
  },
  {
    question: "Когда вы чувствуете вину за несделанное дело?",
    options: ["Почти никогда", "Изредка", "Регулярно", "Постоянно"],
  },
  {
    question: "Насколько часто вы отвлекаетесь на соцсети/телефон во время работы?",
    options: ["Почти никогда", "Раз в час", "Несколько раз в час", "Постоянно"],
  },
  {
    question: "Как вы относитесь к перфекционизму в своей работе?",
    options: ["Не перфекционист", "Слегка перфекционист", "Довольно строг к себе", "Всё должно быть идеально"],
  },
  {
    question: "Сколько времени уходит на «разгон» перед началом работы?",
    options: ["Минуты", "15–30 минут", "Около часа", "Несколько часов"],
  },
  {
    question: "Как часто вы думаете «начну с понедельника / с нового года»?",
    options: ["Почти никогда", "Иногда", "Регулярно", "Это мой девиз"],
  },
  {
    question: "Влияет ли прокрастинация на вашу жизнь?",
    options: ["Нет, я справляюсь", "Немного мешает", "Заметно влияет", "Серьёзная проблема"],
  },
];

function getResult(score: number) {
  if (score <= 10)
    return {
      level: "Низкий уровень",
      desc: "Прокрастинация почти не влияет на вашу жизнь. Вы умеете управлять временем и энергией. Отличный результат — держите этот темп!",
      color: "text-emerald-400",
      bg: "from-emerald-500/20 to-teal-500/20",
      border: "border-emerald-500/30",
      emoji: "🌟",
      resultColor: "#34d399",
      bgStyle: "rgba(16,185,129,0.15),rgba(20,184,166,0.1)",
    };
  if (score <= 20)
    return {
      level: "Умеренный уровень",
      desc: "Прокрастинация есть, но вы с ней справляетесь. Попробуйте разбивать задачи на микрошаги и использовать технику Помодоро — это поднимет вашу продуктивность ещё выше.",
      color: "text-yellow-400",
      bg: "from-yellow-500/20 to-orange-500/20",
      border: "border-yellow-500/30",
      emoji: "⚡",
      resultColor: "#facc15",
      bgStyle: "rgba(234,179,8,0.15),rgba(249,115,22,0.1)",
    };
  if (score <= 30)
    return {
      level: "Высокий уровень",
      desc: "Прокрастинация заметно влияет на вашу жизнь. Начните с малого: используйте планнер ниже, чтобы разбивать любую задачу на маленькие шаги. Один шаг — уже победа!",
      color: "text-orange-400",
      bg: "from-orange-500/20 to-rose-500/20",
      border: "border-orange-500/30",
      emoji: "🔥",
      resultColor: "#fb923c",
      bgStyle: "rgba(249,115,22,0.15),rgba(239,68,68,0.1)",
    };
  return {
    level: "Критический уровень",
    desc: "Прокрастинация серьёзно мешает вам. Это не приговор — это сигнал действовать. Попробуйте планнер задач ниже: разбейте хотя бы одно дело прямо сейчас.",
    color: "text-rose-400",
    bg: "from-rose-500/20 to-pink-500/20",
    border: "border-rose-500/30",
    emoji: "💪",
    resultColor: "#fb7185",
    bgStyle: "rgba(244,63,94,0.15),rgba(236,72,153,0.1)",
  };
}

interface QuizSectionProps {
  testRef: React.RefObject<HTMLDivElement>;
  onNavigate: (id: string) => void;
}

export default function QuizSection({ testRef, onNavigate }: QuizSectionProps) {
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizDone, setQuizDone] = useState(false);

  const handleAnswer = (qIdx: number, aIdx: number) => {
    const updated = [...quizAnswers];
    updated[qIdx] = aIdx;
    setQuizAnswers(updated);
  };

  const submitQuiz = () => setQuizDone(true);

  const quizScore = quizAnswers.reduce((s, v) => s + (v ?? 0), 0);
  const result = getResult(quizScore);
  const answered = quizAnswers.filter((v) => v !== undefined).length;

  return (
    <section ref={testRef} className="py-24 px-6" style={{ background: "linear-gradient(180deg,transparent,rgba(124,58,237,0.06) 50%,transparent)" }}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ background: "rgba(219,39,119,0.12)", border: "1px solid rgba(219,39,119,0.25)", color: "#f9a8d4" }}>
            <Icon name="ClipboardCheck" size={13} />
            Тест
          </div>
          <h2 className="leading-none mb-3" style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "clamp(2rem,6vw,3.5rem)" }}>
            ТВОЙ УРОВЕНЬ
            <span className="block" style={{ background: "linear-gradient(135deg,#f472b6,#fb923c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              ПРОКРАСТИНАЦИИ
            </span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)" }}>10 вопросов · около 2 минут</p>
        </div>

        {!quizDone ? (
          <div className="space-y-5">
            {QUIZ_QUESTIONS.map((q, qi) => (
              <div key={qi} className="p-5 rounded-2xl transition-colors"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex items-start gap-3 mb-4">
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 text-white"
                    style={{ fontFamily: "'Oswald',sans-serif", background: "linear-gradient(135deg,#7c3aed,#db2777)" }}>
                    {qi + 1}
                  </span>
                  <p className="text-white font-medium leading-snug">{q.question}</p>
                </div>
                <div className="grid grid-cols-1 gap-2 ml-10">
                  {q.options.map((opt, oi) => (
                    <button key={oi} onClick={() => handleAnswer(qi, oi)}
                      className="px-4 py-2.5 rounded-xl text-sm text-left transition-all duration-200"
                      style={quizAnswers[qi] === oi
                        ? { background: "rgba(124,58,237,0.25)", border: "1px solid rgba(167,139,250,0.6)", color: "#fff" }
                        : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)" }}>
                      <span style={{ opacity: 0.4, marginRight: "8px" }}>{["А", "Б", "В", "Г"][oi]}.</span>{opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between pt-2">
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
                Отвечено: {answered} / {QUIZ_QUESTIONS.length}
              </span>
              <button onClick={submitQuiz} disabled={answered < QUIZ_QUESTIONS.length}
                className="px-8 py-3 rounded-xl font-semibold transition-all"
                style={answered === QUIZ_QUESTIONS.length
                  ? { background: "linear-gradient(135deg,#7c3aed,#db2777)", color: "#fff", boxShadow: "0 10px 30px rgba(124,58,237,0.3)" }
                  : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.25)", cursor: "not-allowed" }}>
                Узнать результат
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8 rounded-2xl text-center"
            style={{ background: `linear-gradient(135deg,${result.bgStyle})`, border: "1px solid rgba(255,255,255,0.15)" }}>
            <div className="text-6xl mb-4">{result.emoji}</div>
            <h3 className="font-bold text-3xl mb-2" style={{ fontFamily: "'Oswald',sans-serif", color: result.resultColor }}>
              {result.level}
            </h3>
            <div className="text-5xl font-bold mb-4" style={{ fontFamily: "'Oswald',sans-serif", color: "rgba(255,255,255,0.15)" }}>
              {quizScore} / 27
            </div>
            <p className="leading-relaxed mb-8 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.65)" }}>{result.desc}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => { setQuizDone(false); setQuizAnswers([]); }}
                className="px-6 py-3 rounded-xl font-medium transition-colors"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
                Пройти снова
              </button>
              <button onClick={() => onNavigate("planner")}
                className="px-6 py-3 rounded-xl font-medium transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg,#7c3aed,#db2777)", boxShadow: "0 10px 25px rgba(124,58,237,0.3)" }}>
                Открыть планнер →
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
