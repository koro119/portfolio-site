import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { terminalConfig } from '../config';
import { Terminal as TerminalIcon, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TerminalLine {
  type: 'input' | 'output';
  content: string | string[];
}

export function Terminal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', content: ['Welcome to Zylen\'s Terminal!', 'Type "help" to see available commands.', ''] },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        terminalRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: terminalRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      const content = terminalRef.current.querySelector('.terminal-content');
      if (content) {
        content.scrollTop = content.scrollHeight;
      }
    }
  }, [lines]);

  const executeCommand = useCallback((cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    const newLines: TerminalLine[] = [
      { type: 'input', content: `$ ${cmd}` },
    ];

    if (trimmedCmd === 'help') {
      newLines.push({ type: 'output', content: terminalConfig.commands.help });
    } else if (trimmedCmd === 'about') {
      newLines.push({ type: 'output', content: terminalConfig.commands.about });
    } else if (trimmedCmd === 'projects') {
      newLines.push({ type: 'output', content: terminalConfig.commands.projects });
    } else if (trimmedCmd === 'skills') {
      newLines.push({ type: 'output', content: terminalConfig.commands.skills });
    } else if (trimmedCmd === 'contact') {
      newLines.push({ type: 'output', content: terminalConfig.commands.contact });
    } else if (trimmedCmd === 'clear') {
      setLines([]);
      setInput('');
      return;
    } else if (trimmedCmd === '') {
      // Do nothing for empty input
    } else {
      newLines.push({ type: 'output', content: [`Command not found: ${cmd}`, 'Type "help" for available commands.'] });
    }

    newLines.push({ type: 'output', content: [''] });

    setLines((prev) => [...prev, ...newLines]);
    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
    setInput('');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="terminal"
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            {terminalConfig.title}
          </h2>
          <p className="text-lg text-zinc-400">{terminalConfig.subtitle}</p>
        </div>

        {/* Terminal */}
        <div
          ref={terminalRef}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 shadow-2xl shadow-black/50">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-zinc-800 border-b border-zinc-700">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 flex items-center justify-center gap-2">
                <TerminalIcon className="w-4 h-4 text-zinc-500" />
                <span className="text-sm text-zinc-400">zylen@portfolio ~ </span>
              </div>
              <div className="w-16" />
            </div>

            {/* Terminal content */}
            <div className="terminal-content h-80 sm:h-96 overflow-y-auto p-4 font-mono text-sm">
              {lines.map((line, lineIndex) => (
                <div key={lineIndex} className="mb-1">
                  {line.type === 'input' ? (
                    <span className="text-green-400">{line.content}</span>
                  ) : (
                    <div className="text-zinc-300">
                      {Array.isArray(line.content) ? (
                        line.content.map((text, textIndex) => (
                          <div key={textIndex} className={text === '' ? 'h-4' : ''}>
                            {text.split('').map((char, charIndex) => (
                              <span
                                key={charIndex}
                                className={
                                  char === '=' ? 'text-blue-400' :
                                  char === '-' ? 'text-cyan-400' :
                                  char === '>' || char === '$' ? 'text-green-400' :
                                  ''
                                }
                              >
                                {char}
                              </span>
                            ))}
                          </div>
                        ))
                      ) : (
                        line.content
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Terminal input */}
            <form onSubmit={handleSubmit} className="border-t border-zinc-800">
              <div className="flex items-center px-4 py-3">
                <span className="text-green-400 mr-2">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-zinc-300 outline-none font-mono text-sm"
                  placeholder="Type a command..."
                  autoFocus
                />
                <button
                  type="submit"
                  className="p-2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Quick commands */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {['help', 'about', 'projects', 'skills', 'contact'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                className="px-4 py-2 bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 rounded-lg text-sm text-zinc-400 hover:text-zinc-200 transition-all duration-300"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
