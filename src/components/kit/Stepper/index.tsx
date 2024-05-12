import { motion } from "framer-motion";

type TStepper = {
  title: String;
  hash: String;
  hashLink: String;
  duration: String;
  details: String;
};

const Stepper: React.FC<TStepper> = ({
  title,
  hash,
  hashLink,
  duration,
  details,
}) => {
  return (
    <li className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-center justify-between md:w-[80%]">
      <figure className="absolute left-0 stroke-dark dark:stroke-light">
        <svg
          className="-rotate-90 md:w-[60px] md:h-[60px] xs:w-[40px] xs:h-[40px]"
          width={"75"}
          height={"75"}
          viewBox="0 0 100 100"
        >
          <motion.circle
            cx={"75"}
            cy={"50"}
            r={"20"}
            className="stroke-primary dark:stroke-primaryDark stroke-1 fill-none"
          />
          <motion.circle
            cx={"75"}
            cy={"50"}
            r={"20"}
            className="stroke-[5px] fill-light dark:fill-dark"
          />
          <motion.circle
            cx={"75"}
            cy={"50"}
            r={"10"}
            className=" animate-pulse stroke-1 fill-primary dark:fill-primaryDark"
          />
        </svg>
      </figure>
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <h3 className="capitalize font-bold text-xl sm:text-xl xs:text-lg">
          {title}{" "}
          <a
            target="_blank"
            className="text-primary dark:text-primaryDark capitalize"
            href={`${hashLink}`}
          >
            @{hash}{" "}
          </a>{" "}
        </h3>
        <span className="capitalize font-medium text-dark/75 dark:text-light/75 xs:text-sm">
          {duration}{" "}
        </span>
        <p className="font-medium w-full md:text-sm text-justify">{details}</p>
      </motion.div>
    </li>
  );
};
export default Stepper;
