import {
  Newspaper,
  LineChart,
  Building2,
  Gauge,
  FlaskConical,
  type LucideIcon,
} from 'lucide-react';

// Maps the string icon names used in the data layer to lucide components,
// so content files stay free of JSX imports.
const ICONS: Record<string, LucideIcon> = {
  Newspaper,
  LineChart,
  Building2,
  Gauge,
  FlaskConical,
};

export function resolveIcon(name: string): LucideIcon {
  return ICONS[name] ?? LineChart;
}
