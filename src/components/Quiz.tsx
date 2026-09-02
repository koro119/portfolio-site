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
    <div className="glass p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className="w-4 h-4 text-steel" />
        <h3 className="text-xl font-medium text-foreground">{aboutConfig.quizTitle}</h3>
      </div>
      <p className="text-sm text-meta mb-6">{aboutConfig.quizIntro}</p>

      {/* Progress */}
      <div className="h-1 bg-muted overflow-hidden mb-6">
        <div
          className="h-full bg-steel transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {!state.done && question && (
        <div key={question.id}>
          <p className="text-foreground font-medium mb-4">
            <span className="text-steel font-mono text-sm mr-2">
              Q{state.step + 1}/{questions.length}
            </span>
            {question.question}
          </p>
          <div className="space-y-2.5">
            {question.options.map((option) => (
              <button
                key={option.label}
                onClick={() => pick(option.label)}
                className="w-full text-left px-4 py-3 border border-glass-border bg-transparent hover:bg-card-hover hover:border-steel text-sm text-foreground/90 transition-colors duration-200"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {state.done && resultText && state.result && (
        <div>
          <p className="font-mono text-[0.7rem] tracking-widest text-steel uppercase mb-3">
            Readout generated
          </p>
          <h4 className="text-2xl font-medium text-foreground mb-3">{resultText.title}</h4>
          <p className="text-sm text-meta leading-relaxed mb-5">{resultText.text}</p>

          <div className="flex flex-wrap items-center gap-2 mb-6">
            {archetypeDots.map((key) => (
              <span key={key} className="chip">
                {aboutConfig.archetypes[key].title}
              </span>
            ))}
          </div>

          <div className="border-t border-glass-border pt-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <button
              onClick={restart}
              className="inline-flex items-center gap-2 px-4 min-h-[44px] bg-teal text-white text-sm font-medium hover:brightness-110 active:scale-[0.98] transition-all"
            >
              <RotateCcw className="w-4 h-4" /> Take it again
            </button>
            <p className="text-xs text-meta-dim sm:ml-auto max-w-sm">
              {aboutConfig.quizNote}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
