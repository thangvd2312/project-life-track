import { cn } from "@/lib/utils";

interface IProgressBarProps {
  value: number;
  max?: number;
  unit?: string;
  bgColor?: string;
  txtColor?: string;
}

const ProgressBar = (props: IProgressBarProps) => {
  const {
    value,
    max = 50,
    unit = "kg",
    bgColor = "bg-red-400",
    txtColor = "text-red-400",
  } = props;
  const percentage = (value / max) * 100;

  return (
    <div className="w-full mb-8 relative">
      <div className="relative w-full h-3 rounded-full bg-gray-200 overflow-hidden">
        <div
          className={cn("absolute top-0 left-0 h-full rounded-full", bgColor)}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div
        className={cn("absolute top-4 text-center", txtColor)}
        style={{ right: `${100 - percentage}%` }}
      >
        <span className="font-bold text-lg">
          {value}
          {unit && <span className="font-normal text-xs ml-0.5">{unit}</span>}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
