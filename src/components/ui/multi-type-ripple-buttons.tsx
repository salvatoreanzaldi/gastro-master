import React, { ReactNode, useState, MouseEvent, CSSProperties } from 'react';

interface RippleState {
  key: number;
  x: number;
  y: number;
  size: number;
}

interface RippleButtonProps {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
}

const JS_RIPPLE_KEYFRAMES = `
  @keyframes js-ripple-animation {
    0% { transform: scale(0); opacity: 0.5; }
    100% { transform: scale(1); opacity: 0; }
  }
  .animate-js-ripple-effect {
    animation: js-ripple-animation 600ms ease-out forwards;
  }
`;

const RippleButton: React.FC<RippleButtonProps> = ({
  children,
  onClick,
  className = '',
  disabled = false,
}) => {
  const [ripples, setRipples] = useState<RippleState[]>([]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    const key = Date.now();
    setRipples(prev => [...prev, { key, x, y, size }]);
    setTimeout(() => setRipples(cur => cur.filter(r => r.key !== key)), 600);
    if (!disabled && onClick) onClick(event);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: JS_RIPPLE_KEYFRAMES }} />
      <button
        className={`relative overflow-hidden ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        onClick={handleClick}
        disabled={disabled}
      >
        <span className="relative z-10 pointer-events-none">{children}</span>
        <div className="absolute inset-0 pointer-events-none z-20">
          {ripples.map(r => (
            <span
              key={r.key}
              className="absolute rounded-full animate-js-ripple-effect bg-white/30"
              style={{ left: r.x, top: r.y, width: r.size, height: r.size } as CSSProperties}
            />
          ))}
        </div>
      </button>
    </>
  );
};

export { RippleButton };
