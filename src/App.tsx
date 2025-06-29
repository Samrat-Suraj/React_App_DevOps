import { useEffect, useState } from "react";

type Task = {
  text: string;
  completed: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim()) {
      const newTask: Task = {
        text: inputValue.trim(),
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setInputValue("");
    }
  };

  const handleDeleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleCompleteTask = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: true } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold text-indigo-700 mb-8">Todo App By Suraj Maurya</h1>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
        <input
          value={inputValue}
          onChange={handleChange}
          type="text"
          placeholder="Enter a new task..."
          className="flex-1 p-3 rounded-lg border border-indigo-300 shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none transition"
        />
        <button
          onClick={handleAddTask}
          className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-6 py-3 rounded-lg shadow-md font-semibold"
        >
          Add Task
        </button>
      </div>

      <div className="mt-8 w-full max-w-xl space-y-4">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks yet. Add one!</p>
        ) : (
          tasks.map((task, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm transition"
            >
              <p
                className={`text-lg ${
                  task.completed
                    ? "line-through text-green-500 font-medium"
                    : "text-gray-800"
                }`}
              >
                {task.text}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleCompleteTask(index)}
                  disabled={task.completed}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    task.completed
                      ? "bg-green-300 text-white cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                >
                  {task.completed ? "Completed" : "Mark Complete"}
                </button>
                <button
                  onClick={() => handleDeleteTask(index)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
