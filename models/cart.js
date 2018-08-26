//Cart constructor
module.exports = function Cart(oldCart) { //oldcart holds existing/initial items
  this.items = oldCart.items || {}; //if no oldcart obj, then {}
  this.totalQty = oldCart.totalQty || 0; //if no oldcart.totalQty, then 0
  this.totalPrice = oldCart.totalPrice || 0; //if no oldcart.totalPrice, then 0

  this.add = function(newItem, id) {
    //check if this item already exists in the cart
    let storedItem = this.items[id];
    //if doesnt exist , then create new item
    if (!storedItem) {
      storedItem = this.items[id] = {item: newItem, qty: 0, price: 0}
    }
    storedItem.qty++;
    storedItem.price = storedItem.item.price * storedItem.qty;
    this.totalQty++;
    this.totalPrice += storedItem.item.price;
  };

  this.generateArray = function(){
    let arr = [];
    for (const id in this.items) {
      if (this.items.hasOwnProperty(id)) {
        arr.push(this.items[id])        
      }
    }
    return arr;
  }
}

// Cart = {
//   items: {
//     "1233klfdj8u475n58776": {
//       item: 'Harry Potter game',
//       qty: 3,
//       price: 36 //price for one item is 12
//     },
//     "2343258598jgklgj789743983": {
//       item: 'BattleField',
//       qty: 1,
//       price: 10
//     },
//   },
//   totalQty: 4,
//   totalPrice: 46
// }