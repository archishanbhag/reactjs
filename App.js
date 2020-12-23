const items = [
 { number: "1", title: "🇦🇷 Argentina"},
 { number: "2", title: "🤩 YASS"},
 { number: "3", title: "👩🏼‍💻 Tech Girl"},
 { number: "4", title: "💋 Lipstick & Code"},
 { number: "5", title: "💃🏼 Latina"},
]

const initialDnDState = {
 draggedFrom: null,
 draggedTo: null,
 isDragging: false,
 originalOrder: [],
 updatedOrder: []
}

const DragToReorderList = () => {
 
 const [list, setList] = React.useState(items);
 const [dragAndDrop, setDragAndDrop] = React.useState(initialDnDState);
 
 

 const onDragStart = (event) => {
  const initialPosition = Number(event.currentTarget.dataset.position);
  
  setDragAndDrop({
   ...dragAndDrop,
   draggedFrom: initialPosition,
   isDragging: true,
   originalOrder: list
  });
  
  

  event.dataTransfer.setData("text/html", '');
 }
 

 const onDragOver = (event) => {
  
 
  event.preventDefault();
  
  let newList = dragAndDrop.originalOrder;
 
  // index of the item being dragged
  const draggedFrom = dragAndDrop.draggedFrom; 

  // index of the droppable area being hovered
  const draggedTo = Number(event.currentTarget.dataset.position); 

  const itemDragged = newList[draggedFrom];
  const remainingItems = newList.filter((item, index) => index !== draggedFrom);

   newList = [
    ...remainingItems.slice(0, draggedTo),
    itemDragged,
    ...remainingItems.slice(draggedTo)
   ];
    
  if (draggedTo !== dragAndDrop.draggedTo){
   setDragAndDrop({
    ...dragAndDrop,
    updatedOrder: newList,
    draggedTo: draggedTo
   })
  }

 }
 
 const onDrop = (event) => {
  
  setList(dragAndDrop.updatedOrder);
  
  setDragAndDrop({
   ...dragAndDrop,
   draggedFrom: null,
   draggedTo: null,
   isDragging: false
  });
 }


 onDragLeave = () => {
   setDragAndDrop({
   ...dragAndDrop,
   draggedTo: null
  });
  
 }
 
 // Not needed, just for logging purposes:
 React.useEffect( ()=>{
  console.log("Dragged From: ", dragAndDrop && dragAndDrop.draggedFrom);
  console.log("Dropping Into: ", dragAndDrop && dragAndDrop.draggedTo);
 }, [dragAndDrop])
 
 React.useEffect( ()=>{
  console.log("List updated!");
 }, [list])
 
	return(
		<section>
   <ul>
    
    {list.map( (item, index) => {
     return(
      <li 
       key={index}
       
       data-position={index}
       draggable
       
       onDragStart={onDragStart}
       onDragOver={onDragOver}
       onDrop={onDrop}
       
       onDragLeave={onDragLeave}
       
       className={dragAndDrop && dragAndDrop.draggedTo=== Number(index) ? "dropArea" : ""}
       >
        <span>{item.number}</span>
        <p>{item.title}</p>
        <i class="fas fa-arrows-alt-v"></i>
      </li>
     )
    })}
     
   </ul>
		</section>
		)
};

ReactDOM.render(
  <DragToReorderList />,
  document.getElementById("root")
);
