interface Props {
  onFormat: () => void;
  onCompress: () => void;
  onCopy: () => void;
  onClear: () => void;
  indent: number;
  onIndentChange: (indent: number) => void;
}

export function Toolbar({ onFormat, onCompress, onCopy, onClear, indent, onIndentChange }: Props) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-[#181825] border-b border-[#45475a]">
      <button onClick={onFormat} className="btn btn-primary">格式化</button>
      <button onClick={onCompress} className="btn">压缩</button>
      <button onClick={onCopy} className="btn">复制</button>
      <button onClick={onClear} className="btn">清空</button>
      <div className="ml-auto flex items-center gap-2 text-sm text-[#a6adc8]">
        <span>缩进:</span>
        <select
          value={indent}
          onChange={(e) => onIndentChange(Number(e.target.value))}
          className="bg-[#313244] border border-[#45475a] rounded px-2 py-1 text-[#cdd6f4] text-sm"
        >
          <option value={2}>2 空格</option>
          <option value={4}>4 空格</option>
        </select>
      </div>
    </div>
  );
}
