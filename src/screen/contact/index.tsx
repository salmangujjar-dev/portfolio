"use client";

import { Input, Textarea } from "@nextui-org/react";
import { Form, Formik } from "formik";

const ContactScreen = () => {
  return (
    <div className="w-full md:px-8 px-2 lg:px-32 xl:px-48 flex justify-center">
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          subject: "",
          body: "",
        }}
        onSubmit={() => {}}
      >
        <Form className="flex flex-col gap-y-5 w-96">
          <Input
            isRequired
            type="name"
            label="Full Name"
            variant="bordered"
            className="w-full"
          />
          <Input
            isRequired
            type="email"
            label="Email"
            placeholder="name@example.com"
            variant="bordered"
            className="col-span-6"
          />
          <Input
            isRequired
            type="subject"
            label="Subject"
            variant="bordered"
            className="col-span-6"
          />
          <Textarea
            isRequired
            type="body"
            label="Body"
            placeholder="..."
            variant="bordered"
            disableAnimation
            disableAutosize
            classNames={{
              base: "col-span-6",
              input: "resize-y max-h-[12rem] min-h-[8rem] ",
            }}
          />
        </Form>
      </Formik>
    </div>
  );
};

export default ContactScreen;
