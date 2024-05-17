import {
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";

import Badge from "@components/kit/Badge";

import { TProjects } from "@utils/types";

type Props = {
  isOpen: boolean;
  data: TProjects;
  onClose: () => void;
};

const ModalKit = (props: Props) => {
  const { isOpen, data, onClose } = props;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      backdrop="blur"
      scrollBehavior="inside"
      placement="auto"
      isDismissable={false}
      className="max-w-sm md:max-w-xl"
      classNames={{
        wrapper: "overflow-y-hidden",
        base: "bg-indigo-900/80",
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {data.title}
              <Link
                isExternal
                href={data.url}
                showAnchorIcon
                underline="always"
                className="max-w-fit text-sky-500"
              >
                View Site
              </Link>
            </ModalHeader>
            <ModalBody className="mb-2">
              {/* eslint-disable-next-line @next/next/no-img-element*/}
              <img
                src={data.imageSrc}
                alt={data.title}
                className="shrink-0 rounded-lg max-h-sm md:max-h-full select-none"
              />

              <p>{data.description}</p>
              <h1 className="text-xl font-sans tracking-[0.3rem] font-extrabold">
                Features:{" "}
              </h1>
              <div className="flex flex-wrap gap-2">
                {data.features.map((item, index) => (
                  <Badge key={index}>{item}</Badge>
                ))}
              </div>
              <h1 className="text-xl font-sans tracking-[0.3rem] font-extrabold">
                Technology:{" "}
              </h1>
              <div className="flex justify-between flex-wrap">
                {data.technologies.map((item, index) => (
                  <div
                    className="relative pt-7 group"
                    key={index}
                  >
                    <span className="transition-all text-nowrap opacity-0 origin-bottom scale-0 group-hover:scale-100 group-hover:opacity-100 text-sm duration-200 font-normal focus:outline-none invisible px-2 py-1.5 bg-black text-white rounded-lg shadow-sm group-hover:visible absolute top-0 z-10 right-0">
                      {item.label}
                    </span>
                    <item.icon className={"w-16 h-16"} />
                  </div>
                ))}
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalKit;
