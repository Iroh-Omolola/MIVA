import React from "react";
import { Button, ButtonGroup, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <ButtonGroup>
      <IconButton
        aria-label="Previous page"
        icon={<ChevronLeftIcon />}
        onClick={() => handlePageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
      />
      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1;
        return (
          <Button
            key={page}
            variant={currentPage === page ? "solid" : "outline"}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Button>
        );
      })}
      <IconButton
        aria-label="Next page"
        icon={<ChevronRightIcon />}
        onClick={() => handlePageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
      />
    </ButtonGroup>
  );
};

export default Pagination;
