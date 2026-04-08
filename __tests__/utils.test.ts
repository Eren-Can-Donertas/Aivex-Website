import { describe, it, expect } from 'vitest';
import { formatDate, estimateReadingTime, slugify, truncate } from '@/lib/utils';

// ---------------------------------------------------------------------------
// formatDate
// ---------------------------------------------------------------------------

describe('formatDate', () => {
  it('formats a valid ISO date to long form', () => {
    const result = formatDate('2024-01-15');
    expect(result).toMatch(/January/i);
    expect(result).toContain('15');
    expect(result).toContain('2024');
  });

  it('formats end-of-year date correctly', () => {
    const result = formatDate('2024-12-31');
    expect(result).toMatch(/December/i);
    expect(result).toContain('2024');
  });

  it('returns the original string on invalid input without throwing', () => {
    const bad = 'not-a-date';
    const result = formatDate(bad);
    expect(typeof result).toBe('string');
  });

  it('does not throw on empty string', () => {
    expect(() => formatDate('')).not.toThrow();
  });
});

// ---------------------------------------------------------------------------
// estimateReadingTime
// ---------------------------------------------------------------------------

describe('estimateReadingTime', () => {
  it('returns a positive integer for normal content', () => {
    const content = 'word '.repeat(400); // ~400 words → 2 min at 200 wpm
    const result = estimateReadingTime(content);
    expect(result).toBeGreaterThan(0);
    expect(Number.isInteger(result)).toBe(true);
  });

  it('returns minimum of 1 for very short content', () => {
    expect(estimateReadingTime('hi')).toBe(1);
    expect(estimateReadingTime('')).toBe(1);
  });

  it('returns a larger value for longer content', () => {
    const short = 'word '.repeat(100);
    const long = 'word '.repeat(1000);
    expect(estimateReadingTime(long)).toBeGreaterThan(estimateReadingTime(short));
  });

  it('does not return NaN', () => {
    expect(Number.isNaN(estimateReadingTime(''))).toBe(false);
    expect(Number.isNaN(estimateReadingTime('hello world'))).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// slugify
// ---------------------------------------------------------------------------

describe('slugify', () => {
  it('lowercases text', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('replaces spaces with hyphens', () => {
    expect(slugify('signal composition deep dive')).toBe('signal-composition-deep-dive');
  });

  it('strips special characters', () => {
    expect(slugify('Governor & Risk Controls!')).toBe('governor-risk-controls');
  });

  it('trims leading and trailing hyphens', () => {
    const result = slugify('  trimmed  ');
    expect(result).not.toMatch(/^-|-$/);
  });

  it('handles already-slugified input', () => {
    expect(slugify('already-slug')).toBe('already-slug');
  });
});

// ---------------------------------------------------------------------------
// truncate
// ---------------------------------------------------------------------------

describe('truncate', () => {
  it('returns original string when within limit', () => {
    const short = 'Short text';
    expect(truncate(short, 100)).toBe(short);
  });

  it('truncates and appends ellipsis when over limit', () => {
    const long = 'This is a fairly long sentence that should be truncated';
    const result = truncate(long, 20);
    expect(result.length).toBeLessThanOrEqual(21); // content + ellipsis char
    expect(result).toMatch(/…$/);
  });

  it('does not truncate at exactly the limit', () => {
    const text = 'exactly';
    expect(truncate(text, text.length)).toBe(text);
  });

  it('does not throw on empty string', () => {
    expect(() => truncate('', 10)).not.toThrow();
  });
});
