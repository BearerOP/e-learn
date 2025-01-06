import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import MorphingText from "@/components/ui/morphing-text";

export function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center gap-4 justify-center min-h-[80vh] text-custom-green-text text-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center h-full w-96 "
      >
        <div className="font-bold mr-4">404</div>
        <Separator
          className="bg-custom-green-bg h-14 w"
          orientation="vertical"
        />
        <MorphingText
          className=""
          texts={[
            'Oopsie daisy!!',
            "Page Not Found!",
            "Oops!!",
            "Something went wrong!",
            "Ohh No!!",
            "Page not reachable",
            "This page can't be reached!",
          ]}
        />
      </motion.div>
    </div>
  );
}
