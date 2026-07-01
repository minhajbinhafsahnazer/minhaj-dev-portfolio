'use client';

import { useState, useCallback } from 'react';
import { personalInfo } from '@/lib/data';
import Section from '../ui/Section';
import GlassCard from '../ui/GlassCard';
import RevealOnScroll from '../ui/RevealOnScroll';
import MagneticButton from '../ui/MagneticButton';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const validate = useCallback(
    (field?: string): FormErrors => {
      const errs: FormErrors = {};
      if (!field || field === 'name') {
        if (!form.name.trim()) errs.name = 'Name is required';
      }
      if (!field || field === 'email') {
        if (!form.email.trim()) errs.email = 'Email is required';
        else if (!validateEmail(form.email)) errs.email = 'Enter a valid email';
      }
      if (!field || field === 'message') {
        if (!form.message.trim()) errs.message = 'Message is required';
        else if (form.message.trim().length < 10) errs.message = 'Message must be at least 10 characters';
      }
      return errs;
    },
    [form],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, ...validate(name) }));
      const fieldErrs = validate(name);
      if (!fieldErrs[name as keyof FormErrors]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[name as keyof FormErrors];
          return next;
        });
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldErrs = validate(name);
    if (fieldErrs[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: fieldErrs[name as keyof FormErrors] }));
    } else {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof FormErrors];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    const allErrors = validate();
    setErrors(allErrors);
    if (Object.keys(allErrors).length > 0) return;

    setStatus('sending');
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "",
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
        setTouched({});
        setErrors({});
      } else {
        console.error("Form submission error:", result);
        setStatus('error');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus('error');
    }
  };

  const inputBase =
    'w-full rounded-lg bg-white/[0.02] dark:bg-zinc-900/10 border px-4 py-3 text-sm text-zinc-900 dark:text-white outline-none transition-all duration-300 focus:ring-1 placeholder:text-zinc-600';

  const inputClass = (field: keyof FormErrors) =>
    `${inputBase} ${
      errors[field] && touched[field]
        ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/30'
        : 'border-zinc-200 dark:border-white/5 focus:border-blue-500/50 focus:ring-blue-500/20'
    }`;

  return (
    <Section id="contact">
      <RevealOnScroll direction="up" delay={0}>
        <div className="mb-16 relative flex flex-col items-center text-center">
          <h2 className="mb-3 text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-medium">
            Get in Touch
          </h2>
          <h3 className="font-serif-display text-fluid-section font-light tracking-[-0.02em]">
            Let&apos;s Connect
          </h3>
          <div className="mt-6 h-[1px] w-full max-w-md mx-auto relative overflow-visible">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
          </div>
        </div>
      </RevealOnScroll>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <RevealOnScroll direction="left" delay={0.1}>
          <div className="space-y-8">
            <p className="text-sm leading-relaxed max-w-md">
              I&apos;m currently open to new opportunities and collaborations. 
              Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you.
            </p>
            
            <div className="space-y-6">
              <div className="group flex items-center gap-4">
                <div className="h-11 w-11 flex items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] text-zinc-500 group-hover:text-blue-400 group-hover:border-blue-500/20 transition-all duration-300">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-zinc-500 font-medium mb-0.5">Email</p>
                  <a href={`mailto:${personalInfo.email}`} className="text-sm hover:text-blue-400 transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-blue-400/50 hover:after:w-full after:transition-all after:duration-300">
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <div className="group flex items-center gap-4">
                <div className="h-11 w-11 flex items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] text-zinc-500 group-hover:text-purple-400 group-hover:border-purple-500/20 transition-all duration-300">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-zinc-500 font-medium mb-0.5">GitHub</p>
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-purple-400 transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-purple-400/50 hover:after:w-full after:transition-all after:duration-300">
                    {personalInfo.github.replace('https://', '')}
                  </a>
                </div>
              </div>

              <div className="group flex items-center gap-4">
                <div className="h-11 w-11 flex items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] text-zinc-500 group-hover:text-emerald-400 group-hover:border-emerald-500/20 transition-all duration-300">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-zinc-500 font-medium mb-0.5">LinkedIn</p>
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-emerald-400 transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-emerald-400/50 hover:after:w-full after:transition-all after:duration-300">
                    {personalInfo.linkedin.replace('https://', '')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll direction="right" delay={0.2}>
          <GlassCard variant="subtle" className="p-8 border-white/5" spotlight={false}>
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 animate-fadeIn">
                <div className="h-14 w-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5">
                  <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-serif-display text-xl font-light mb-2">Message Sent!</h4>
                <p className="text-sm text-center max-w-xs mb-6">
                  Thanks for reaching out. I&apos;ll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-[11px] font-medium uppercase tracking-[0.15em] text-blue-400 hover:text-blue-300 transition-colors duration-300"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate suppressHydrationWarning className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[10px] uppercase tracking-[0.15em] text-zinc-500 font-medium">Name</label>
                    <input
                      suppressHydrationWarning
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={inputClass('name')}
                      placeholder="John Doe"
                    />
                    {errors.name && touched.name && (
                      <p className="text-[10px] text-red-400 mt-1 animate-fadeIn">{errors.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[10px] uppercase tracking-[0.15em] text-zinc-500 font-medium">Email</label>
                    <input
                      suppressHydrationWarning
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={inputClass('email')}
                      placeholder="john@example.com"
                    />
                    {errors.email && touched.email && (
                      <p className="text-[10px] text-red-400 mt-1 animate-fadeIn">{errors.email}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-[10px] uppercase tracking-[0.15em] text-zinc-500 font-medium">Message</label>
                  <textarea
                    suppressHydrationWarning
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${inputClass('message')} resize-none`}
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && touched.message && (
                    <p className="text-[10px] text-red-400 mt-1 animate-fadeIn">{errors.message}</p>
                  )}
                </div>
                <MagneticButton
                  suppressHydrationWarning
                  as="button"
                  type="submit"
                  disabled={status === 'sending'}
                  strength={0.15}
                  className="w-full min-w-[120px] rounded-lg bg-zinc-900/5 dark:bg-white/[0.04] border border-zinc-200 dark:border-white/10 py-3.5 text-xs font-medium uppercase tracking-[0.15em] text-zinc-900 dark:text-white hover:bg-zinc-900/10 dark:hover:bg-white/[0.08] hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === 'sending' ? (
                    <span className="flex items-center gap-2 text-[10px]">
                      <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="text-[10px]">Send</span>
                  )}
                </MagneticButton>
                {status === 'error' && (
                  <p className="text-[11px] text-red-400 text-center animate-fadeIn">
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            )}
          </GlassCard>
        </RevealOnScroll>
      </div>
    </Section>
  );
}
