import { useState } from 'react';
import { Github, Linkedin, Mail, MapPin, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { submitContactForm, ContactFormData } from '../utils/api';

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
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const result = await submitContactForm(formData);
      if (result.success) {
        setSubmitStatus('success');
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
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24 bg-card transition-colors duration-300">
      <div className="max-w-[1440px] w-full mx-auto px-5 sm:px-6 lg:px-8" ref={revealRef}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 tracking-tight text-foreground">
            Contact
          </h2>
          <p className="text-center text-base sm:text-lg mb-12 sm:mb-16 text-muted-foreground">
            Let's discuss your next project
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Contact Information */}
            <div className="space-y-6 sm:space-y-8 rounded-[1.5rem] border border-white/10 dark:border-white/5 bg-background/40 backdrop-blur-2xl p-6 sm:p-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 tracking-tight text-foreground">
                  Contact Information
                </h3>
                <p className="text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 text-muted-foreground">
                  I'm always interested in hearing about new projects and opportunities.
                  Whether you have a question or just want to say hi, feel free to reach out!
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-accent/10">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Email
                    </p>
                    <p className="font-medium text-foreground break-all">
                      binodbishwakarama@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-accent/10">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Location
                    </p>
                    <p className="font-medium text-foreground">
                      Bengaluru, Karnataka, India
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4 tracking-tight text-foreground">
                  Connect With Me
                </h4>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/binodbishwakarama-max"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-lg transition-all hover:scale-110 bg-accent/10 text-accent hover:bg-accent/20"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/binod-bishwakarma-417612380/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-lg transition-all hover:scale-110 bg-accent/10 text-accent hover:bg-accent/20"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a
                    href="mailto:binodbishwakarama@gmail.com"
                    className="w-12 h-12 flex items-center justify-center rounded-lg transition-all hover:scale-110 bg-accent/10 text-accent hover:bg-accent/20"
                  >
                    <Mail className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-[1.5rem] border border-white/10 dark:border-white/5 bg-background/40 backdrop-blur-2xl p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {submitStatus === 'error' && (
                  <div className="p-4 rounded-lg border border-destructive/50 bg-destructive/10 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-destructive">{errorMessage}</p>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-foreground"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all bg-input text-foreground disabled:opacity-50 disabled:cursor-not-allowed ${
                      errors.name
                        ? 'border-destructive/50 focus:ring-destructive/50'
                        : 'border-border focus:ring-accent/50'
                    }`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-foreground"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all bg-input text-foreground disabled:opacity-50 disabled:cursor-not-allowed ${
                      errors.email
                        ? 'border-destructive/50 focus:ring-destructive/50'
                        : 'border-border focus:ring-accent/50'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block mb-2 text-sm font-medium text-foreground"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all bg-input text-foreground disabled:opacity-50 disabled:cursor-not-allowed ${
                      errors.subject
                        ? 'border-destructive/50 focus:ring-destructive/50'
                        : 'border-border focus:ring-accent/50'
                    }`}
                    placeholder="How can I help you?"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-foreground"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all resize-none bg-input text-foreground disabled:opacity-50 disabled:cursor-not-allowed ${
                      errors.message
                        ? 'border-destructive/50 focus:ring-destructive/50'
                        : 'border-border focus:ring-accent/50'
                    }`}
                    rows={5}
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || submitStatus === 'success'}
                  className={`w-full px-6 py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? 'bg-accent/50 cursor-not-allowed text-accent-foreground'
                      : submitStatus === 'success'
                        ? 'bg-green-500 text-white cursor-default'
                        : submitStatus === 'error'
                          ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                          : 'bg-accent text-accent-foreground hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/20 hover:scale-105'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Message Sent Successfully!
                    </>
                  ) : submitStatus === 'error' ? (
                    <>
                      <AlertCircle className="w-5 h-5" />
                      Failed to send. Try again?
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
