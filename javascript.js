// 初始變數 抓取ＤＯＭ
const list = document.querySelector('#my-todo')
const addBtn = document.querySelector('#addBtn')
const input = document.querySelector('#newTodo')
const done = document.querySelector('#my-done')
//新增一個新的陣列，使用 getItem() 方法從 localStorage 取出資料，並透過 JSON.parse() 方法將資料轉換成原本的格式
const todoList = JSON.parse(localStorage.getItem('todoList')) || []

// 原始就有的ＴＯＤＯ資料
const todos = ['上健身房', '每日讀好書', '喝水2500ml', '健康飲食', '認真賺錢']
for (let todo of todos) {
  addItem(todo)
}


// 函式
function addItem (text) {
//新增Todo的字列
  const newItem = document.createElement('li')
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>
  `
  list.appendChild(newItem)
}

//檢查字元有無效
function checkItem (){
   let inputValue = input.value
   if(inputValue.trim().length === 0){
    alert('請輸入項目')
  }else{
    addItem (inputValue)
  }
}

// //設置監聽器(增加項目)
addBtn.addEventListener('click', function(){
  checkItem()
  todoList.push(input.value)
  updateTodoList(input.value)
  input.value = ''
  console.log(todoList)
})
// 用Enter發送
input.addEventListener('keypress', function(){
  if (event.keyCode == 13){
    checkItem()
  }
})

// //監聽刪除父元素
list.addEventListener('click',function(event){
  let target = event.target
  if (target.classList.contains('delete')){
    let parentElement = target.parentElement
    parentElement.remove()
    todoList.splice(todoList.indexOf(parentElement.textContent.slice(0, -1)), 1)
    updateTodoList()
  }
  else if ( target.tagName === 'LABEL'){
    target.classList.toggle('checked')
    done.append(target.parentElement)
  }
})

done.addEventListener('click',function(){
  let target = event.target
  if (target.classList.contains('delete')){
    const parentElement = target.parentElement
    parentElement.remove()
  }
  else if ( target.tagName === 'LABEL'){
    target.classList.toggle('checked')
    list.append(target.parentElement)
  }
  
})

//localStorge
function displayTodoList() {
  todoList.forEach(todo => addItem (todo))
}

function updateTodoList (){
  localStorage.setItem('todoList', JSON.stringify(todoList))
}

displayTodoList()