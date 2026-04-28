"use client";

import { useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { motion } from "motion/react";
import { Copy, Mail, MapPin } from "lucide-react";
import { SocialIcon } from "react-social-icons";
import { toast } from "react-toastify";

import FloatingField from "@components/contact/FloatingField";
import MorphingSubmitButton, {
  SubmitStatus,
} from "@components/contact/MorphingSubmitButton";

import { TContactForm } from "@utils/types";
import { EMAIL, SOCIALS, snackbarOptions } from "@utils/constants";
import { cn } from "@lib/utils";

import "react-toastify/dist/ReactToastify.css";

const validate = (values: TContactForm) => {
  const errors: Partial<Record<keyof TContactForm, string>> = {};
  if (!values.fullName.trim()) errors.fullName = "Full name is required";
  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email";
  }
  if (!values.subject.trim()) errors.subject = "Subject is required";
  if (!values.body.trim()) {
    errors.body = "Message can't be empty";
  } else if (values.body.trim().length < 10) {
    errors.body = "A bit more detail helps";
  }
  return errors;
};

const ContactScreen = () => {
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleSubmit = async (
    values: TContactForm,
    helpers: FormikHelpers<TContactForm>
  ) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/v1/contact", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "content-type": "application/json" },
      });
      if (res.status === 200) {
        setStatus("success");
        toast.success("Email sent.", snackbarOptions);
        helpers.resetForm();
        setTimeout(() => setStatus("idle"), 2400);
      } else {
        setStatus("error");
        toast.error("Something went wrong.", snackbarOptions);
        setTimeout(() => setStatus("idle"), 2400);
      }
    } catch {
      setStatus("error");
      toast.error("Network error.", snackbarOptions);
      setTimeout(() => setStatus("idle"), 2400);
    }
  };

  return (
    <section
      id="contact"
      className="relative flex min-h-[calc(100vh-5rem)] w-full scroll-mt-24 items-center px-6 py-24 md:px-12 md:py-28 lg:px-24 xl:px-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,hsl(var(--accent)/0.18),transparent_45%),radial-gradient(circle_at_85%_75%,hsl(var(--accent)/0.10),transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)/0.7) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)/0.7) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto grid w-full max-w-6xl gap-8 rounded-3xl border border-border/70 bg-card/40 p-6 shadow-glow backdrop-blur-md md:p-10 lg:grid-cols-[0.95fr_1.15fr] lg:gap-14 lg:p-12"
      >
        <ContactInfo />
        <ContactForm status={status} onSubmit={handleSubmit} />
      </motion.div>
    </section>
  );
};

const ContactInfo = () => {
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      toast.success("Email copied", snackbarOptions);
    } catch {
      toast.error("Couldn't copy email", snackbarOptions);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-5">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Available for new work
        </span>

        <h2 className="font-display text-fluid-4xl font-semibold tracking-editorial text-balance">
          Let&apos;s build
          <span className="block text-accent">something sharp.</span>
        </h2>

        <p className="max-w-md text-base text-muted-foreground text-pretty">
          Got a project, role, or idea worth talking about? Send a note and I
          usually reply within a day.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={copyEmail}
          className="group flex items-center justify-between gap-4 rounded-2xl border border-border/70 bg-background/40 p-4 text-left transition-colors hover:border-accent/40 hover:bg-background/60"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card">
              <Mail className="h-4 w-4 text-accent" />
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Email
              </span>
              <span className="text-sm font-medium text-foreground">
                {EMAIL}
              </span>
            </div>
          </div>
          <Copy className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-accent" />
        </button>

        <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/40 p-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card">
            <MapPin className="h-4 w-4 text-accent" />
          </span>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Location
            </span>
            <span className="text-sm font-medium text-foreground">
              Remote · Worldwide
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          Elsewhere
        </span>
        <div className="flex items-center gap-2">
          {SOCIALS.map((s) => (
            <SocialIcon
              key={s.label}
              url={s.href}
              target="_blank"
              bgColor="transparent"
              fgColor="currentColor"
              className="!h-10 !w-10 text-muted-foreground transition-colors hover:!text-accent"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

type ContactFormProps = {
  status: SubmitStatus;
  onSubmit: (
    values: TContactForm,
    helpers: FormikHelpers<TContactForm>
  ) => Promise<void> | void;
};

const ContactForm = ({ status, onSubmit }: ContactFormProps) => {
  return (
    <Formik<TContactForm>
      initialValues={{ fullName: "", email: "", subject: "", body: "" }}
      validate={validate}
      onSubmit={onSubmit}
    >
      <Form
        className={cn(
          "relative flex w-full flex-col gap-5 rounded-2xl border border-border/60 bg-background/40 p-5 backdrop-blur-sm md:p-6"
        )}
      >
        <div className="grid gap-5 md:grid-cols-2">
          <FloatingField
            name="fullName"
            label="Full name"
            required
            maxLength={50}
            autoComplete="name"
          />
          <FloatingField
            name="email"
            label="Email"
            type="email"
            required
            maxLength={100}
            autoComplete="email"
          />
        </div>

        <FloatingField
          name="subject"
          label="Subject"
          required
          maxLength={80}
        />

        <FloatingField
          name="body"
          label="Message"
          variant="textarea"
          required
          maxLength={500}
          rows={5}
        />

        <div className="mt-1 flex items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            By sending, you agree your message will be used to reply to you.
          </p>
          <MorphingSubmitButton status={status} />
        </div>
      </Form>
    </Formik>
  );
};

export default ContactScreen;
