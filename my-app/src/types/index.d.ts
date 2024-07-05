type TActiveLinkProps = {
  url: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
};

type TMenuItem = {
  url: string;
  title: string;
  icon: React.ReactNode;
};

// Course

type TCreateUserParams = {
  clerkId: string;
  username: string;
  email: string;
  name?: string;
  avatar?: string;
};

export { TActiveLinkProps, TMenuItem, TCreateUserParams };
