import { Fragment } from "react/jsx-runtime";

interface IPrivateLayout {
  children: React.ReactNode;
}

const PrivateLayout = (props: IPrivateLayout) => {
  const { children } = props;
  return <Fragment>{children}</Fragment>;
};

export default PrivateLayout;
