import React from "react";
import ToDos from "./ToDos";
import ToDoFun from "./ToDoFun";

export default class ToDoList extends React.Component {
    state= {
        todos: [],
        filtered: "all",
        search: ""
    };

    addToDo= (todo) => {
        this.setState({
            todos: [todo, ...this.state.todos]
        });
    }

    toggleComplete= (id) => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id===id) {
                    return {
                        id: todo.id,
                        text: todo.text,
                        complete: !todo.completed
                    }
                }
                else{
                    return todo;
                }
            })
        })
    }

    handleChange= (event)=> {
        this.setState({filtered: event.target.value});
    }

    handleDelete= (id)=> {
        this.setState({
            todos: this.state.todos.filter(todo=> todo.id!=id)
        })
    }
    handleSearch= (event)=> {
        this.setState({search: event.target.value})
    }

    render() {
        let todos=[];
        if (this.state.search){
            todos= this.state.todos.filter(todo => this.state.search===todo.text);
        }
        else if (this.state.filtered==="all"){
            todos= this.state.todos;
        }
        else if (this.state.filtered==="active"){
            todos= this.state.todos.filter(todo=> !todo.complete);
        }
        else if (this.state.filtered==="completed"){
            todos= this.state.todos.filter(todo=> todo.complete);
        }
        return (
            <div>
                <div>
                    <select value={this.state.filtered} onChange={this.handleChange}>
                        <option>all</option>
                        <option>completed</option>
                        <option>active</option>
                    </select>
                </div>
                <div>
                    <input
                    type="text"
                    placeholder="Search here"
                    onChange={this.handleSearch}
                    value={this.state.search} />
                </div>
                <ToDos onSubmit={this.addToDo}/>
                {todos.map(todo=> (
                    <ToDoFun key={todo.id} toggleComplete={()=>
                    this.toggleComplete(todo.id)} 
                    onDelete={()=> this.handleDelete(todo.id)}
                    todo={todo} />
                ))}
                <div>Active To-Dos: {this.state.todos.filter(todo=> !todo.complete).length} </div>
            </div>
        );
    }
}