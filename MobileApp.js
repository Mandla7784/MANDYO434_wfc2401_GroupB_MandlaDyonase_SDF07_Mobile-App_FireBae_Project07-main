import {initializeApp} from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref , push, onValue ,remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL:"https://playground-c629e-default-rtdb.firebaseio.com/"

}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database,"ItemList");


onValue(shoppingListInDB,function(snapShot){
    let shoopingListArray = Object.entries(snapShot.val());
      clearShoppingListInputField();

    for(let i = 0; i < shoopingListArray.length; i++){
    let currentItem = shoopingListArray[i];

   let currentItemID = currentItem[0];
   let currentItemValue = currentItem[1]

    appendToShoppingListItem(currentItem)
  
   }





})



//grabbing the elements
const inputEl = document.getElementById('input-field');
const addButton = document.getElementById('add-btn');
const ShoppingListEl = document.querySelector('#shoppingList');

//adding an event listener to the button
addButton.addEventListener('click', function() {
  let userInput = inputEl.value;
  clearShoppingListInputField();
  //pushing userInput to database
  push(shoppingListInDB, {
    item: userInput
  });
  console.log(`${userInput} added to database`);
});

function clearShoppingListInputField() {
  ShoppingListEl.innerHTML = "";
  inputEl.value = "";
}

/* appendToShoppingListItem(item) {

   let itemID = item[0]
   let itemValue = item[1]




  let newLi = document.createElement('li');
  newLi.textContent = itemValue.item;
 //attach an aventhandler whe item is clicked to delete
 newLi.addEventListener('dblclick',function(){
    let exactLocationItemInDB = ref(database,`itemList/${itemID}`);
    remove(exactLocationItemInDB)
 })

  ShoppingListEl.appendChild(newLi);
}
*/

function appendToShoppingListItem(item) {
    let itemID = item[0];
    let itemValue = item[1];
  
    let newLi = document.createElement('li');
    newLi.textContent = itemValue.item;
    ShoppingListEl.appendChild(newLi);
  
    //attach an event handler when item is double-clicked to delete
    newLi.addEventListener('dblclick', function() {
      let exactLocationItemInDB = ref(database, `ItemList/${itemID}`);
      remove(exactLocationItemInDB);
      newLi.remove(); //remove the item from the shopping list
    });
  }







