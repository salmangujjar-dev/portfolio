"use client";

import { Button } from "@nextui-org/react";
import { Form, Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { easeInOut, motion } from "framer-motion";

import FieldArea from "@components/kit/FieldArea";

import { TContactForm } from "@utils/types";
import { snackbarOptions } from "@utils/constants";

import "react-toastify/dist/ReactToastify.css";
import { Typewriter } from "react-simple-typewriter";
import { RoughNotation } from "react-rough-notation";

const ContactScreen = () => {
  return (
    <motion.div
      initial={{ scale: 0.4, opacity: 0.5 }}
      animate={{ scale: [0.4, 1.2, 1], opacity: 1 }}
      transition={{ duration: 1, ease: easeInOut }}
      className="w-full md:px-8 px-2 lg:px-32 xl:px-48 py-6 flex flex-col items-center gap-y-10 justify-center"
    >
      <ToastContainer position="top-right" />
      <RoughNotation
        show
        type={"highlight"}
        animationDelay={1200}
        animationDuration={1000}
        color="#818cf8"
      >
        <h1 className="font-montserrat text-2xl md:text-5xl text-center tracking-[0.1rem] md:tracking-[0.2rem] font-bold text-white uppercase">
          Get in Touch{" "}
          <Typewriter
            words={["..."]}
            loop={true}
            cursor
            cursorStyle="_"
            typeSpeed={200}
          />
        </h1>
      </RoughNotation>

      <Formik<TContactForm>
        initialValues={{
          fullName: "",
          email: "",
          subject: "",
          body: "",
        }}
        onSubmit={async (values, { resetForm }) => {
          const response: any = await fetch("/api/v1/contact", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
              "content-type": "application/json",
            },
          });

          if (response.status === 200) {
            toast.success("Email Sent!", snackbarOptions);
            resetForm();
          } else {
            toast.error(`Some error occurred!`, snackbarOptions);
          }
        }}
      >
        <Form className="flex flex-col gap-y-5 w-full max-w-96">
          <FieldArea
            component={FieldArea.componenet}
            type="text"
            name="fullName"
            label="Full Name"
            required
          />
          <FieldArea
            component={FieldArea.componenet}
            type="email"
            name="email"
            label="Email"
            required
          />
          <FieldArea
            component={FieldArea.componenet}
            type="text"
            name="subject"
            label="Subject"
            required
          />
          <FieldArea
            component={FieldArea.componenet}
            type="textarea"
            name="body"
            label="Body"
            required
          />

          <Button
            color="primary"
            variant="bordered"
            className="border-indigo-500 text-indigo-400 font=semibold tracking-widest uppercase hover:text-lg hover:font-bold"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </Formik>
    </motion.div>
  );
};

export default ContactScreen;
