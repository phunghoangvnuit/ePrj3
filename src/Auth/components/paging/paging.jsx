import  { useState, useEffect } from 'react';
import "./paging.css"
import { Pagination } from 'antd';
const Paging = (props) => {
    const [pageSize, setPageSize] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const handlePageClick = (e) => {
        props.changePage(+e.selected + 1);
        setPageSize(props.pageSize);
        setPageCount(props.pageCount);
    };

    useEffect(() => {
        setPageSize(props.pageSize);
        setPageCount(props.pageCount);
    }, [props.pageSize, props.pageCount]);

    return (
      <>
          <Pagination
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={props.pageSize}
            pageCount={props.pageCount}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
          />
      </>
    );
};

export default Paging;
