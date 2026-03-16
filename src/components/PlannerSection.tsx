import React, { useState } from "react";
import Icon from "@/components/ui/icon";

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

interface PlannerSectionProps {
  plannerRef: React.RefObject<HTMLDivElement>;
}

export default function PlannerSection({ plannerRef }: PlannerSectionProps) {
  const [taskInput, setTaskInput] = useState("");
  const [steps, setSteps] = useState<{ text: string; done: boolean }[]>([]);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [newStepText, setNewStepText] = useState("");
  const [addingStep, setAddingStep] = useState(false);

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
  );
}
