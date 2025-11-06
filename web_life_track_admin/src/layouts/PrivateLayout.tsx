interface IPrivateLayout {
  children: React.ReactNode;
}

const PrivateLayout = (props: IPrivateLayout) => {
  const { children } = props;
  return <div>{children}</div>;
};

export default PrivateLayout;
