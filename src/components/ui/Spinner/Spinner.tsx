import styles from './Spinner.module.scss';

type Size = 'sm' | 'md' | 'lg';

interface SpinnerProps {
  size?: Size;
  centered?: boolean;
}

export function Spinner({ size = 'md', centered = false }: SpinnerProps) {
  const spinner = <span className={[styles.spinner, styles[size]].join(' ')} />;

  if (centered) {
    return <div className={styles.wrapper}>{spinner}</div>;
  }

  return spinner;
}
