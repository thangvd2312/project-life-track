interface IDefaultLayout {
  children: React.ReactNode;
}

const DefaultLayout = (props: IDefaultLayout) => {
  const { children } = props;
  return <div>{children}</div>;
};

export default DefaultLayout;
