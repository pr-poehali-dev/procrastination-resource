import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "info", label: "Информация" },
  { id: "test", label: "Тест" },
  { id: "planner", label: "Планнер" },
];

interface NavBarProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

export default function NavBar({ activeSection, onNavigate }: NavBarProps) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
      style={{ background: "rgba(7,7,14,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div className="flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "linear-gradient(135deg,#7c3aed,#db2777)" }}
        >
          <Icon name="Zap" size={15} className="text-white" />
        </div>
        <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: "1.1rem", letterSpacing: "0.05em" }}>
          ПРОКРАСТИ<span style={{ color: "#a78bfa" }}>НЕТ</span>
        </span>
      </div>

      <div
        className="hidden md:flex items-center gap-1 rounded-full px-2 py-1.5"
        style={{ background: "rgba(255,255,255,0.05)" }}
      >
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300"
            style={
              activeSection === item.id
                ? { background: "linear-gradient(135deg,#7c3aed,#db2777)", color: "#fff" }
                : { color: "rgba(255,255,255,0.5)" }
            }
          >
            {item.label}
          </button>
        ))}
      </div>

      <button
        onClick={() => onNavigate("test")}
        className="px-4 py-2 rounded-full text-sm font-semibold transition-opacity hover:opacity-80"
        style={{ background: "linear-gradient(135deg,#7c3aed,#db2777)" }}
      >
        Пройти тест
      </button>
    </nav>
  );
}
