import { useState } from 'react';
import { Github, Linkedin, Mail, MapPin, Send, AlertCircle, CheckCircle, Terminal, Copy, Check } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { submitContactForm, ContactFormData } from '../utils/api';
import confetti from 'canvas-confetti';
import { SpotlightCard } from './ui/SpotlightCard';
import { sounds } from '../utils/soundEffects';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function Contact() {
  const revealRef = useScrollReveal();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validateForm()) {
      sounds.playClick();
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    sounds.playClick();

    try {
      const result = await submitContactForm(formData);
      if (result.success) {
        setSubmitStatus('success');
        sounds.playChime();
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#3b82f6', '#6366f1', '#06b6d4'],
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('binodbishwakarama@gmail.com');
    setCopiedEmail(true);
    sounds.playChime();
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3.5 rounded-xl border bg-foreground/[0.02] text-foreground text-base sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all ${
      hasError ? 'border-destructive/50' : 'border-foreground/[0.08]'
    }`;

  return (
    <section id="contact" className="py-24 sm:py-32 bg-background transition-colors duration-500 scroll-mt-28 relative">
      <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-8 lg:px-12" ref={revealRef}>
        
        {/* Section Header */}
        <div className="mb-16 sm:mb-20">
          <div className="text-xs font-mono text-muted-foreground tracking-[0.2em] uppercase mb-4">
            [05] // GET IN TOUCH
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-foreground font-display max-w-3xl">
            Let's connect and build something impactful.
          </h2>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Links & Info */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-sm">
              Open for AI Engineering and Full-Stack Software Engineering opportunities, collaborations, and technical discussions. I respond promptly.
            </p>

            <div className="space-y-3">
              {/* Copy Email Button Card */}
              <div
                onClick={handleCopyEmail}
                className="flex items-center justify-between p-4 rounded-xl border border-foreground/[0.08] bg-foreground/[0.015] hover:border-foreground/[0.18] transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-lg bg-blue-500/10">
                    <Mail className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-muted-foreground block uppercase">DIRECT EMAIL</span>
                    <span className="text-sm font-mono font-semibold text-foreground group-hover:text-blue-500 dark:group-hover:text-cyan-400 transition-colors">
                      binodbishwakarama@gmail.com
                    </span>
                  </div>
                </div>

                <div className="p-2 text-muted-foreground group-hover:text-foreground">
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </div>
              </div>

              {/* Location Card */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-foreground/[0.08] bg-foreground/[0.015]">
                <div className="p-2.5 rounded-lg bg-indigo-500/10">
                  <MapPin className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-muted-foreground block uppercase">LOCATION</span>
                  <span className="text-sm font-semibold text-foreground">
                    Bengaluru, Karnataka, India
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://github.com/binodbishwakarama-max"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="flex-1 py-3 px-4 rounded-xl border border-foreground/[0.08] bg-foreground/[0.015] hover:border-foreground/[0.18] hover:bg-foreground/[0.03] transition-all flex items-center justify-center gap-2 text-xs font-semibold text-foreground cursor-pointer"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/binodbishwakarama"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="flex-1 py-3 px-4 rounded-xl border border-foreground/[0.08] bg-foreground/[0.015] hover:border-foreground/[0.18] hover:bg-foreground/[0.03] transition-all flex items-center justify-center gap-2 text-xs font-semibold text-foreground cursor-pointer"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right Column: Spotlight Form */}
          <div className="lg:col-span-7">
            <SpotlightCard
              spotlightColor="rgba(59, 130, 246, 0.12)"
              className="p-7 sm:p-9"
            >
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {submitStatus === 'error' && (
                  <div className="p-4 rounded-xl border border-destructive/30 bg-destructive/5 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-destructive">{errorMessage}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-xs font-mono font-medium text-muted-foreground">
                      // YOUR NAME
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={inputClass(!!errors.name)}
                      placeholder="Jane Doe"
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-2 text-xs font-mono font-medium text-muted-foreground">
                      // EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={inputClass(!!errors.email)}
                      placeholder="jane@company.com"
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block mb-2 text-xs font-mono font-medium text-muted-foreground">
                    // SUBJECT
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={inputClass(!!errors.subject)}
                    placeholder="Project Inquiry / AI Architecture Role"
                  />
                  {errors.subject && (
                    <p className="mt-1.5 text-xs text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block mb-2 text-xs font-mono font-medium text-muted-foreground">
                    // MESSAGE
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    rows={5}
                    className={`${inputClass(!!errors.message)} resize-none`}
                    placeholder="Tell me about the project goals or engineering challenge..."
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || submitStatus === 'success'}
                  className="w-full py-4 rounded-xl bg-foreground text-background font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-[0.99] cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : submitStatus === 'success' ? (
                    <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle className="w-4 h-4" /> Message Sent Successfully!
                    </span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
