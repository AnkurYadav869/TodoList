import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_API } from "../../constant/constant";
import Todo from "./Todo";

const TodoApp = () => {
    const [todos, setTodos] = useState();
    const [showTodo, setShowTodo] = useState(false);
    const [todoInfo, setTodoInfo] = useState({});
    const [isUpdate, setIsUpdate] = useState(false);
    const getTodoList = async () => {
        const response = await axios.get(BACKEND_API);
        const data = await response.data;
        setTodos(data?.todoList);
    };
    const update = async (todo) => {
        setTodoInfo(todo);
        setShowTodo(true);
        setIsUpdate(true);
    };
    const deleteTodo = async (todo) => {
        try {
            const response = await axios.delete(`${BACKEND_API}/${todo._id}`);
            if (await response.data) {
                console.log("updated");
            }
            getTodoList();
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getTodoList();
    }, []);
    return (
        <div className=' w-3/5 mx-auto border border-gray-800 my-10 px-3 py-2'>
            <div className='text-xl'>Todo List</div>
            <div>
                {todos &&
                    todos.map((todo) => {
                        return (
                            <div
                                key={todo._id}
                                className='border border-gray-500 p-1 grid grid-cols-5'
                            >
                                <p>{todo.title}</p>
                                <p>{todo.date}</p>
                                <p>{todo.status}</p>
                                <button
                                    className='border border-gray-800  hover:bg-gray-800 hover:text-white hover:ease-in-out'
                                    onClick={() => update(todo)}
                                >
                                    Edit
                                </button>

                                <button
                                    className='border border-gray-800  hover:bg-gray-800 hover:text-white hover:ease-in-out'
                                    onClick={() => deleteTodo(todo)}
                                >
                                    Delete
                                </button>
                            </div>
                        );
                    })}
            </div>

            <button
                className='border border-gray-800 px-3 py-2 my-4 hover:bg-gray-800 hover:text-white hover:ease-in-out'
                onClick={() => {
                    setIsUpdate(false);
                    setShowTodo(true);
                    setTodoInfo({});
                }}
            >
                Add TodoList
            </button>

            {showTodo && (
                <Todo
                    getTodoList={getTodoList}
                    todoInfo={todoInfo}
                    isUpdate={isUpdate}
                    close={setShowTodo}
                />
            )}
        </div>
    );
};
export default TodoApp;
