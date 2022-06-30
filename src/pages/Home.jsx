import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import NotFoundBlock from '../components/NotFoundBlock';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const orderMap = ['asc', 'desc'];

const Home = () => {
  const { searchValue } = React.useContext(SearchContext);

  const url = 'https://62b22dc120cad3685c8aadda.mockapi.io/items';
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({ name: 'популярности', sortProp: 'rating' });
  const [order, setOrder] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);

  const createQueryString = () => {
    let qs =
      url + `?page=${currentPage}&limit=4&sortBy=${sortType.sortProp}&order=${orderMap[order]}`;
    if (categoryId !== 0) {
      qs += `&category=${categoryId}`;
    }
    if (searchValue) {
      qs += `&search=${searchValue}`;
    }
    return qs;
  };

  React.useEffect(() => {
    setIsLoading(true);

    const queryString = createQueryString();

    fetch(queryString)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, order, searchValue, currentPage]);

  const pizzas = items.map((pizza) => <PizzaBlock key={pizza.id} pizza={pizza} />);

  const skeletons = [...new Array(4)].map((_, id) => <Skeleton key={id} />);
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(i) => setCategoryId(i)} />
        <Sort
          value={sortType}
          onClickSort={(i) => setSortType(i)}
          order={order}
          onClickOrder={(i) => setOrder(i)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {pizzas.length ? (
        <>
          <div className="content__items">{isLoading ? skeletons : pizzas}</div>
          <Pagination onChangePage={(number) => setCurrentPage(number)} />
        </>
      ) : (
        <NotFoundBlock />
      )}
    </div>
  );
};

export default Home;
