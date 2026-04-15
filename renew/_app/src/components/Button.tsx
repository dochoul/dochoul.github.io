import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';
import './Button.css';

type Variant = 'primary' | 'ghost' | 'outline';
type Size = 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

type AnchorProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className'> & {
    href: string;
    external?: boolean;
  };

type NativeButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> & {
    href?: undefined;
  };

export type ButtonProps = AnchorProps | NativeButtonProps;

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    children,
    icon,
    className,
  } = props;

  const classes = ['btn', `btn--${variant}`, `btn--${size}`, className ?? '']
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <span className="btn__label">{children}</span>
      {icon ? <span className="btn__icon">{icon}</span> : null}
    </>
  );

  if (isAnchor(props)) {
    const { href, external, target, rel, ...anchorAttrs } =
      extractAnchorAttrs(props);
    const resolvedTarget = external ? '_blank' : target;
    const resolvedRel = external ? 'noopener noreferrer' : rel;

    return (
      <a
        {...anchorAttrs}
        href={href}
        target={resolvedTarget}
        rel={resolvedRel}
        className={classes}
      >
        {content}
      </a>
    );
  }

  const buttonAttrs = extractButtonAttrs(props);
  return (
    <button
      type={buttonAttrs.type ?? 'button'}
      {...buttonAttrs}
      className={classes}
    >
      {content}
    </button>
  );
}

function isAnchor(props: ButtonProps): props is AnchorProps {
  return typeof (props as AnchorProps).href === 'string';
}

function extractAnchorAttrs(
  props: AnchorProps,
): AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  external?: boolean;
} {
  const { variant, size, icon, className, children, ...rest } = props;
  void variant;
  void size;
  void icon;
  void className;
  void children;
  return rest;
}

function extractButtonAttrs(
  props: NativeButtonProps,
): ButtonHTMLAttributes<HTMLButtonElement> {
  const { variant, size, icon, className, children, href, ...rest } = props;
  void variant;
  void size;
  void icon;
  void className;
  void children;
  void href;
  return rest;
}
