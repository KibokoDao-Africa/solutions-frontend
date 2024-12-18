// src/components/Pagination.js
import React from 'react';
import { Pagination, PaginationItem } from '@mui/material';

const PaginationComponent = ({ count, currentPage, handlePageChange }) => {
  return (
    <Pagination
      count={count}
      page={currentPage}
      onChange={handlePageChange}
      siblingCount={1}
      boundaryCount={1}
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          sx={{
            borderRadius: '8px',
            boxShadow: 2,
            '&.Mui-selected': {
              backgroundColor: '#9b51e0',
              color: '#fff',
            },
          }}
        />
      )}
    />
  );
};

export default PaginationComponent;
