import { useState } from "react";
import { QUIZ_QUESTIONS } from "../../../data/festivalData";
import { useLight } from "../../../context/LightContext";

export default function QuizGame() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const { releaseLantern, playChimeNote, showToast } = useLight();

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedAnswer(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.answerIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      releaseLantern();
      playChimeNote(4);
      showToast("Correct! A light released to the sky.");
    } else {
      playChimeNote(0);
    }
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      if (score >= 4) {
        for (let i = 0; i < 3; i++) {
          setTimeout(releaseLantern, i * 200);
        }
      }
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsFinished(false);
  };

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto space-y-6 text-left">
      {!isFinished ? (
        <>
          {/* Header */}
          <div className="w-full flex items-center justify-between border-b border-amber-500/15 pb-3">
            <span className="text-xs font-semibold tracking-widest uppercase text-amber-400">
              Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}
            </span>
            <span className="text-xs text-stone-400 font-medium">
              Score: {score}
            </span>
          </div>

          {/* Question Text */}
          <h3 className="font-display font-semibold text-2xl sm:text-3xl text-ivory leading-snug">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="w-full space-y-3 pt-2">
            {currentQ.options.map((option, optIdx) => {
              const isSelected = selectedAnswer === optIdx;
              const isCorrectAnswer = optIdx === currentQ.answerIndex;

              let btnStyle = "bg-stone-900/80 border-amber-500/20 text-stone-200 hover:border-amber-400/50 hover:bg-amber-950/30";
              if (isAnswered) {
                if (isCorrectAnswer) {
                  btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-2 ring-emerald-400/40";
                } else if (isSelected) {
                  btnStyle = "bg-rose-950/80 border-rose-500 text-rose-200 ring-2 ring-rose-400/40";
                } else {
                  btnStyle = "bg-stone-900/40 border-stone-800 text-stone-500 opacity-50";
                }
              }

              return (
                <button
                  key={option}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full p-4 rounded-2xl border text-sm font-medium text-left transition-all duration-300 flex items-center justify-between ${btnStyle}`}
                >
                  <span>{option}</span>
                  {isAnswered && isCorrectAnswer && (
                    <span className="text-emerald-400 font-bold">✓</span>
                  )}
                  {isAnswered && isSelected && !isCorrectAnswer && (
                    <span className="text-rose-400 font-bold">✕</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Cultural Explanation after selection */}
          {isAnswered && (
            <div className="w-full p-4 rounded-2xl bg-amber-950/30 border border-amber-500/20 text-xs sm:text-sm text-stone-300 animate-fade-in leading-relaxed">
              <span className="font-semibold text-amber-300 block mb-1">
                {selectedAnswer === currentQ.answerIndex ? "Yes! " : "Not quite. "}
              </span>
              {currentQ.explanation}
            </div>
          )}

          {/* Next Button with real unicode arrow */}
          {isAnswered && (
            <div className="w-full flex justify-end pt-2">
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-semibold text-xs sm:text-sm tracking-wide hover:scale-105 transition-all shadow-[0_0_15px_rgba(245,158,11,0.4)]"
              >
                {currentIdx === QUIZ_QUESTIONS.length - 1 ? "See result →" : "Next question →"}
              </button>
            </div>
          )}
        </>
      ) : (
        /* Results View */
        <div className="w-full text-center py-6 space-y-4">
          <div className="text-5xl">🪔</div>
          <p className="text-xs font-semibold tracking-widest uppercase text-amber-400">
            Quiz Complete
          </p>
          <h3 className="font-display font-semibold text-3xl sm:text-4xl text-ivory">
            {score} of {QUIZ_QUESTIONS.length} Correct
          </h3>
          <p className="text-sm text-stone-300 max-w-md mx-auto">
            {score >= 5
              ? "Wonderful! You truly understand the deep beauty and spirit of Tihar and Chhath."
              : "A wonderful journey into Nepali traditions. With each story, the light grows brighter."}
          </p>
          <div className="pt-4">
            <button
              type="button"
              onClick={handleRestart}
              className="px-8 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-semibold text-sm tracking-wide hover:scale-105 transition-all shadow-[0_0_15px_rgba(245,158,11,0.4)]"
            >
              Play again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
