import { FC } from 'react';
import styles from '../styles/spiner.module.css';

type SpinerProps = {
    color?: 'white' | 'indigo';
};

const Spinner: FC<SpinerProps> = ({ color = 'white' }) => {
    return (
        <svg className={styles.spinner} viewBox="0 0 50 50">
            <circle
                className={styles.path}
                style={{ stroke: color === 'indigo' ? '#6366f1' : 'white' }}
                cx="25"
                cy="25"
                r="20"
                fill="none"
                strokeWidth="5"></circle>
        </svg>
    );
};

export default Spinner;
