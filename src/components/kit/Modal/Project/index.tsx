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
      className="max-w-sm md:max-w-xl"
      classNames={{
        base: "bg-indigo-900/50",
        body: "scrollbar-thin scrollbar-thumb-indigo-900 scrollbar-track-gray-100",
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
              >
                View Site
              </Link>
            </ModalHeader>
            <ModalBody>
              {/* eslint-disable-next-line @next/next/no-img-element*/}
              <img
                src={data.imageSrc}
                alt={data.title}
                className="shrink-0 rounded-lg max-h-sm md:max-h-full"
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
                Tech Stack:{" "}
              </h1>
              <Badge>{data.stack}</Badge>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalKit;
