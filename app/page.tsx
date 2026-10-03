import type { Metadata } from 'next';
import GlassHero from '@/components/glass-hero';

export const metadata: Metadata = {
  title: 'Talla Likith — Applied AI Engineer & Full-Stack Builder',
  description: "Hi, I'm Likith, an applied AI engineer and full-stack builder from Hyderabad. I build AI chatbots, voice agents, agent workflows and the systems behind them.",
};

export default function Home() {
  return <GlassHero />;
}
