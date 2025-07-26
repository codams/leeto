export const ProgressBar = ({
  value,
  max,
  color = "blue",
}: {
  value: number;
  max: number;
  color: string;
}) => {
  return (
    <div className="inline rounded h-3 w-full bg-gray-200 dark:bg-neutral-200">
      <div
        className={`h-3 rounded bg-${color}-600`}
        style={{
          width: (value / max) * 100 + "%",
        }}
      ></div>
    </div>
  );
};
