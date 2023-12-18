export const Pagination = (props) => {  
  let the_number_of_pagination_buttons;

  if (props.the_number_of_elements % props.the_number_of_elements_per_page != 0) {
    the_number_of_pagination_buttons = Math.floor(props.the_number_of_elements / props.the_number_of_elements_per_page) + 1;
  } else {
    the_number_of_pagination_buttons = Math.floor(props.the_number_of_elements / props.the_number_of_elements_per_page);
  }

  const first = () => {
    props.setPage(1);
  }

  const back = () => {
    if (props.page != 1) {
      props.setPage(props.page - 1);
    }
  }

  const move = (index) => {
    props.setPage(index);
  }

  const next = () => {
    if (props.page != the_number_of_pagination_buttons) {
      props.setPage(props.page + 1);
    }
  }
  
  const last = () => {
    props.setPage(the_number_of_pagination_buttons);
  }

  const renderPaginationButtons = () => {
    const numPagesToShow = 5;
    const pages = [];
    let startPage = Math.max(1, props.page - 2);
    let endPage = Math.min(the_number_of_pagination_buttons, startPage + numPagesToShow - 1);

    if (endPage - startPage < numPagesToShow - 1) {
      startPage = Math.max(1, endPage - numPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button key={i} onClick={() => {move(i)}} style={{color: i === props.page ? 'red' : 'black'}}>{i}</button>
      );
    }

    return pages;
  };

  return (
    <>
      <div>
        <button onClick={first}>{"<<"}</button>
        <button onClick={back}>{"<"}</button>
        {renderPaginationButtons()}
        <button onClick={next}>{">"}</button>
        <button onClick={last}>{">>"}</button>
      </div>
    </>
  );
}