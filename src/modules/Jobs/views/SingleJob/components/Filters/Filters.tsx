import React, { FC } from 'react';
import styles from './Filters.module.scss';

interface IFiltersProps {
  location?: string;
  activeFilter: string;
  changeFilter: (filterName: string) => void;
  filters: Array<{
    name: string;
    label: string;
    total: number;
  }>;
}

const Filters: FC<IFiltersProps> = (props) => {
  return (
    <ul className={styles.filtersList}>
      {props.filters.map((filter) => (
        <li
          className={
            props.activeFilter === filter.name
              ? styles.filterActive
              : styles.filter
          }
          key={filter.name}
          onClick={() => props.changeFilter(filter.name)}
        >
          {props.location === 'All Locations' ? (
            <div className={styles.filterTotal}>{filter.total}</div>
          ) : null}

          <div className={styles.filterName}>{filter.label}</div>
        </li>
      ))}
    </ul>
  );
};

export default Filters;
