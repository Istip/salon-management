import { motion } from 'framer-motion';

const Animate = (props) => {
  const variants = {
    hidden: { opacity: 0, x: -20 },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 0 },
  };

  return (
    <motion.main
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      {props.children}
    </motion.main>
  );
};

export default Animate;
