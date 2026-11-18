'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { enquiry, contact } from '@/data/rosario';
import { readTracking } from '@/lib/enquire';

type Errors = Partial<Record<'name' | 'phone' | 'email' | 'consent', string>>;

const initial = {
  name: '',
  phone: '',
  email: '',
  requirement: enquiry.requirementOptions[0],
  enquiryType: enquiry.enquiryTypeOptions[0],
  message: '',
  consent: false,
};

export default function EnquiryForm({
  tone = 'light',
  onDone,
  compact = false,
}: {
  /** `light` = for Pearl surfaces, `dark` = for Navy surfaces. */
  tone?: 'light' | 'dark';
  onDone?: () => void;
  compact?: boolean;
}) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [serverError, setServerError] = useState('');
  const submittingRef = useRef(false);
  const uid = useId();
  const trackingRef = useRef<Record<string, string>>({});

  useEffect(() => {
    trackingRef.current = readTracking();
  }, []);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const validate = (): Errors => {
    const e: Errors = {};
    if (form.name.trim().length < 2) e.name = 'Please enter your name.';
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, '')))
      e.phone = 'Enter a valid 10-digit Indian mobile number.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = 'Please enter a valid email address.';
    if (!form.consent) e.consent = 'Please accept the consent statement to continue.';
    return e;
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submittingRef.current) return;

    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`${uid}-${Object.keys(errs)[0]}`)?.focus();
      return;
    }

    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const intent = submitter?.dataset.intent || 'Request Details';

    submittingRef.current = true;
    setState('submitting');
    setServerError('');

    const payload = {
      name: form.name.trim(),
      phone: form.phone.replace(/\D/g, ''),
      email: form.email.trim(),
      requirement: form.requirement,
      enquiry_type: form.enquiryType,
      intent,
      message: form.message.trim(),
      consent: true,
      ...trackingRef.current,
    };

    try {
      const target = enquiry.endpoint || '/api/enquiry';
      const res = await fetch(target, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (!res.ok || !body.ok) {
        throw new Error(res.status === 422 ? 'Please check the details and try again.' : 'delivery');
      }
      onDone?.();
      window.location.assign(enquiry.thankYouUrl);
    } catch (err) {
      setState('error');
      setServerError(
        err instanceof Error && err.message !== 'delivery'
          ? err.message
          : `Something went wrong sending your enquiry. Please try again, or write to ${contact.email}.`,
      );
      submittingRef.current = false;
    }
  };

  const light = tone === 'light';
  const field =
    'mt-1.5 block w-full min-h-[52px] rounded-sm border border-navy/15 bg-[#f3ece7] px-3.5 py-3 text-base text-navy placeholder-navy/40 outline-none transition-colors focus:border-gold';
  const labelCls = `text-xs font-medium uppercase tracking-[0.14em] ${light ? 'text-navy/60' : 'text-pearl/70'}`;
  const errCls = `mt-1.5 text-sm ${light ? 'text-gold-deep' : 'text-gold'}`;

  return (
    <form noValidate onSubmit={submit} className="grid gap-5">
      <div className={compact ? 'grid gap-5' : 'grid gap-5 sm:grid-cols-2'}>
        <div>
          <label htmlFor={`${uid}-name`} className={labelCls}>
            Full name
          </label>
          <input
            id={`${uid}-name`}
            className={field}
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${uid}-name-err` : undefined}
          />
          {errors.name && (
            <p id={`${uid}-name-err`} className={errCls}>
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${uid}-phone`} className={labelCls}>
            Phone number
          </label>
          <input
            id={`${uid}-phone`}
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            className={field}
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? `${uid}-phone-err` : undefined}
          />
          {errors.phone && (
            <p id={`${uid}-phone-err`} className={errCls}>
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor={`${uid}-email`} className={labelCls}>
          Email
        </label>
        <input
          id={`${uid}-email`}
          type="email"
          autoComplete="email"
          className={field}
          value={form.email}
          onChange={(e) => set('email', e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? `${uid}-email-err` : undefined}
        />
        {errors.email && (
          <p id={`${uid}-email-err`} className={errCls}>
            {errors.email}
          </p>
        )}
      </div>

      <div className={compact ? 'grid gap-5' : 'grid gap-5 sm:grid-cols-2'}>
        <div>
          <label htmlFor={`${uid}-req`} className={labelCls}>
            Preferred configuration
          </label>
          <select
            id={`${uid}-req`}
            className={field}
            value={form.requirement}
            onChange={(e) => set('requirement', e.target.value)}
          >
            {enquiry.requirementOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${uid}-type`} className={labelCls}>
            Enquiry type
          </label>
          <select
            id={`${uid}-type`}
            className={field}
            value={form.enquiryType}
            onChange={(e) => set('enquiryType', e.target.value)}
          >
            {enquiry.enquiryTypeOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={`${uid}-msg`} className={labelCls}>
          Message <span className="normal-case tracking-normal opacity-60">(optional)</span>
        </label>
        <textarea
          id={`${uid}-msg`}
          rows={compact ? 2 : 3}
          className={field}
          value={form.message}
          onChange={(e) => set('message', e.target.value)}
        />
      </div>

      <div>
        <label className={`flex items-start gap-3 text-[0.9rem] ${light ? 'text-navy/70' : 'text-pearl/75'}`}>
          <input
            id={`${uid}-consent`}
            type="checkbox"
            className="mt-0.5 h-5 w-5 shrink-0 accent-gold"
            checked={form.consent}
            onChange={(e) => set('consent', e.target.checked)}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? `${uid}-consent-err` : undefined}
          />
          <span>{enquiry.consentText}</span>
        </label>
        {errors.consent && (
          <p id={`${uid}-consent-err`} className={errCls}>
            {errors.consent}
          </p>
        )}
      </div>

      {state === 'error' && (
        <p role="alert" className={`rounded-sm border px-4 py-3 text-sm ${light ? 'border-gold/40 bg-gold/5 text-navy' : 'border-gold/40 bg-navy/40 text-pearl'}`}>
          {serverError}
        </p>
      )}

      <div className="mt-1 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          data-intent="Request Details"
          disabled={state === 'submitting'}
          className="flex min-h-[52px] flex-1 items-center justify-center rounded-full bg-gold px-6 text-xs font-medium uppercase tracking-[0.18em] text-navy transition-colors hover:bg-gold/85 disabled:opacity-60"
        >
          {state === 'submitting' ? 'Sending…' : 'Request Details'}
        </button>
        <button
          type="submit"
          data-intent="Schedule Site Visit"
          disabled={state === 'submitting'}
          className={`flex min-h-[52px] flex-1 items-center justify-center rounded-full border px-6 text-xs font-medium uppercase tracking-[0.18em] transition-colors disabled:opacity-60 ${
            light
              ? 'border-gold text-navy hover:bg-gold/10'
              : 'border-gold text-gold hover:bg-gold/10'
          }`}
        >
          Schedule Site Visit
        </button>
      </div>

      <p className={`text-[0.72rem] leading-relaxed ${light ? 'text-navy/45' : 'text-pearl/45'}`}>
        By submitting you agree to be contacted about Apex Rosario. Your details are used only for
        this enquiry.
      </p>
    </form>
  );
}
