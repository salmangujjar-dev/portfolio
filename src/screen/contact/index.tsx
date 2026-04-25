"use client";

import { Form, Formik } from "formik";
import { motion } from "motion/react";
import { toast } from "react-toastify";

import { Button } from "@components/ui/button";
import FieldArea from "@components/kit/FieldArea";

import { TContactForm } from "@utils/types";
import { snackbarOptions } from "@utils/constants";

import "react-toastify/dist/ReactToastify.css";

const ContactScreen = () => {
  return (
    <section
      id="contact"
      className="relative w-full px-6 py-24 md:px-12 md:py-32 lg:px-24 xl:px-40"
    >
      <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto flex max-w-3xl flex-col items-center gap-y-12"
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
          Contact
        </span>
        <h1 className="font-display text-fluid-3xl font-semibold tracking-editorial text-balance">
          Get in <span className="text-accent">touch</span>
        </h1>
        <p className="max-w-md text-sm text-muted-foreground text-pretty">
          Got a project, role, or idea worth talking about? Drop a note — I read
          everything.
        </p>
      </div>

      <Formik<TContactForm>
        initialValues={{
          fullName: "",
          email: "",
          subject: "",
          body: "",
        }}
        onSubmit={async (values, { resetForm }) => {
          const response = await fetch("/api/v1/contact", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
              "content-type": "application/json",
            },
          });

          if (response.status === 200) {
            toast.success("Email sent.", snackbarOptions);
            resetForm();
          } else {
            toast.error("Something went wrong.", snackbarOptions);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex w-full max-w-lg flex-col gap-y-5">
            <FieldArea
              component={FieldArea.component}
              type="text"
              name="fullName"
              label="Full Name"
              required
            />
            <FieldArea
              component={FieldArea.component}
              type="email"
              name="email"
              label="Email"
              required
            />
            <FieldArea
              component={FieldArea.component}
              type="text"
              name="subject"
              label="Subject"
              required
            />
            <FieldArea
              component={FieldArea.component}
              type="textarea"
              name="body"
              label="Message"
              required
            />

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="mt-2 uppercase tracking-[0.2em]"
            >
              {isSubmitting ? "Sending…" : "Send message"}
            </Button>
          </Form>
        )}
      </Formik>
    </motion.div>
    </section>
  );
};

export default ContactScreen;
