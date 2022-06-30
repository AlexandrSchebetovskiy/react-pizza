import React from 'react';

export default function Sort({ value, onClickSort, order, onClickOrder }) {
  const [isVisible, setIsVisible] = React.useState(false);

  const list = [
    { name: 'популярности', sortProp: 'rating' },
    { name: 'цене', sortProp: 'price' },
    { name: 'алфавиту', sortProp: 'title' },
  ];

  const onClickListItem = (i) => {
    onClickSort(i);
    setIsVisible(false);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <div>
          <div className="sort__way" onClick={() => onClickOrder(+!order)}>
            <svg
              className={order ? 'rotate' : ''}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24">
              <path d="M6 3l-6 8h4v10h4v-10h4l-6-8zm16 14h-8v-2h8v2zm2 2h-10v2h10v-2zm-4-8h-6v2h6v-2zm-2-4h-4v2h4v-2zm-2-4h-2v2h2v-2z" />
            </svg>
          </div>
          <b>Сортировка по:</b>
        </div>
        <span onClick={() => setIsVisible(!isVisible)}>{value.name}</span>
      </div>

      {isVisible && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, i) => (
              <li
                key={i}
                className={value.sortProp === obj.sortProp ? 'active' : ''}
                onClick={() => onClickListItem(obj)}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
