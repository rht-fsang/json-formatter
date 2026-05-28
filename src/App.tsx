import { useState, useCallback } from 'react';
import { JsonEditor } from './components/JsonEditor';
import { Toolbar } from './components/Toolbar';
import { ErrorPanel } from './components/ErrorPanel';
import { formatJson, compressJson, validateJson, type ParseResult } from './utils/json-parser';

const SAMPLE = `{
  "name": "JSON 格式化工具",
  "version": "1.0.0",
  "features": ["校验", "格式化", "压缩"]
}`;

function App() {
  const [input, setInput] = useState(SAMPLE);
  const [output, setOutput] = useState('');
  const [indent, setIndent] = useState(2);
  const [result, setResult] = useState<ParseResult>({ valid: true });

  const handleFormat = useCallback(() => {
    const r = formatJson(input, indent);
    setResult(r);
    if (r.formatted) setOutput(r.formatted);
  }, [input, indent]);

  const handleCompress = useCallback(() => {
    const r = compressJson(input);
    setResult(r);
    if (r.formatted) setOutput(r.formatted);
  }, [input]);

  const handleCopy = useCallback(async () => {
    const text = output || input;
    await navigator.clipboard.writeText(text);
  }, [output, input]);

  const handleClear = useCallback(() => {
    setInput('');
    setOutput('');
    setResult({ valid: true });
  }, []);

  const handleInputChange = useCallback((value: string) => {
    setInput(value);
    if (value.trim()) {
      setResult(validateJson(value));
    } else {
      setResult({ valid: true });
    }
  }, []);

  return (
    <div className="flex flex-col h-full">
      <header className="px-4 py-3 bg-[#181825] border-b border-[#45475a]">
        <h1 className="text-lg font-semibold text-[#cdd6f4] m-0">
          JSON 校验 & 格式化
        </h1>
      </header>

      <Toolbar
        onFormat={handleFormat}
        onCompress={handleCompress}
        onCopy={handleCopy}
        onClear={handleClear}
        indent={indent}
        onIndentChange={setIndent}
      />

      <div className="flex flex-1 min-h-0">
        <div className="flex-1 flex flex-col border-r border-[#45475a]">
          <div className="px-3 py-1.5 text-xs text-[#a6adc8] bg-[#11111b] border-b border-[#45475a]">
            输入
          </div>
          <div className="flex-1 min-h-0">
            <JsonEditor value={input} onChange={handleInputChange} />
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="px-3 py-1.5 text-xs text-[#a6adc8] bg-[#11111b] border-b border-[#45475a]">
            输出
          </div>
          <div className="flex-1 min-h-0">
            <JsonEditor value={output} readOnly />
          </div>
        </div>
      </div>

      <ErrorPanel valid={result.valid} error={result.error} />
    </div>
  );
}

export default App;
