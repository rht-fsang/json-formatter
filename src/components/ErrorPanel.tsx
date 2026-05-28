interface Props {
  valid: boolean;
  error?: { message: string; line: number; column: number };
}

export function ErrorPanel({ valid, error }: Props) {
  if (valid) {
    return (
      <div className="px-4 py-2 bg-[#181825] border-t border-[#45475a] text-sm text-[#a6e3a1]">
        JSON 有效
      </div>
    );
  }

  if (!error) return null;

  return (
    <div className="px-4 py-2 bg-[#181825] border-t border-[#45475a] text-sm text-[#f38ba8]">
      第 {error.line} 行，第 {error.column} 列：{error.message}
    </div>
  );
}
