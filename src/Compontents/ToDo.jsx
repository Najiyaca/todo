import React, {useEffect, useState} from 'react'
import styled from 'styled-components'

export default function ToDo() {
    const [task,setTask] = useState([
        {
            id:1,
            title:"3kg apple",

        },
        {
            id:2,
            title:" 1 kg orange",

        },
        {
            id:3,
            title: " 12 kg apple",

        },
        {
            id:4,
            title:"3 kg banana",

        },
    ]);
    const [completed,setCompleted] = useState([
        {
            id:5,
            title:"apple",

        },
        {
            id:6,
            title:" 1 kg orange",

        },
        {
            id:7,
            title: " 12 kg apple",

        },
   
    ]);

    const [newTask,setNewTask] = useState("")

    const [itemcount,setItemcount]=useState()

   

    useEffect(() => {
        setItemcount(completed.length+task.length)
    },[])

    const deleteTask = (id)=> {
        let new_list = task.filter((task)=> task.id !== id)
        setTask(new_list)
    }

    const deleteCompleted = (id)=> {
        let new_list = completed.filter((task)=> task.id !== id)
        setCompleted(new_list)
    }

    const addNewtask = (e)=> {
        e.preventDefault()
        let new_task = {
            id:itemcount+1,
            title:newTask,
        }
        setTask([...task,new_task]);
        setNewTask("")
        setItemcount((prev)=>prev+1)
    }


    const completedtask = (id) => {
        let current_task = task.find((task)=>task.id == id);
        setCompleted([...completed,current_task]);

        let new_list = task.filter((task)=> task.id !== id);
        setTask(new_list)
    }

    const revertTask = (id)=> {
        let current_task = completed.find((task)=>task.id == id);
        setTask([...task,current_task]);

        let new_list = completed.filter((task)=> task.id !== id);
        setCompleted(new_list)
    }

    const renderTask = () => {
        return task.map((task)=>(<LIstitem>
            <LeftConatiner>
                <CheckConatiner onClick={()=> completedtask(task.id)}  ></CheckConatiner>
                <Itemcontent> {task.id}, {task.title}</Itemcontent>
            </LeftConatiner >
            <Rightcontainer>
                 <Actionbtn onClick={()=> deleteTask(task.id)}>
                    <Buttonimg src={require("./assets/delete.svg").default} alt="delete"/>
                 </Actionbtn>
            </Rightcontainer>
        </LIstitem>))
    }

const renderCompleted = ()=>{
    return completed.map((task)=> (
        <LIstitem>
            <LeftConatiner>
                <CheckConatinerCompleted> <Timg src={require("./assets/tick-green.svg").default} alt="delete"/></CheckConatinerCompleted>
                <ItemcontentCompleted>{task.id},{task.title}</ItemcontentCompleted>
            </LeftConatiner>
            <Rightcontainer>
            <Actionbtn onClick={()=> revertTask(task.id)}>
                    <Buttonimg  src={require("./assets/revert.svg").default} alt="delete"/>
                 </Actionbtn>
                 <Actionbtn onClick={()=> deleteCompleted (task.id)}>
                    <Buttonimg src={require("./assets/delete.svg").default} alt="delete"/>
                 </Actionbtn>
            </Rightcontainer>
        </LIstitem>
    ))
}
  return (
    <Container>
        <Heading>ToDo List</Heading>
        <ToDoConatiner>
            <Subheading> Things to be done</Subheading>
            <Todolist>
                {renderTask()}
            </Todolist>
        </ToDoConatiner>
        <Newtodo>
            <Input value={newTask} onChange={(e)=>setNewTask(e.target.value)} placeholder='Type new task' />
            <Buttonsb onClick={(e)=>addNewtask(e)}>Add New</Buttonsb>
        </Newtodo>
        <ToDoConatiner>
            <Subheading> Things to be done</Subheading>
            <Todolist>
            {renderCompleted ()}
            </Todolist>
        </ToDoConatiner>
    </Container>
  )
}

const Container= styled.div`
    width:60%;
    max-width:1000px;
    padding:50px 10%;
    border: 2px solid #888888; 
    margin:0 auto;`;


const Heading = styled.h1`
    font-size: 42px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 40px;`;

const ToDoConatiner= styled.h2``;

const Subheading= styled.h3`
    font-size: 22px;
    color: #050241;
`


const Todolist= styled.ul``;

const LIstitem= styled.li`display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;`;


const LeftConatiner= styled.div`
    display: flex;
    align-items: center;`;

const CheckConatiner= styled.span`   
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 1px solid ;
    display: inline-block;
    margin-right: 15px;
cursor: pointer;
`;

const Timg = styled.img``;


const Itemcontent= styled.span`
    font-style: 17px;
    cursor: pointer;`

const Rightcontainer= styled.div``;

const Actionbtn= styled.button`
    border: none;
    background: none;
    cursor: pointer;
    margin-right: 20px;
    outline: none;
&:last-child{
    margin-right: 0;
}`;


const Buttonimg= styled.img``;


const Newtodo= styled.form`
    display: flex;
    margin-left: 40px;
    margin-top: 30px;
    position: relative;
&::before{
    content:"" ;
    background-image: url(${require("./assets/plus.svg").default});
    width: 60px;
    background-repeat: no-repeat;
    height: 60px;
    display: block;
    position: absolute;
    left: 10px;
    top: 47px;
    bottom: 0;
    margin: auto 0;
    z-index: 4};`;


const Input = styled.input`
    display: block;
    width: 100%;
    outline: none;
    border: 1px solid #c6c6c6;
    border-right: none;
    padding: 0 10px 0 35px;
    font-size: 20px;
    `;


const Buttonsb = styled.button`
    padding:15px 25px;
    white-space:nowrap;
    border:none;
    background: #050241;
    color: #ffff;
    font-size:20px;
    border-radius: 6px;
    border-top-left-radius:0 ;
    border-bottom-left-radius:0 ;
    cursor:pointer;`;


const CheckConatinerCompleted= styled(CheckConatiner)`
    display: flex;
    align-items: center;
    justify-content: center;
    border-color: #06c692;`;


const ItemcontentCompleted= styled(Itemcontent)`
    border-color: #06c692;`;
