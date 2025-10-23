interface Props {
  className?: string;
  loading?: "lazy" | "eager";
  priority?: "auto" | "high" | "low";
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props;

  const loading = loadingFromProps || "lazy";
  const priority = priorityFromProps || "low";

  // TODOReturning null while we don't have a logo
  return null;
};
