import React from 'react';
import { ItemsService } from './api';
import ItemsForm from './components/ItemsForm';
import ItemsList from './components/ItemsList';

class ItemsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
    this.service = new ItemsService({ getToken: () => localStorage.getItem('token') });
    this.deleteHandler = this.deleteHandler.bind(this);
    this.itemAddedHandler = this.itemAddedHandler.bind(this);
  }
  loadItems() {
    this.service.list().then(({data}) => {
      this.setState({items: data.data})
    });
  }
  async itemAddedHandler(data) {
    try {
      await this.service.add(data);
      this.loadItems();
    } catch(err) {
      console.error(err);
    }
  }
  async deleteHandler(itemId) {
    await this.service.delete(itemId);
    this.loadItems();
  }
  componentDidMount() {
    this.loadItems();
  }
  render() {
    return <React.Fragment>
      <h1>Items</h1>
      {this.props.auth.role === 'admin'
        ? <ItemsForm
          onItemAdded={this.itemAddedHandler}
        />
        : ''
      }
      <br />
      <ItemsList
        items={this.state.items}
        deleteEnabled={this.props.auth.role === 'admin'}
        onDelet={this.deleteHandler}
      />
    </React.Fragment>
  }
}

export default ItemsContainer;
