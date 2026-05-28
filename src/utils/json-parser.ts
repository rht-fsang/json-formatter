export interface ParseResult {
  valid: boolean;
  formatted?: string;
  error?: {
    message: string;
    line: number;
    column: number;
  };
}

export function validateJson(input: string): ParseResult {
  if (!input.trim()) {
    return { valid: false, error: { message: '输入为空', line: 1, column: 1 } };
  }
  try {
    JSON.parse(input);
    return { valid: true };
  } catch (e) {
    const { line, column, message } = extractErrorPosition(input, e as SyntaxError);
    return { valid: false, error: { message, line, column } };
  }
}

export function formatJson(input: string, indent: number | string = 2): ParseResult {
  try {
    const parsed = JSON.parse(input);
    return { valid: true, formatted: JSON.stringify(parsed, null, indent) };
  } catch (e) {
    const { line, column, message } = extractErrorPosition(input, e as SyntaxError);
    return { valid: false, error: { message, line, column } };
  }
}

export function compressJson(input: string): ParseResult {
  try {
    const parsed = JSON.parse(input);
    return { valid: true, formatted: JSON.stringify(parsed) };
  } catch (e) {
    const { line, column, message } = extractErrorPosition(input, e as SyntaxError);
    return { valid: false, error: { message, line, column } };
  }
}

function extractErrorPosition(input: string, error: SyntaxError) {
  const msg = error.message;
  const posMatch = msg.match(/position\s+(\d+)/i);

  let line = 1;
  let column = 1;

  if (posMatch) {
    const pos = parseInt(posMatch[1], 10);
    const lines = input.substring(0, pos).split('\n');
    line = lines.length;
    column = lines[lines.length - 1].length + 1;
  }

  const cleanMsg = msg.replace(/^JSON\.parse:\s*/i, '').replace(/at position \d+/i, '').trim();
  return { line, column, message: cleanMsg || msg };
}
