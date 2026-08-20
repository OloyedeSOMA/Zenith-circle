"use client";

interface StepProgressProps {
  currentStep: number; 
  totalSteps: number;
}

const StepProgress = ({ currentStep, totalSteps }: StepProgressProps) => {
  const percentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#9a8c90]">
        Step {currentStep + 1} of {totalSteps}
      </span>
      <div className="relative h-[6px] w-full max-w-[320px] overflow-hidden rounded-full bg-[#E6E6E6]">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-[#2b6b41] transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default StepProgress;
