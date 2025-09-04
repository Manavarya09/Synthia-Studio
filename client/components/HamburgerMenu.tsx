import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Tool {
  label: string;
  value: string;
  page?: string;
  children?: Tool[];
  icon?: any;
}

interface HamburgerMenuProps {
  tools: Tool[];
  selectedTool: string;
  setSelectedTool: (tool: string) => void;
}

const HamburgerMenu = ({ tools, selectedTool, setSelectedTool }: HamburgerMenuProps) => {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const navigate = useNavigate();

  const handleExpand = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-8 left-8 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-transparent shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none"
        aria-label="Open menu"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#a78bfa"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </button>
      {open && (
        <>
          <div className="fixed top-0 left-0 h-full w-80 bg-black shadow-2xl border-r border-violet-600/40 p-8 flex flex-col gap-4 z-50 animate-slide-in overflow-y-auto max-h-screen">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold text-violet-400">Menu</span>
              <button
                onClick={() => setOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#23232a] text-violet-400 hover:bg-violet-600 hover:text-white transition-all duration-200"
                aria-label="Close menu"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {tools.map((tool) => {
                if (tool.children && tool.children.length > 0) {
                  return (
                    <div key={tool.value}>
                      <button
                        onClick={() => handleExpand(tool.value)}
                        className={`flex items-center gap-3 px-3 py-2 w-full text-left text-gray-300 hover:bg-gray-800 hover:text-white rounded transition-colors duration-150 ${expanded[tool.value] ? 'bg-gray-800 text-white' : ''}`}
                      >
                        <span className="text-base">{tool.label}</span>
                        <span className={`ml-auto transition-transform duration-300 ${expanded[tool.value] ? 'rotate-90' : ''}`}>▶</span>
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${expanded[tool.value] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                      >
                        <div className="flex flex-col gap-2 pl-6">
                          {tool.children.map((subtool) => (
                            <button
                              key={subtool.value}
                              onClick={() => {
                                setSelectedTool(subtool.value);
                                setOpen(false);
                                if (subtool.page) navigate(subtool.page);
                              }}
                              className={`flex items-center gap-3 px-3 py-2 w-full text-left text-gray-300 hover:bg-gray-800 hover:text-white rounded transition-colors duration-150 ${selectedTool === subtool.value ? 'bg-gray-800 text-white' : ''}`}
                            >
                              {subtool.icon && <subtool.icon className="h-5 w-5 text-gray-400 mr-2" />}
                              <span className="text-base">{subtool.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <button
                    key={tool.value}
                    onClick={() => {
                      setSelectedTool(tool.value);
                      setOpen(false);
                      if (tool.page) navigate(tool.page);
                    }}
                    className={`flex items-center gap-3 px-3 py-2 w-full text-left text-gray-300 hover:bg-gray-800 hover:text-white rounded transition-colors duration-150 ${selectedTool === tool.value ? 'bg-gray-800 text-white' : ''}`}
                  >
                    {tool.icon && <tool.icon className="h-5 w-5 text-gray-400 mr-2" />}
                    <span className="text-base">{tool.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
        </>
      )}
    </>
  );
};

export default HamburgerMenu;
