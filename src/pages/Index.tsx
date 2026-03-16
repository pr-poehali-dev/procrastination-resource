import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "info", label: "Информация" },
  { id: "test", label: "Тест" },
  { id: "planner", label: "Планнер" },
];

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
    };
  if (score <= 20)
    return {
      level: "Умеренный уровень",
      desc: "Прокрастинация есть, но вы с ней справляетесь. Попробуйте разбивать задачи на микрошаги и использовать технику Помодоро — это поднимет вашу продуктивность ещё выше.",
      color: "text-yellow-400",
      bg: "from-yellow-500/20 to-orange-500/20",
      border: "border-yellow-500/30",
      emoji: "⚡",
    };
  if (score <= 30)
    return {
      level: "Высокий уровень",
      desc: "Прокрастинация заметно влияет на вашу жизнь. Начните с малого: используйте планнер ниже, чтобы разбивать любую задачу на маленькие шаги. Один шаг — уже победа!",
      color: "text-orange-400",
      bg: "from-orange-500/20 to-rose-500/20",
      border: "border-orange-500/30",
      emoji: "🔥",
    };
  return {
    level: "Критический уровень",
    desc: "Прокрастинация серьёзно мешает вам. Это не приговор — это сигнал действовать. Попробуйте планнер задач ниже: разбейте хотя бы одно дело прямо сейчас.",
    color: "text-rose-400",
    bg: "from-rose-500/20 to-pink-500/20",
    border: "border-rose-500/30",
    emoji: "💪",
  };
}

function generateSteps(task: string): string[] {
  const lower = task.toLowerCase();

  if (lower.includes("отчёт") || lower.includes("отчет") || lower.includes("доклад") || lower.includes("презентация")) {
    return [
      `Открой чистый документ и напиши заголовок: «${task}»`,
      "Набросай структуру из 3–5 пунктов за 10 минут (без деталей)",
      "Заполни самый лёгкий раздел — тот, который знаешь лучше всего",
      "Найди и вставь 2–3 ключевых факта или данных",
      "Напиши черновик оставшихся разделов (не редактируй сейчас!)",
      "Перечитай и отредактируй весь документ",
      "Оформи финальную версию и сохрани",
    ];
  }
  if (lower.includes("код") || lower.includes("програм") || lower.includes("сайт") || lower.includes("приложен")) {
    return [
      `Опиши в 1–2 предложениях что именно нужно сделать в «${task}»`,
      "Разбей на технические подзадачи, запиши список",
      "Настрой рабочее окружение: открой нужные файлы и инструменты",
      "Реализуй самую простую часть — минимальный рабочий вариант",
      "Протестируй и исправь ошибки",
      "Добавь оставшийся функционал по одному пункту",
      "Проведи финальный код-ревью и задокументируй",
    ];
  }
  if (lower.includes("убрать") || lower.includes("уборка") || lower.includes("чисти") || lower.includes("порядок")) {
    return [
      "Поставь таймер на 10 минут — убирай только пока он тикает",
      "Начни с самого видимого: стол или пол в центре комнаты",
      "Собери все вещи не на своём месте в одну коробку",
      "Разложи вещи из коробки по местам",
      "Протри поверхности влажной тряпкой",
      "Оцени результат и реши, что ещё требует внимания",
    ];
  }
  if (lower.includes("письм") || lower.includes("email") || lower.includes("написать")) {
    return [
      `Открой редактор и напиши тему/заголовок для «${task}»`,
      "Запиши 3 ключевых мысли, которые хочешь передать",
      "Напиши черновик — не думай о стиле, просто пиши",
      "Перечитай и улучши структуру",
      "Проверь орфографию и тон",
      "Отправь / опубликуй",
    ];
  }
  if (lower.includes("учить") || lower.includes("изучить") || lower.includes("курс") || lower.includes("книга")) {
    return [
      `Определи конкретную цель: что именно ты хочешь знать после «${task}»?`,
      "Найди материал и открой первую страницу/урок",
      "Прочитай/посмотри первые 15 минут без остановки",
      "Запиши 3 главных идеи из изученного",
      "Сделай простое практическое упражнение по теме",
      "Повтори завтра следующий блок по расписанию",
    ];
  }
  return [
    `Сформулируй точный результат: как выглядит завершённое «${task}»?`,
    "Запиши все подзадачи, которые нужны — без фильтрации, любые идеи",
    "Выбери самый маленький первый шаг (5–10 минут максимум)",
    "Устрани отвлечения: убери телефон, закрой лишние вкладки",
    "Выполни первый шаг прямо сейчас — не думай, просто начни",
    "Отметь прогресс и определи следующий шаг",
    "Продолжай цикл до полного завершения задачи",
  ];
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizDone, setQuizDone] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  const [steps, setSteps] = useState<{ text: string; done: boolean }[]>([]);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [newStepText, setNewStepText] = useState("");
  const [addingStep, setAddingStep] = useState(false);

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

  const handleAnswer = (qIdx: number, aIdx: number) => {
    const updated = [...quizAnswers];
    updated[qIdx] = aIdx;
    setQuizAnswers(updated);
  };

  const submitQuiz = () => setQuizDone(true);

  const quizScore = quizAnswers.reduce((s, v) => s + (v ?? 0), 0);
  const result = getResult(quizScore);
  const answered = quizAnswers.filter((v) => v !== undefined).length;

  const handleGenerateSteps = () => {
    if (!taskInput.trim()) return;
    setSteps(generateSteps(taskInput).map((t) => ({ text: t, done: false })));
  };

  const toggleStep = (i: number) => {
    const u = [...steps];
    u[i].done = !u[i].done;
    setSteps(u);
  };

  const startEdit = (i: number) => { setEditingIdx(i); setEditText(steps[i].text); };
  const saveEdit = (i: number) => {
    const u = [...steps];
    u[i].text = editText;
    setSteps(u);
    setEditingIdx(null);
  };
  const deleteStep = (i: number) => setSteps(steps.filter((_, idx) => idx !== i));
  const addStep = () => {
    if (!newStepText.trim()) return;
    setSteps([...steps, { text: newStepText, done: false }]);
    setNewStepText("");
    setAddingStep(false);
  };

  const doneCount = steps.filter((s) => s.done).length;
  const progress = steps.length > 0 ? Math.round((doneCount / steps.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#07070e] text-white" style={{ fontFamily: "'Golos Text', sans-serif" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: "rgba(7,7,14,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#7c3aed,#db2777)" }}>
            <Icon name="Zap" size={15} className="text-white" />
          </div>
          <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: "1.1rem", letterSpacing: "0.05em" }}>
            ПРОКРАСТИ<span style={{ color: "#a78bfa" }}>НЕТ</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-1 rounded-full px-2 py-1.5"
          style={{ background: "rgba(255,255,255,0.05)" }}>
          {NAV_ITEMS.map((item) => (
            <button key={item.id} onClick={() => scrollTo(item.id)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300"
              style={activeSection === item.id
                ? { background: "linear-gradient(135deg,#7c3aed,#db2777)", color: "#fff" }
                : { color: "rgba(255,255,255,0.5)" }}>
              {item.label}
            </button>
          ))}
        </div>
        <button onClick={() => scrollTo("test")}
          className="px-4 py-2 rounded-full text-sm font-semibold transition-opacity hover:opacity-80"
          style={{ background: "linear-gradient(135deg,#7c3aed,#db2777)" }}>
          Пройти тест
        </button>
      </nav>

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
            <button onClick={() => scrollTo("info")}
              className="px-8 py-4 rounded-2xl font-semibold text-lg transition-all hover:opacity-90 hover:scale-105"
              style={{ background: "linear-gradient(135deg,#7c3aed,#db2777)", boxShadow: "0 20px 40px rgba(124,58,237,0.3)" }}>
              Узнать больше
            </button>
            <button onClick={() => scrollTo("test")}
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

      {/* TEST */}
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
              style={{ background: `linear-gradient(135deg,${result.bg.includes("emerald") ? "rgba(16,185,129,0.15),rgba(20,184,166,0.1)" : result.bg.includes("yellow") ? "rgba(234,179,8,0.15),rgba(249,115,22,0.1)" : result.bg.includes("orange") ? "rgba(249,115,22,0.15),rgba(239,68,68,0.1)" : "rgba(244,63,94,0.15),rgba(236,72,153,0.1)"})`, border: "1px solid rgba(255,255,255,0.15)" }}>
              <div className="text-6xl mb-4">{result.emoji}</div>
              <h3 className="font-bold text-3xl mb-2" style={{ fontFamily: "'Oswald',sans-serif", color: result.color.replace("text-", "") === "emerald-400" ? "#34d399" : result.color.replace("text-", "") === "yellow-400" ? "#facc15" : result.color.replace("text-", "") === "orange-400" ? "#fb923c" : "#fb7185" }}>
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
                <button onClick={() => scrollTo("planner")}
                  className="px-6 py-3 rounded-xl font-medium transition-opacity hover:opacity-90"
                  style={{ background: "linear-gradient(135deg,#7c3aed,#db2777)", boxShadow: "0 10px 25px rgba(124,58,237,0.3)" }}>
                  Открыть планнер →
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* PLANNER */}
      <section ref={plannerRef} className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)", color: "#6ee7b7" }}>
              <Icon name="ListChecks" size={13} />
              Планнер
            </div>
            <h2 className="leading-none mb-3" style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "clamp(2rem,6vw,3.5rem)" }}>
              РАЗБЕЙ ЗАДАЧУ
              <span className="block" style={{ background: "linear-gradient(135deg,#34d399,#2dd4bf)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                НА МИКРОШАГИ
              </span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.4)" }}>Введи любую задачу — получи готовый план действий</p>
          </div>

          <div className="p-6 rounded-2xl mb-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <label className="block text-sm font-medium mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>Твоя задача</label>
            <div className="flex gap-3">
              <input value={taskInput} onChange={(e) => setTaskInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerateSteps()}
                placeholder="Например: написать отчёт за квартал..."
                className="flex-1 px-4 py-3 rounded-xl text-sm focus:outline-none transition-all"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }} />
              <button onClick={handleGenerateSteps} disabled={!taskInput.trim()}
                className="px-5 py-3 rounded-xl font-semibold text-sm transition-all shrink-0 flex items-center gap-2"
                style={taskInput.trim()
                  ? { background: "linear-gradient(135deg,#059669,#0d9488)", boxShadow: "0 8px 20px rgba(5,150,105,0.3)", color: "#fff" }
                  : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.25)", cursor: "not-allowed" }}>
                <Icon name="Wand2" size={16} />
                <span className="hidden sm:inline">Разбить</span>
              </button>
            </div>
          </div>

          {steps.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{doneCount} из {steps.length} выполнено</span>
                <span className="text-sm font-semibold" style={{ color: "#34d399" }}>{progress}%</span>
              </div>
              <div className="h-2 rounded-full mb-5 overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                <div className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress}%`, background: "linear-gradient(90deg,#059669,#0d9488)" }} />
              </div>

              <div className="space-y-3">
                {steps.map((step, i) => (
                  <div key={i} className="group flex items-start gap-3 p-4 rounded-xl transition-all duration-200"
                    style={step.done
                      ? { background: "rgba(16,185,129,0.1)", border: "1px solid rgba(52,211,153,0.3)" }
                      : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <button onClick={() => toggleStep(i)}
                      className="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all"
                      style={step.done
                        ? { background: "#059669", borderColor: "#059669" }
                        : { borderColor: "rgba(255,255,255,0.25)" }}>
                      {step.done && <Icon name="Check" size={11} className="text-white" />}
                    </button>
                    <div className="flex-1 min-w-0">
                      {editingIdx === i ? (
                        <div className="flex gap-2">
                          <input value={editText} onChange={(e) => setEditText(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && saveEdit(i)}
                            className="flex-1 px-3 py-1.5 rounded-lg text-white text-sm focus:outline-none"
                            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(124,58,237,0.5)" }}
                            autoFocus />
                          <button onClick={() => saveEdit(i)} className="px-3 py-1.5 rounded-lg text-white text-sm"
                            style={{ background: "#7c3aed" }}>OK</button>
                        </div>
                      ) : (
                        <p className="text-sm leading-relaxed"
                          style={step.done ? { textDecoration: "line-through", color: "rgba(255,255,255,0.3)" } : { color: "rgba(255,255,255,0.8)" }}>
                          <span style={{ fontFamily: "'Oswald',sans-serif", opacity: 0.35, marginRight: "8px" }}>{i + 1}.</span>
                          {step.text}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <button onClick={() => startEdit(i)} className="p-1.5 rounded-lg transition-colors"
                        style={{ color: "rgba(255,255,255,0.3)" }}>
                        <Icon name="Pencil" size={13} />
                      </button>
                      <button onClick={() => deleteStep(i)} className="p-1.5 rounded-lg transition-colors"
                        style={{ color: "rgba(255,255,255,0.3)" }}>
                        <Icon name="Trash2" size={13} />
                      </button>
                    </div>
                  </div>
                ))}

                {addingStep ? (
                  <div className="flex gap-2 mt-1">
                    <input value={newStepText} onChange={(e) => setNewStepText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addStep()}
                      placeholder="Описание нового шага..."
                      className="flex-1 px-4 py-3 rounded-xl text-white text-sm focus:outline-none"
                      style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
                      autoFocus />
                    <button onClick={addStep} className="px-4 py-3 rounded-xl text-white text-sm transition-colors"
                      style={{ background: "#059669" }}>Добавить</button>
                    <button onClick={() => setAddingStep(false)} className="px-4 py-3 rounded-xl text-sm transition-colors"
                      style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>✕</button>
                  </div>
                ) : (
                  <button onClick={() => setAddingStep(true)}
                    className="w-full py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-all mt-1"
                    style={{ border: "1px dashed rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.35)" }}>
                    <Icon name="Plus" size={14} />
                    Добавить шаг
                  </button>
                )}
              </div>

              {progress === 100 && (
                <div className="mt-5 p-5 rounded-2xl text-center"
                  style={{ background: "linear-gradient(135deg,rgba(16,185,129,0.2),rgba(13,148,136,0.15))", border: "1px solid rgba(52,211,153,0.3)" }}>
                  <div className="text-4xl mb-2">🎉</div>
                  <p className="font-bold text-xl mb-1" style={{ fontFamily: "'Oswald',sans-serif", color: "#34d399" }}>Задача выполнена!</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>Отличная работа! Прокрастинация проиграла.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

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
