"use client";

export type SortOption = "default" | "low" | "high";

type Props = {
  value: SortOption;
  onChange: (value: SortOption) => void;
};

export default function SortDropdown({ value, onChange }: Props) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="whitespace-nowrap">সাজান:</span>
      <select
        className="select select-bordered select-sm sm:select-md"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
      >
        <option value="default">ডিফল্ট</option>
        <option value="low">দাম: কম থেকে বেশি</option>
        <option value="high">দাম: বেশি থেকে কম</option>
      </select>
    </label>
  );
}