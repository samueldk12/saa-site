// Arquivo stub temporário para o framer-motion
export const motion = {
  div: (props) => <div {...props}>{props.children}</div>,
  section: (props) => <section {...props}>{props.children}</section>,
  ul: (props) => <ul {...props}>{props.children}</ul>,
  li: (props) => <li {...props}>{props.children}</li>,
  a: (props) => <a {...props}>{props.children}</a>,
  button: (props) => <button {...props}>{props.children}</button>,
  nav: (props) => <nav {...props}>{props.children}</nav>,
  p: (props) => <p {...props}>{props.children}</p>,
  span: (props) => <span {...props}>{props.children}</span>,
};

export const AnimatePresence = ({ children }) => <>{children}</>;

export const useScroll = () => ({ scrollYProgress: { get: () => 0 } });
export const useTransform = () => 0;
export const useSpring = () => 0; 