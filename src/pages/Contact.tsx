import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router'
import { Button } from '../components/Button'
import { PageMeta } from '../components/PageMeta'
import { contactHero, findUs, form } from '../content/contact'
import { site } from '../content/site'
import { plans } from '../content/training'
import './Contact.css'

type Fields = {
  name: string
  email: string
  phone: string
  interest: string
  message: string
}

type Errors = Partial<Record<keyof Fields, string>>

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(f: Fields): Errors {
  const errors: Errors = {}
  if (!f.name.trim()) errors.name = 'Tell us your name.'
  if (!f.email.trim()) errors.email = 'We need an email to reply to.'
  else if (!EMAIL.test(f.email)) errors.email = 'That email does not look right.'
  return errors
}

export function Contact() {
  const [params] = useSearchParams()
  const plan = plans.find((p) => p.id === params.get('plan'))

  const [fields, setFields] = useState<Fields>({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)

  const update = (key: keyof Fields) => (e: { target: { value: string } }) => {
    setFields((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const next = validate(fields)
    setErrors(next)
    if (Object.keys(next).length > 0) {
      const first = Object.keys(next)[0]
      document.getElementById(`field-${first}`)?.focus()
      return
    }
    // Demo behavior: nothing is sent. Values are preserved so the visitor can see
    // what "would" have gone out.
    setSubmitted(true)
  }

  return (
    <>
      <PageMeta title="Contact" description={contactHero.body} />

      {/* 1. Entrance — type-led, brief so the form appears early */}
      <section className="hero-type surface-gradient-dark dark" aria-labelledby="contact-title" data-round>
        <div className="container stack">
          <span className="eyebrow">{contactHero.subtitle}</span>
          <h1 id="contact-title">{contactHero.title}</h1>
          <p className="lede muted" data-slam>{contactHero.body}</p>
        </div>
      </section>

      {/* 2. Get in Touch / Find the Pit */}
      <section className="section surface-light" aria-label="Contact details" data-round>
        <div className="container contact">
          <div className="contact__form">
            <h2>{form.title}</h2>

            {plan && (
              <p className="contact__plan">
                <span className="eyebrow">Selected plan</span>
                <span className="display contact__plan-name">
                  {plan.name} — ${plan.price}
                  {plan.period}
                </span>
              </p>
            )}

            <form noValidate onSubmit={onSubmit} aria-describedby="demo-note" data-rise>
              {plan && <input type="hidden" name="plan" value={plan.id} />}

              <div className={`field ${errors.name ? 'field--error' : ''}`}>
                <label htmlFor="field-name">Name</label>
                <input
                  id="field-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={fields.name}
                  onChange={update('name')}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'error-name' : undefined}
                />
                {errors.name && (
                  <p id="error-name" className="field__error">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className={`field ${errors.email ? 'field--error' : ''}`}>
                <label htmlFor="field-email">Email</label>
                <input
                  id="field-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={fields.email}
                  onChange={update('email')}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'error-email' : undefined}
                />
                {errors.email && (
                  <p id="error-email" className="field__error">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="field">
                <label htmlFor="field-phone">
                  Phone <span className="muted">(optional)</span>
                </label>
                <input
                  id="field-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={fields.phone}
                  onChange={update('phone')}
                />
              </div>

              <div className="field">
                <label htmlFor="field-interest">Training interest</label>
                <select id="field-interest" name="interest" value={fields.interest} onChange={update('interest')}>
                  <option value="">Select training type</option>
                  {form.interests.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="field-message">Message</label>
                <textarea
                  id="field-message"
                  name="message"
                  rows={5}
                  placeholder={form.messagePlaceholder}
                  value={fields.message}
                  onChange={update('message')}
                />
              </div>

              <div className="contact__submit">
                <Button type="submit" variant="accent" size="lg">
                  {form.submit}
                </Button>
                <p id="demo-note" className="contact__demo-note muted">
                  {form.demoNote}
                </p>
              </div>
            </form>

            <div className="contact__confirm" role="status" aria-live="polite">
              {submitted && (
                <>
                  <h3>{form.confirmation.title}</h3>
                  <p>{form.confirmation.body}</p>
                </>
              )}
            </div>
          </div>

          <aside className="contact__info">
            <h2>{findUs.title}</h2>

            <div className="info" data-rise>
              <h3 className="eyebrow">Location</h3>
              <p>
                {site.address.street}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </p>
            </div>

            <div className="info" data-rise>
              <h3 className="eyebrow">Phone</h3>
              <p>
                <a href={site.phoneHref}>{site.phoneDisplay}</a>
              </p>
            </div>

            <div className="info" data-rise>
              <h3 className="eyebrow">Email</h3>
              <p>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>
            </div>

            <div className="info" data-rise>
              <h3 className="eyebrow">Hours</h3>
              <dl className="hours">
                {site.hours.map((h) => (
                  <div key={h.days} className="hours__row">
                    <dt>{h.days}</dt>
                    <dd>{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
