import { cn } from "@/lib/utils";

const Heading = ({
  children,
  classname = "",
}: {
  children: React.ReactNode;
  classname?: string;
}) => {
  return (
    <h1 className={cn("text-xl lg:text-3xl font-bold", classname)}>
      {children}
    </h1>
  );
};

export default Heading;
