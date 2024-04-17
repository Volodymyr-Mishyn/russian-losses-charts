import SvgIcon from "@mui/material/SvgIcon";

export interface DynamicIconProps {
  name: string;
  path: string;
  size?: number;
  className?: string;
}

export function DynamicIcon({ name, path, size = 24, className }: DynamicIconProps) {
  const imageUrl = `${path}/${name}.svg`;
  return (
    <SvgIcon className={className} style={{ width: size, height: size }} component="svg">
      <image href={imageUrl} width="100%" height="100%" />
    </SvgIcon>
  );
}
