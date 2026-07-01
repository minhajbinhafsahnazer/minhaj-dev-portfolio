// app/case-studies/[slug]/CaseStudyClientContent.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { caseStudies, CaseStudy } from '@/lib/case-studies-data';
import ThemeToggle from '@/app/components/ui/ThemeToggle';
import GlassCard from '@/app/components/ui/GlassCard';

// Inline syntax highlighter helper
function highlightCode(code: string, language: string) {
  const lines = code.split('\n');
  return lines.map((line, lineIdx) => {
    // Basic syntax highlighting using regex matching
    let html = line;

    if (language === 'yaml' || language === 'dockerfile') {
      // Highlight comments
      if (line.trim().startsWith('#')) {
        return <div key={lineIdx} className="text-emerald-500 font-light italic">{line}</div>;
      }
      // Highlight YAML keys or Docker instructions
      html = line
        .replace(/^(\s*[\w-]+:)/g, '<span class="text-purple-400 font-semibold">$1</span>')
        .replace(/^(FROM|WORKDIR|COPY|RUN|ENV|EXPOSE|CMD|ON|PUSH|name|on|jobs|steps|runs-on)/g, '<span class="text-blue-400 font-bold">$1</span>');
    } else {
      // TypeScript or Python
      // Comment highlight
      if (line.trim().startsWith('//') || line.trim().startsWith('#')) {
        return <div key={lineIdx} className="text-zinc-500 font-light italic">{line}</div>;
      }

      // Highlight keywords
      const keywords = [
        'import', 'from', 'export', 'const', 'let', 'var', 'async', 'await', 
        'function', 'return', 'class', 'def', 'if', 'else', 'elif', 'try', 
        'except', 'while', 'for', 'in', 'and', 'or', 'not', 'as', 'raise', 'with'
      ];
      
      keywords.forEach(kw => {
        const regex = new RegExp(`\\b(${kw})\\b`, 'g');
        html = html.replace(regex, `<span class="text-purple-400 font-semibold">$1</span>`);
      });

      // Highlight strings
      html = html.replace(/(["'`])(.*?)\1/g, '<span class="text-amber-300 font-light">$&</span>');

      // Highlight numbers
      html = html.replace(/\b(\d+)\b/g, '<span class="text-cyan-300 font-mono">$1</span>');
    }

    return (
      <div 
        key={lineIdx} 
        className="font-mono text-xs md:text-sm leading-relaxed text-zinc-300 min-h-[1.2rem]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  });
}

// Custom Premium Interactive SVG Visuals based on Slug
function CaseStudyVisual({ slug }: { slug: string }) {
  if (slug === 'control-center-platform') {
    return (
      <svg viewBox="0 0 800 350" className="w-full h-full opacity-90 text-zinc-400 max-h-[300px]">
        {/* Gradients */}
        <defs>
          <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Central Auth Node */}
        <rect x="330" y="110" width="140" height="130" rx="16" fill="url(#blueGrad)" stroke="#3b82f6" strokeWidth="2" className="animate-pulse" />
        <circle cx="400" cy="160" r="28" fill="#1e293b" stroke="#60a5fa" strokeWidth="2" />
        {/* Shield Icon inside circle */}
        <path d="M400 148 L412 153 V167 L400 174 L388 167 V153 Z" fill="none" stroke="#60a5fa" strokeWidth="2" />
        <text x="400" y="215" textAnchor="middle" fill="#60a5fa" className="font-mono text-[10px] tracking-widest font-bold">ZERO-TRUST</text>
        <text x="400" y="228" textAnchor="middle" fill="#94a3b8" className="font-mono text-[9px] uppercase">Gateway</text>

        {/* Node 1: Organization Config */}
        <g className="transition-transform duration-500 hover:translate-y-[-5px]">
          <rect x="50" y="40" width="180" height="90" rx="12" fill="url(#purpleGrad)" stroke="#a855f7" strokeWidth="1" strokeDasharray="4 2" />
          <text x="70" y="70" fill="#c084fc" className="text-xs font-bold font-serif-display">B2B Tenant Settings</text>
          <text x="70" y="90" fill="#94a3b8" className="font-mono text-[9px]">• Domain Constraints</text>
          <text x="70" y="105" fill="#94a3b8" className="font-mono text-[9px]">• Custom System Vars</text>
          {/* Arrow to Auth */}
          <path d="M230 85 H 300 V 150 H 330" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 3" />
        </g>

        {/* Node 2: Permissions Matrix */}
        <g className="transition-transform duration-500 hover:translate-y-[5px]">
          <rect x="50" y="210" width="180" height="90" rx="12" fill="url(#purpleGrad)" stroke="#a855f7" strokeWidth="1" />
          <text x="70" y="240" fill="#c084fc" className="text-xs font-bold font-serif-display">Bitwise RBAC Scopes</text>
          <text x="70" y="260" fill="#a855f7" className="font-mono text-[9px]">0b0010 - View Calculations</text>
          <text x="70" y="275" fill="#a855f7" className="font-mono text-[9px]">0b0100 - Edit Commissions</text>
          {/* Arrow to Auth */}
          <path d="M230 255 H 300 V 200 H 330" fill="none" stroke="#a855f7" strokeWidth="1.5" />
        </g>

        {/* Output Destination: Multi-tenant isolated Database */}
        <g className="transition-transform duration-500 hover:translate-x-[5px]">
          <rect x="570" y="125" width="180" height="100" rx="12" fill="url(#blueGrad)" stroke="#3b82f6" strokeWidth="1.5" />
          {/* Cylinder shape inside */}
          <ellipse cx="660" cy="155" rx="24" ry="8" fill="none" stroke="#3b82f6" strokeWidth="2" />
          <path d="M636 155 V 195 A 24 8 0 0 0 684 195 V 155" fill="none" stroke="#3b82f6" strokeWidth="2" />
          <line x1="636" y1="175" x2="684" y2="175" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2" />
          <text x="660" y="212" textAnchor="middle" fill="#60a5fa" className="font-mono text-[10px] tracking-wider">Tenant Partition DB</text>
          {/* Flow from Auth */}
          <path d="M470 175 H 570" fill="none" stroke="#3b82f6" strokeWidth="2" />
          <polygon points="570,175 560,170 560,180" fill="#3b82f6" />
        </g>
      </svg>
    );
  }

  if (slug === 'designing-scalable-apis') {
    return (
      <svg viewBox="0 0 800 350" className="w-full h-full opacity-90 text-zinc-400 max-h-[300px]">
        <defs>
          <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Input bulk CSV */}
        <g>
          <rect x="40" y="110" width="140" height="120" rx="8" fill="url(#greenGrad)" stroke="#10b981" strokeWidth="1.5" />
          <path d="M70 140 H 150 M70 165 H 150 M70 190 H 130" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
          <text x="110" y="215" textAnchor="middle" fill="#34d399" className="font-mono text-[10px] tracking-widest font-bold">100K+ ROWS</text>
          <text x="110" y="95" textAnchor="middle" fill="#94a3b8" className="font-mono text-[9px]">BULK IMPORT DATA</text>
          <path d="M180 170 H 260" fill="none" stroke="#10b981" strokeWidth="2" />
          <polygon points="260,170 250,165 250,175" fill="#10b981" />
        </g>

        {/* Parallel processing validator pipelines */}
        <g>
          {/* Main Pipeline Box */}
          <rect x="260" y="60" width="280" height="220" rx="16" fill="url(#blueGrad)" stroke="#3b82f6" strokeWidth="2" />
          <text x="400" y="85" textAnchor="middle" fill="#60a5fa" className="text-xs font-bold tracking-widest uppercase">Async Intake Engine</text>

          {/* Redis lookup check */}
          <circle cx="400" cy="140" r="28" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
          <text x="400" y="143" textAnchor="middle" fill="#c084fc" className="font-mono text-[9px] font-bold">REDIS</text>
          <text x="400" y="182" textAnchor="middle" fill="#c084fc" className="font-mono text-[8px]">Bloom Cache (Check Dups)</text>

          {/* Streaming lines */}
          <path d="M290 140 H 372" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M428 140 H 510" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
          <circle cx="300" cy="220" r="12" fill="#10b981" className="animate-ping opacity-30" />
          <circle cx="300" cy="220" r="6" fill="#10b981" />
          <text x="320" y="223" fill="#94a3b8" className="font-mono text-[9px]">JSON Validation</text>

          <circle cx="440" cy="220" r="6" fill="#10b981" />
          <text x="460" y="223" fill="#94a3b8" className="font-mono text-[9px]">Async Commit</text>

          {/* Connecting arrow to DB */}
          <path d="M540 170 H 620" fill="none" stroke="#3b82f6" strokeWidth="2" />
          <polygon points="620,170 610,165 610,175" fill="#3b82f6" />
        </g>

        {/* Destination database cylinder */}
        <g>
          <rect x="620" y="110" width="140" height="120" rx="12" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
          <ellipse cx="690" cy="140" rx="30" ry="10" fill="none" stroke="#3b82f6" strokeWidth="2" />
          <path d="M660 140 V 195 A 30 10 0 0 0 720 195 V 140" fill="none" stroke="#3b82f6" strokeWidth="2" />
          <text x="690" y="215" textAnchor="middle" fill="#60a5fa" className="font-mono text-[9px] uppercase tracking-wider font-bold">PostgreSQL COPY</text>
          <text x="690" y="95" textAnchor="middle" fill="#94a3b8" className="font-mono text-[9px]">COMMIT PIPELINE</text>
        </g>
      </svg>
    );
  }

  if (slug === 'aws-deployment' || slug === 'ci-cd-pipeline') {
    return (
      <svg viewBox="0 0 800 350" className="w-full h-full opacity-90 text-zinc-400 max-h-[300px]">
        <defs>
          <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#c2410c" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Global boundary representing VPC */}
        <rect x="30" y="30" width="740" height="290" rx="16" fill="none" stroke="#4b5563" strokeWidth="1" strokeDasharray="6 4" />
        <text x="50" y="55" fill="#94a3b8" className="font-mono text-[10px] tracking-widest font-bold">AWS VIRTUAL PRIVATE CLOUD (VPC)</text>

        {/* Internet Gateway / Load Balancer */}
        <g>
          <rect x="60" y="110" width="120" height="130" rx="12" fill="url(#orangeGrad)" stroke="#f97316" strokeWidth="1.5" />
          <circle cx="120" cy="160" r="22" fill="#1e293b" stroke="#fb923c" strokeWidth="2" />
          <path d="M110 160 H 130 M120 150 V 170 M113 153 L127 167 M113 167 L127 153" stroke="#fb923c" strokeWidth="1.5" />
          <text x="120" y="210" textAnchor="middle" fill="#fb923c" className="font-mono text-[10px] tracking-wider font-bold">ALB</text>
          <text x="120" y="225" textAnchor="middle" fill="#94a3b8" className="font-mono text-[8px] uppercase">Load Balancer</text>
        </g>

        {/* Public Subnet Fargate Containers */}
        <g>
          <rect x="230" y="70" width="260" height="210" rx="12" fill="url(#blueGrad)" stroke="#3b82f6" strokeWidth="1" />
          <text x="250" y="95" fill="#60a5fa" className="font-mono text-[9px] tracking-widest font-bold">PUBLIC SUBNET</text>

          {/* Container task 1 */}
          <rect x="260" y="120" width="200" height="50" rx="8" fill="#1e293b" stroke="#60a5fa" strokeWidth="1.5" className="animate-pulse" />
          <text x="280" y="149" fill="#93c5fd" className="font-mono text-[10px]">Fargate Task A: Run API</text>

          {/* Container task 2 */}
          <rect x="260" y="195" width="200" height="50" rx="8" fill="#1e293b" stroke="#60a5fa" strokeWidth="1" />
          <text x="280" y="224" fill="#94a3b8" className="font-mono text-[10px]">Fargate Task B: Idle</text>

          {/* Flow from ALB */}
          <path d="M180 175 H 230" fill="none" stroke="#fb923c" strokeWidth="1.5" />
          <polygon points="230,175 220,170 220,180" fill="#fb923c" />
        </g>

        {/* Private Subnet Database */}
        <g>
          <rect x="540" y="70" width="200" height="210" rx="12" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeOpacity="0.2" />
          <text x="560" y="95" fill="#94a3b8" className="font-mono text-[9px] tracking-widest font-bold">PRIVATE SUBNET</text>

          {/* RDS cylinder */}
          <ellipse cx="640" cy="150" rx="24" ry="8" fill="none" stroke="#3b82f6" strokeWidth="2" />
          <path d="M616 150 V 195 A 24 8 0 0 0 664 195 V 150" fill="none" stroke="#3b82f6" strokeWidth="2" />
          <text x="640" y="220" textAnchor="middle" fill="#60a5fa" className="font-mono text-[10px] tracking-wider font-bold">RDS PostgreSQL</text>

          {/* Flow from Fargate */}
          <path d="M490 175 H 540" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" />
          <polygon points="540,175 530,170 530,180" fill="#3b82f6" />
        </g>
      </svg>
    );
  }

  if (slug === 'agentic-ai') {
    return (
      <svg viewBox="0 0 800 350" className="w-full h-full opacity-90 text-zinc-400 max-h-[300px]">
        <defs>
          <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#7e22ce" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Input prompt */}
        <g>
          <rect x="40" y="120" width="160" height="90" rx="12" fill="url(#purpleGrad)" stroke="#a855f7" strokeWidth="1.5" />
          <text x="60" y="150" fill="#c084fc" className="text-xs font-bold font-serif-display">User Question</text>
          <text x="60" y="175" fill="#e2e8f0" className="font-mono text-[9px] italic">"What are employee X's</text>
          <text x="60" y="190" fill="#e2e8f0" className="font-mono text-[9px] italic">commissions in Q1?"</text>

          {/* Flow to Agent */}
          <path d="M200 165 H 280" fill="none" stroke="#a855f7" strokeWidth="2" />
          <polygon points="280,165 270,160 270,170" fill="#a855f7" />
        </g>

        {/* Central Orchestrator Agent */}
        <g>
          <rect x="280" y="80" width="240" height="170" rx="16" fill="url(#blueGrad)" stroke="#3b82f6" strokeWidth="2" className="animate-pulse" />
          <circle cx="400" cy="140" r="24" fill="#1e293b" stroke="#60a5fa" strokeWidth="2" />
          <text x="400" y="143" textAnchor="middle" fill="#60a5fa" className="font-mono text-[10px] font-bold">AGENT</text>
          <text x="400" y="190" textAnchor="middle" fill="#60a5fa" className="text-xs font-bold tracking-wider">Dynamic Tool Dispatch</text>
          <text x="400" y="210" textAnchor="middle" fill="#94a3b8" className="font-mono text-[9px]">Compliance Scoping Enforcement</text>
        </g>

        {/* Vector DB pgvector lookup */}
        <g>
          <rect x="580" y="40" width="180" height="100" rx="12" fill="none" stroke="#a855f7" strokeWidth="1.5" />
          <text x="600" y="70" fill="#c084fc" className="text-xs font-bold font-serif-display">pgvector Embeddings</text>
          <text x="600" y="95" fill="#a855f7" className="font-mono text-[9px]">• Match Rules context</text>
          <text x="600" y="112" fill="#a855f7" className="font-mono text-[9px]">• Vector distance threshold</text>

          {/* Flow from Agent */}
          <path d="M480 120 L 580 80" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 3" />
        </g>

        {/* Scoped API tool endpoint */}
        <g>
          <rect x="580" y="190" width="180" height="100" rx="12" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="600" y="220" fill="#60a5fa" className="text-xs font-bold font-serif-display">Scoped API Access</text>
          <text x="600" y="245" fill="#94a3b8" className="font-mono text-[9px]">• Bound by user tenantId</text>
          <text x="600" y="260" fill="#94a3b8" className="font-mono text-[9px]">• Return structured JSON</text>

          {/* Flow from Agent */}
          <path d="M480 200 L 580 230" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
        </g>
      </svg>
    );
  }

  if (slug === 'ai-integration') {
    return (
      <svg viewBox="0 0 800 350" className="w-full h-full opacity-90 text-zinc-400 max-h-[300px]">
        <defs>
          <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#7e22ce" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Main middleware container */}
        <rect x="180" y="40" width="440" height="270" rx="16" fill="url(#blueGrad)" stroke="#3b82f6" strokeWidth="2" />
        <text x="400" y="70" textAnchor="middle" fill="#60a5fa" className="text-xs font-bold tracking-widest uppercase">Resilient AI Middleware</text>

        {/* Input prompt */}
        <g>
          <path d="M60 175 H 180" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
          <polygon points="180,175 170,170 170,180" fill="#3b82f6" />
          <text x="120" y="150" textAnchor="middle" fill="#94a3b8" className="font-mono text-[9px] uppercase font-bold">Request Prompt</text>
        </g>

        {/* Redis Cache Lookup */}
        <g>
          <rect x="210" y="110" width="110" height="130" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="1.5" />
          <text x="265" y="140" textAnchor="middle" fill="#c084fc" className="font-mono text-[10px] font-bold">Semantic Cache</text>
          <text x="265" y="170" textAnchor="middle" fill="#94a3b8" className="font-mono text-[8px]">Redis Vector</text>
          <text x="265" y="185" textAnchor="middle" fill="#34d399" className="font-mono text-[8px] font-bold">Hit: Return instantly</text>
          <path d="M320 175 H 370" fill="none" stroke="#a855f7" strokeWidth="1" strokeDasharray="3 3" />
        </g>

        {/* OpenAI GPT Call */}
        <g>
          <rect x="370" y="110" width="110" height="130" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" className="animate-pulse" />
          <text x="425" y="140" textAnchor="middle" fill="#60a5fa" className="font-mono text-[10px] font-bold">GPT API Call</text>
          <text x="425" y="170" textAnchor="middle" fill="#ef4444" className="font-mono text-[8px]">Rate limits?</text>
          <text x="425" y="185" textAnchor="middle" fill="#fb923c" className="font-mono text-[8px] font-bold">Exponential Backoff</text>
          <path d="M480 175 H 530" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
        </g>

        {/* Zod/Pydantic validation */}
        <g>
          <rect x="530" y="110" width="80" height="130" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
          <text x="570" y="140" textAnchor="middle" fill="#34d399" className="font-mono text-[9px] font-bold">Pydantic</text>
          <text x="570" y="170" textAnchor="middle" fill="#34d399" className="font-mono text-[8px] font-bold">Output Validation</text>
          <text x="570" y="185" textAnchor="middle" fill="#34d399" className="font-mono text-[8px]">Structured JSON</text>
        </g>

        {/* Output */}
        <g>
          <path d="M620 175 H 740" fill="none" stroke="#10b981" strokeWidth="1.5" />
          <polygon points="740,175 730,170 730,180" fill="#10b981" />
          <text x="680" y="150" textAnchor="middle" fill="#34d399" className="font-mono text-[9px] uppercase font-bold">Valid Structured Data</text>
        </g>
      </svg>
    );
  }

  return null;
}

interface ContentProps {
  study: CaseStudy;
}

export default function CaseStudyClientContent({ study }: ContentProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [study.slug]);

  // Find next study in rotation
  const studyKeys = Object.keys(caseStudies);
  const currentIndex = studyKeys.indexOf(study.slug);
  const nextIndex = (currentIndex + 1) % studyKeys.length;
  const nextSlug = studyKeys[nextIndex];
  const nextStudy = caseStudies[nextSlug];

  const handleCopyCode = () => {
    if (study.solution.codeExample) {
      navigator.clipboard.writeText(study.solution.codeExample.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 noise-overlay transition-colors duration-300">
      <ThemeToggle />

      {/* Background decoration */}
      <div className="mesh-gradient" />
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="gradient-animated absolute inset-0 opacity-10 dark:opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 dark:from-purple-900/20 via-zinc-50 dark:via-zinc-950 to-zinc-50 dark:to-zinc-950" />
      </div>

      {/* Global premium dynamic header navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-zinc-50/70 dark:bg-zinc-950/70 backdrop-blur-md border-b border-zinc-200/50 dark:border-white/5 py-4 transition-all">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="font-serif-display text-xl font-bold tracking-tighter text-zinc-900 dark:text-white">
            MINHAJ
          </Link>
          <div className="flex items-center gap-6">
            <Link 
              href="/#case-studies" 
              className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
            >
              ← Back to Portfolio
            </Link>
          </div>
        </div>
      </header>

      {/* Content wrapper */}
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link 
            href="/#case-studies" 
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            <span>←</span>
            <span>Case Studies</span>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="mb-16">
          <GlassCard variant="subtle" className="p-8 md:p-12 relative overflow-hidden border-zinc-200/80 dark:border-white/10 bg-white/70 dark:bg-zinc-900/60 shadow-xl rounded-2xl">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-blue-500/[0.04] blur-[80px] pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
              <span className="inline-block px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.25em] bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400">
                {study.category}
              </span>
              
              <h1 className="font-serif-display text-fluid-section font-light text-zinc-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-white dark:to-zinc-500 leading-tight">
                {study.title}
              </h1>
              
              <p className="text-base md:text-lg font-light leading-relaxed text-zinc-600 dark:text-zinc-300 max-w-3xl">
                {study.subtitle}
              </p>
            </div>

            {/* Custom visual schematic diagram */}
            <div className="mt-12 w-full bg-zinc-100/50 dark:bg-black/40 border border-zinc-200 dark:border-white/[0.06] rounded-xl p-4 flex items-center justify-center min-h-[220px]">
              <CaseStudyVisual slug={study.slug} />
            </div>
          </GlassCard>
        </section>

        {/* Page columns layout */}
        <div className="space-y-16">

          {/* Section: The Problem */}
          <section className="space-y-6">
            <h2 className="font-serif-display text-2xl font-light text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-white/10 pb-3">
              {study.problem.title}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-fluid-body font-light">
              {study.problem.text}
            </p>
            
            {/* Structured critical pain-points layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {study.problem.details.map((detail, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl border border-zinc-200/50 dark:border-white/5 bg-zinc-50/50 dark:bg-white/[0.02]">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mt-0.5 text-red-500 text-xs">
                    !
                  </div>
                  <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                    {detail}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Technical Challenges Explained */}
          <section className="space-y-6">
            <h2 className="font-serif-display text-2xl font-light text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-white/10 pb-3">
              {study.challenges.title}
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {study.challenges.items.map((challenge, idx) => (
                <GlassCard key={idx} variant="subtle" className="p-6 md:p-8 space-y-4 border-zinc-200/60 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/10 transition-colors bg-white/50 dark:bg-white/[0.01]">
                  <h3 className="font-serif-display text-lg font-medium text-blue-600 dark:text-blue-400">
                    {challenge.question}
                  </h3>
                  <p className="text-sm font-light leading-relaxed text-zinc-600 dark:text-zinc-300">
                    {challenge.answer}
                  </p>
                </GlassCard>
              ))}
            </div>
          </section>

          {/* Section: Solution & Decisions */}
          <section className="space-y-6">
            <h2 className="font-serif-display text-2xl font-light text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-white/10 pb-3">
              {study.solution.title}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-fluid-body font-light">
              {study.solution.text}
            </p>

            {/* Decisions details */}
            <div className="space-y-4">
              {study.solution.decisions.map((decision, idx) => (
                <div key={idx} className="flex gap-4 p-5 rounded-xl border border-zinc-200/80 dark:border-white/10 bg-white/40 dark:bg-white/[0.02]">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 text-xs font-bold">
                    ✓
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
                      {decision.title}
                    </h4>
                    <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                      {decision.rationale}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Code example editor block */}
            {study.solution.codeExample && (
              <div className="mt-8 overflow-hidden rounded-xl border border-zinc-300/80 dark:border-white/10 bg-zinc-950 shadow-2xl">
                {/* IDE Window header */}
                <div className="flex items-center justify-between bg-zinc-900 px-4 py-3 border-b border-white/[0.05]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/60" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <span className="w-3 h-3 rounded-full bg-green-500/60" />
                    <span className="ml-4 font-mono text-xs text-zinc-400">
                      {study.solution.codeExample.filename}
                    </span>
                  </div>
                  <button 
                    onClick={handleCopyCode}
                    className="text-[10px] uppercase tracking-wider font-semibold px-3 py-1 bg-white/[0.05] hover:bg-white/[0.1] rounded text-zinc-400 hover:text-white transition-colors"
                  >
                    {copied ? 'Copied!' : 'Copy Code'}
                  </button>
                </div>
                {/* Editor Content */}
                <div className="p-5 overflow-x-auto bg-zinc-950 font-mono text-xs text-left max-h-[400px]">
                  {highlightCode(study.solution.codeExample.code, study.solution.codeExample.language)}
                </div>
              </div>
            )}
          </section>

          {/* Section: Lessons Learned */}
          <section className="space-y-6">
            <h2 className="font-serif-display text-2xl font-light text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-white/10 pb-3">
              Lessons & Future Focus
            </h2>
            <div className="p-6 rounded-xl border-l-4 border-blue-500 bg-blue-500/[0.02] dark:bg-blue-500/[0.04]">
              <p className="text-sm italic leading-relaxed text-zinc-600 dark:text-zinc-300">
                "{study.lessons}"
              </p>
            </div>
          </section>

          {/* Section: Tech Stack Badges */}
          <section className="space-y-6">
            <h2 className="font-serif-display text-xl font-light text-zinc-900 dark:text-white">
              Tech Stack & Ecosystem
            </h2>
            <div className="flex flex-wrap gap-2">
              {study.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.04] shadow-sm text-zinc-800 dark:text-zinc-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Bottom Navigation call to action */}
        <section className="mt-24 pt-12 border-t border-zinc-200 dark:border-white/10">
          <GlassCard variant="subtle" className="p-8 md:p-12 relative overflow-hidden border-zinc-200/80 dark:border-white/10 bg-zinc-100/50 dark:bg-zinc-900/20 text-center space-y-6 rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/[0.01] to-purple-500/[0.01] pointer-events-none" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
              Continue Exploring
            </span>
            <div className="space-y-2">
              <h3 className="text-xs font-light text-zinc-400">Next Case Study</h3>
              <Link 
                href={`/case-studies/${nextStudy.slug}`}
                className="inline-block font-serif-display text-2xl md:text-3xl text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-light"
              >
                {nextStudy.title} →
              </Link>
            </div>
            
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/#case-studies"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-zinc-900 hover:bg-black text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-black font-semibold text-xs uppercase tracking-widest transition-all shadow-md"
              >
                Back to Home
              </Link>
              <Link 
                href={`/case-studies/${nextStudy.slug}`}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-zinc-300 dark:border-white/10 bg-white/80 dark:bg-white/[0.02] hover:bg-zinc-100 dark:hover:bg-white/[0.05] text-zinc-800 dark:text-zinc-300 font-semibold text-xs uppercase tracking-widest transition-all"
              >
                Skip to Next
              </Link>
            </div>
          </GlassCard>
        </section>

      </main>
    </div>
  );
}
