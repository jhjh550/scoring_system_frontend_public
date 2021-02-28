import React from 'react';
import styled from 'styled-components';
import qs from 'qs';
import Button from '../common/Button';

const PaginationBlock = styled.div`
  width: 360px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  margin-top: 3rem;
`;

const PaginationBlockLarge = styled(PaginationBlock)`
  width: 720px;
`;

const PageNumber = styled.div`
  &:hover {
    cursor: pointer;
    color: #ff8787;
  }
`;

const PageButton = styled(Button)`
  min-width: 72px;
`;

const buildLink = ({ search, page }) => {
  const res = qs.parse(search, {
    ignoreQueryPrefix: true,
  });

  const queryobj = {
    ...res,
    page,
  };

  const query = qs.stringify(queryobj);
  return `/scoredList?${query}`;
};

const pushItem = (page, search, index) => {
  if (page === index) {
    return <PageButton disabled>{index}</PageButton>;
  } else {
    return (
      <PageButton to={buildLink({ search, page: index })}>{index}</PageButton>
    );
  }
};

const Pagination = ({ page, lastPage, search }) => {
  const length = 6;
  const center = 3;

  let pageItems = [];
  if (lastPage <= length) {
    for (var i = 1; i <= lastPage; i++) {
      pageItems.push(pushItem(page, search, i));
    }
  } else {
    const startIndex_ = page - center;
    const startIndex = startIndex_ < 1 ? 1 : startIndex_;
    const endIndex_ = startIndex + length;
    const endIndex = endIndex_ < lastPage ? endIndex_ : lastPage;

    pageItems.push(
      <PageButton to={buildLink({ search, page: 1 })}>처음(1)</PageButton>,
    );
    pageItems.push(<span> ... </span>);

    for (var i = startIndex; i <= endIndex; i++) {
      pageItems.push(pushItem(page, search, i));
    }

    pageItems.push(<span> ... </span>);
    pageItems.push(
      <PageButton to={buildLink({ search, page: lastPage })}>
        끝({lastPage})
      </PageButton>,
    );
  }

  /**
   * return props.to ? (
    <StyledLink {...props} cyan={props.cyan ? 1 : 0} big={props.big ? 1 : 0} />
  ) : (
    <StyledButton {...props} />
  );
   */
  return lastPage <= length ? (
    <PaginationBlock>{pageItems}</PaginationBlock>
  ) : (
    <PaginationBlockLarge>{pageItems}</PaginationBlockLarge>
  );
};

export default Pagination;
