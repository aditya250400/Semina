import { Button } from "react-bootstrap";

function SButton({
  children,
  action,
  variant,
  size,
  loading,
  disabled,
  className,
  ...props
}) {
  return (
    <Button
      className={className}
      onClick={action}
      variant={variant}
      disabled={disabled}
      size={size}
      {...props}
    >
      {loading ? "Loading..." : children}
    </Button>
  );
}

export default SButton;
