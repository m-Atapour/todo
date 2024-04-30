var list = []
updateItemIndex = null;


/*Methods */
add = () => {
    newTitle = title.value;
    newItem = [newTitle, false];
    list.unshift(newItem);
    title.value = ""
    showItems(list)
}
edit = (index) => {
    console.log(index);
    let oldTitle = list[index][0];
    title.value = oldTitle;
    addButton.style.display = "none"
    updateButton.style.display = "block";
    updateItemIndex = index;

}
update = () => {
    newTitle = title.value;
    list[updateItemIndex][0] = newTitle;
    title.value = "";
    addButton.style.display = "block"
    updateButton.style.display = "none";
    showItems(list)
}
remove = (index) => {
    list.splice(index, 1);
    showItems(list)
}
changeStatus = (index) => {
    list[index][1] = !list[index][1];
    showItems(list)
}
showItems = (array) => {
    if (array.length === 0) {
        str = "<tr><td colspan='4'>موردی وجود ندارد</td></tr>"
    } else {
        str = "";
    }
    array.forEach((item, index) => {
        let status = item[1] ? 'انجام شده ' : ' در حال انجام';
        row = index + 1
        str += "<tr><td>" + row + "</td><td>" + item[0] + "</td><td >" + status + "</td><td data-index="+index+"><button id='edit' ><img src='images/edit.svg' /></button><button id='remove'><img src='images/trash.svg' /></button><button id='change_status'><img src='images/change.svg' /> </button></td></tr>";
    });
    tableBody[0].innerHTML = str

}
showItemsCompleted = () => {
    filterdList = list.filter(item => item[1] ? true : false);
    showItems(filterdList)
}
showItemsSuspend = () => {
    filterdList = list.filter(item => item[1] ? false : true);
    showItems(filterdList)
}

function addListener() {
    //footer buttons
    footerButton = footer[0].children;
    completedItemsButton = footerButton[0];
    suspendItemsButton = footerButton[1];
    allItemsButton = footerButton[2];

    allItemsButton.addEventListener("click", () => showItems(list))
    completedItemsButton.addEventListener("click", () => showItemsCompleted())
    suspendItemsButton.addEventListener("click", () => showItemsSuspend())


    //new item buttons
    addButton.addEventListener("click", () => add())
    updateButton.addEventListener("click", () => update())
}
document.addEventListener('DOMContentLoaded', () => {
    tableBody = document.getElementsByTagName("tbody")
    title = document.getElementById("title")
    addButton = document.getElementById("add")
    updateButton = document.getElementById("update")
    footer = document.getElementsByTagName("footer");
    
    showItems(list);
    addListener();
    //add listener for item action buttons
    document.addEventListener('click',e=>{
        clickedElement=e.target.tagName=="IMG"?e.target.parentNode:e.target;
        switch (clickedElement.id) {
            case "edit":
                index=clickedElement.parentNode.getAttribute("data-index");
                edit(index)
                break;
            case "remove":
                index=clickedElement.parentNode.getAttribute("data-index");
                remove(index)
                break;
            case "change_status":
                index=clickedElement.parentNode.getAttribute("data-index");
                changeStatus(index)
                break;
        
            default:
                break;
        }
    })
})


