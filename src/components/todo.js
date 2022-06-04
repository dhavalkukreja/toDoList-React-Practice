            import React, { useEffect } from 'react'
            import "./style.css"

            // get the local storage data
            const getLocalData = () => {
                const lists = localStorage.getItem("mytodolist")

                if(lists){
                    return JSON.parse(lists)
                } else{
                    return []
                }
            }

            const Todo = () => {
                const [inputData, setInputData] = React.useState("")
                const [items, setItems] = React.useState(getLocalData())
                
                // add the items function
                const addItem = () => {
                    if(!inputData){
                        alert('plz fill data')
                    }else{
                    const myNewInputData = {
                        id: new Date.getTime().toString(),
                        name: inputData,
                    }
                    setItems([...items, myNewInputData])
                    setInputData("")
                    }
                }

                // how to delete items section

                const deleteItem = (index) => {
                   const updatedItems = items.filter((curElem) => {
                       return curElem.id !== index
                   })
                   setItems(updatedItems) 
                }

                // remove all the elements
                const removeAll = () => {
                    setItems([])
                }


                // adding local storage
                useEffect(() => {
                    localStorage.setItem("mytodolist", JSON.stringify(items))
                }, [items])

            return (
                <>
                    <div className='main-div'>
                        <div className='child-div'>
                            <figure>
                                <img src = "./images/todo.svg" alt = "todologo"/>
                                <figcaption>Add your list here 👻</figcaption>
                            </figure>
                            <div className='addItems'>
                                <input
                                    type = "text"
                                    placeholder = "✍🏼 Add Item"
                                    className='form-control'
                                    value = {inputData}
                                    onChange = {(event) => setInputData(event.target.value)}
                                />
                                <i className = "fa fa-plus add-btn" onClick = {addItem}></i>
                            </div>

                            {/* show our items */}

                            <div className='showItems'>
                                {items.map((curElem) => {
                                    return(
                                        <div className='eachItem' key ={curElem.id}>
                                        <h3>{curElem.name}</h3>
                                        <div className='todo-btn'>
                                            <i className = "far fa-edit add-btn"></i>
                                            <i className = "far fa-trash-alt add-btn"
                                            onClick={() => deleteItem(curElem.id)}></i>
                                        </div>
                                        </div>
                                    )
                                })}
                                
                            </div>
                            <div className='showItems'>
                            <button className = 'btn effect04' data-sm-link-text = "Remove All" onClick={removeAll}>
                                <span>Check List</span>
                                </button>  
                            </div>
                        </div>           
                    </div>
                </>
            )
            }

            export default Todo