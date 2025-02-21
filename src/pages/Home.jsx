import React, { useState, useEffect } from 'react';
import supabase from '../db/supabase';
import { UserButton } from '@clerk/clerk-react';

function Home() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data, error } = await supabase.from("TodoList").select("*");
    if (error) {
      console.log("Error fetching: ", error);
    } else {
      setTodoList(data);
    }
  };

  const addTodo = async () => {
    const newTodoData = {
      name: newTodo,
      isCompleted: false
    }
    const { data, error } = await supabase
      .from("TodoList")
      .insert([newTodoData])
      .single();

    if (error) {
      console.log("Error adding todo: ", error)
    } else {
      setTodoList((prev) => [...prev, data]);
      setNewTodo("");
    }
  };

  const completeTask = async (id, isCompleted) => {
    const { error } = await supabase
      .from("TodoList")
      .update({ isCompleted: !isCompleted })
      .eq("id", id);

    if (error) {
      console.log("Error while toggling the task: ", error);
    } else {
      const updatedTodoList = todoList.map((todo) => 
        todo.id === id ? { ...todo, isCompleted: !isCompleted } : todo
      );
      setTodoList(updatedTodoList);
    }
  };

  const deleteTask = async (id) => {
    const { error } = await supabase
      .from("TodoList")
      .delete()
      .eq("id", id);

    if (error) {
      console.log("Error while deleting the task: ", error);
    } else {
      setTodoList((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8 text-white">
      <div className="max-w-4xl mx-auto bg-white text-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Todo List</h1>
          <UserButton />
        </div>

        <div className="flex gap-4 mb-6">
          <input 
            type="text" 
            placeholder="New Todo..." 
            value={newTodo} 
            onChange={(e) => setNewTodo(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <button 
            onClick={addTodo}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md"
          >
            Add Todo
          </button>
        </div>

        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Task</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todoList.map((todo) => (
              <tr key={todo.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{todo.name}</td>
                <td className="py-2 px-4 border-b">
                  {todo.isCompleted ? (
                    <span className="text-green-600 font-bold">Completed</span>
                  ) : (
                    <span className="text-red-600 font-bold">Pending</span>
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  <button 
                    onClick={() => completeTask(todo.id, todo.isCompleted)}
                    className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md mr-2"
                  >
                    {todo.isCompleted ? "Undo" : "Complete"}
                  </button>
                  <button 
                    onClick={() => deleteTask(todo.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
