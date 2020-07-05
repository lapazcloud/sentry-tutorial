import React from 'react';

function ItemsForm(props) {
  const submitHandler = (e) => {
    e.preventDefault();
    const idElement = e.currentTarget.elements.id;
    const valueElement = e.currentTarget.elements.value;
    props.onItemAdded && props.onItemAdded({id: idElement.value, value: valueElement.value});

    idElement.value = '';
    valueElement.value = '';
  }
  return (
    <form className="items-form" onSubmit={submitHandler}>
      <label htmlFor="id">Id:</label>
      <input type="text" name="id" />
      &nbsp;&nbsp;&nbsp;
      <label htmlFor="value">Value:</label>
      <input type="text" name="value" />
      <button type="submit">Save</button>
    </form>
  );
}

export default ItemsForm;
