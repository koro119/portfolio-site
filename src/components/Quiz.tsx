import { useMemo, useState } from 'react';
import { RotateCcw, Sparkles } from 'lucide-react';
import { aboutConfig } from '../config';

type ArchetypeKey = keyof typeof aboutConfig.archetypes;

interface QuizState {
  done: boolean;
  step: number;
  answers: Record<string, string>; // questionId -> option label
  result: ArchetypeKey | null;
}

/** The "model": weighted scoring over 4 dimensions → archetype readout. */
function score(answers: Record<string, string>): ArchetypeKey {
  const totals: Record<ArchetypeKey, number> = { velocity: 0, idea: 0, systems: 0, money: 0 };

  for (const question of aboutConfig.questions) {
    const chosen = answers[question.id];
    if (!chosen) continue;
    const option = question.options.find((o) => o.label === chosen);
    if (!option) continue;
    for (const [key, pts] of Object.entries(option.points)) {
      totals[key as ArchetypeKey] += pts;
    }
  }

  const best = Object.entries(totals).sort((a, b) => b[1] - a[1])[0];
  return (best[0] as ArchetypeKey) ?? 'velocity';
}

export function Quiz() {
  const questions = aboutConfig.questions;
  const [state, setState] = useState<QuizState>({
    done: false,
    step: 0,
    answers: {},
    result: null,
  });

  const question = questions[state.step];
  const progress = state.done ? 100 : Math.round((state.step / questions.length) * 100);

  const pick = (label: string) => {
    const answers = { ...state.answers, [question.id]: label };
    if (state.step + 1 >= questions.length) {
      const result = score(answers);
      setState({ done: true, step: state.step + 1, answers, result });
    } else {
      setState({ ...state, step: state.step + 1, answers });
    }
  };

  const restart = () =>
    setState({ done: false, step: 0, answers: {}, result: null });

  const resultText = state.result ? aboutConfig.archetypes[state.result] : null;

  const archetypeDots = useMemo(
    () => Object.keys(aboutConfig.archetypes) as ArchetypeKey[],
    []
  );

  return (
    <div className="neo-card p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className="w-4 h-4 text-violet-300" />
        <h3 className="text-xl font-semibold text-white">{aboutConfig.quizTitle}</h3>
      </div>
      <p className="text-sm text-violet-200/60 mb-6">{aboutConfig.quizIntro}</p>

      {/* Progress */}
      <div className="h-1 bg-violet-500/10 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {!state.done && question && (
        <div key={question.id}>
          <p className="text-white font-medium mb-4">
            <span className="text-violet-300 font-mono text-sm mr-2">
              Q{state.step + 1}/{questions.length}
            </span>
            {question.question}
          </p>
          <div className="space-y-2.5">
            {question.options.map((option) => (
              <button
                key={option.label}
                onClick={() => pick(option.label)}
                className="w-full text-left px-4 py-3 rounded-lg border border-violet-400/15 bg-violet-500/5 hover:bg-violet-500/15 hover:border-violet-400/40 text-sm text-violet-100/90 transition-all duration-200"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {state.done && resultText && state.result && (
        <div>
          <p className="font-mono text-[0.7rem] tracking-widest text-fuchsia-300/80 uppercase mb-3">
            Readout generated
          </p>
          <h4 className="text-2xl font-bold text-gradient mb-3">{resultText.title}</h4>
          <p className="text-sm text-violet-200/70 leading-relaxed mb-5">{resultText.text}</p>

          <div className="flex flex-wrap items-center gap-2 mb-6">
            {archetypeDots.map((key) => (
              <span
                key={key}
                className={`chip ${key === state.result ? 'chip-pink' : ''}`}
              >
                {aboutConfig.archetypes[key].title}
              </span>
            ))}
          </div>

          <div className="border-t border-violet-400/10 pt-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <button
              onClick={restart}
              className="inline-flex items-center gap-2 text-sm text-violet-200/70 hover:text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Take it again
            </button>
            <p className="text-xs text-violet-200/40 sm:ml-auto max-w-sm">
              {aboutConfig.quizNote}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
