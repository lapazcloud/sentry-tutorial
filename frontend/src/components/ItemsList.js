import React from 'react';

function ItemsList(props) {
  const deleteButtonHandler = (e) => {
    console.log(e.currentTarget.dataset);
    props.onDelete(e.currentTarget.dataset.itemid);
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Value</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {props.items.map((item) => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.value}</td>
          <td>
            <button
              disabled={!props.deleteEnabled}
              data-itemid={item.id}
              type="button"
              onClick={deleteButtonHandler}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}

export default ItemsList;
