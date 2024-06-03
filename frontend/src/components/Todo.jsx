import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_API } from "../../constant/constant";

const Todo = ({ getTodoList, isUpdate, todoInfo, close }) => {
    const [title, setTitle] = useState();
    const [date, setDate] = useState();
    const [status, setStatus] = useState();
    const createTodo = async () => {
        if (!title || !date || !status) {
            alert("add all the field");
        }
        try {
            const response = await axios.post(`${BACKEND_API}`, {
                title,
                status,
                date,
            });
            const data = await response.data;
            console.log(data);
            getTodoList();
        } catch (e) {
            console.log(e);
        }
    };
    const updateTodo = async () => {
        try {
            const response = await axios.put(`${BACKEND_API}/${todoInfo._id}`, {
                status,
            });
            if (response) {
                console.log("updated");
                getTodoList();
            }
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        console.log(todoInfo);
        if (isUpdate) {
            setDate(todoInfo?.date);
            setTitle(todoInfo?.title);
            setStatus(todoInfo.status);
        } else {
            setDate("");
            setTitle("");
            setStatus("");
        }
    }, [isUpdate]);
    return (
        <>
            <div id='AddTodo' className=''>
                <div className=''>
                    <label className='mr-4'>Title</label>
                    <br />
                    <input
                        type='text'
                        placeholder=''
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={
                            "border border-gray-800 px-3 py-2 w-full " +
                            (isUpdate ? " bg-gray-200" : "bg-white")
                        }
                        required={true}
                        disabled={isUpdate ? true : false}
                    />
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <div className='mt-4'>
                        <label className='mr-4'>Date</label>
                        <input
                            type='date'
                            onChange={(e) => setDate(e.target.value)}
                            value={date}
                            className={
                                "border border-gray-800 px-3 py-2 w-full " +
                                (isUpdate ? " bg-gray-200" : "bg-white")
                            }
                            required={true}
                            disabled={isUpdate ? true : false}
                        />
                    </div>
                    <div className='mt-4'>
                        <label className='mr-4'>Status</label>
                        <select
                            onChange={(e) => setStatus(e.target.value)}
                            className='border border-gray-800 px-3 py-2 w-full'
                            required={true}
                            value={status}
                        >
                            <option defaultValue=''>Select Status</option>
                            <option value={"started"}>Started</option>
                            <option value={"porgress"}>Progress</option>
                            <option value={"completed"}>Completed</option>
                        </select>
                    </div>
                </div>
                <div className='flex'>
                    <button
                        className='border border-gray-800 px-3 py-2 my-4 hover:bg-gray-800 hover:text-white hover:ease-in-out mr-5'
                        onClick={isUpdate ? updateTodo : createTodo}
                    >
                        {isUpdate ? "Update" : "Add"}
                    </button>
                    <button
                        className='border border-gray-800 px-3 py-2 my-4 hover:bg-gray-800 hover:text-white hover:ease-in-out'
                        onClick={() => close(false)}
                    >
                        Close
                    </button>
                </div>
            </div>
        </>
    );
};

export default Todo;
