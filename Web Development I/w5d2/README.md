**Objective:** Build a product browser application with JavaScript and DOM to practice client-side programming.

### :warning: Issue
**Update the table**<br>
In order to update the table, I wanted to remove all `<tr>` except for the first one which is the header of the table.<br>
First, I create the function named "removeDataItems" like the following. <br>This runs with an argument `tableRows` when "See Today's Meals" button get clicked. 

```js
const tableRows = document.getElementsByTagName('tr');

function removeDataItems(el){
  for(let i = 1; i < el.length; i++){
    el[i].remove();
  }
}
```

However, it deletes some of the rows; not all of them.<br>
This has to do with the way forloop iteration behaves.<br>

With the code above, the function "removeDataItems" runs the following ways.

#### :one: First time run:
- The table at the moment:

| Name       | Price | Popularity |
|------------|-------|------------|
| Pizza      | 14    | high       |
| Hamburger  | 8     | high       |
| Meat Pasta | 10    | average    |
- `i` = 1
- `el.length`(tableRows.length) = 4
- `i` is less than `el.length`

The function executes `tableRows[1].remove();`, then "Pizza" row and its data is gone.


#### :two: Second time run:
- The table at the moment:

| Name       | Price | Popularity |
|------------|-------|------------|
| Hamburger  | 8     | high       |
| Meat Pasta | 10    | average    |
- `i` = 2
- `el.length`(tableRows.length) = 3
- `i` is less than `el.length`

The function executes `tableRows[2].remove();`, then "Meat Pasta" row and its data is gone.


#### :three: Third time run:
- The table at the moment:

| Name       | Price | Popularity |
|------------|-------|------------|
| Hamburger  | 8     | high       |
- `i` = 3
- `el.length`(tableRows.length) = 2
- `i` is greater than `el.length` :x: 

The function won't execute any and the loop stops here.

When adding a new data and updating the table, the table still has *the old* "Hamburger" row.

### :key: Solution
To avoid the problem, I set the forloop backwards.

```js
function removeDataItems(el){
  for(let i = el.length - 1; i > 0; i--){
    el[i].remove();
  }
}
```

**This would be a good solution when dealing with elements of a live HTML collection.**
