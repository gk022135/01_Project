import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deletetask } from "../redux/slice/todoSlice";
import AddTimer from "./AddTimer";
import StartTimer from "./StartTimer";

function TodoHome() {
    const [todolist, setTodolist] = useState({ task: "" });
    const [email, setEmail] = useState("");
    const [completedTasksBackend, setCompletedTasks] = useState([]);
    const [TOBEdeletetask, setToBedeletetask] = useState("");

    const dispatch = useDispatch();
    const taskList = useSelector(state => state.todo.tasks);
    const completedTasks = useSelector(state => state.todo.completedTasks);

    const [percentages, setPercentages] = useState(0);

    // ==========================
    // LOAD TASKS ON PAGE MOUNT
    // ==========================
    useEffect(() => {
        async function fetchData() {
            const userData = JSON.parse(localStorage.getItem("UserData"));
            if (!userData) return;

            setEmail(userData.email);

            // GET CURRENT TASKS
            const curr = await fetch(`http://localhost:3000/codesy/v1/get/current-tasks?email=${userData.email}`);
            const curr_res = await curr.json();
            setTodolist({ task: "" }); // keep input safe

            if (curr_res.success) {
                // update redux store for current tasks
                curr_res.data.forEach(item => dispatch(addTask(item)));
            }

            // GET COMPLETED TASKS
            const comp = await fetch(`http://localhost:3000/codesy/v1/get/all-completed-tasks?email=${userData.email}`);
            const comp_res = await comp.json();

            if (comp_res.success) {
                setCompletedTasks(comp_res.data);
                console.log(comp_res.data)
            }
        }

        fetchData();
    }, []);

    // ==========================
    // INPUT FIELD HANDLER
    // ==========================
    const handleTask = (e) => {
        setTodolist({
            ...todolist,
            [e.target.name]: e.target.value,
        });
    };

    // ==========================
    // ADD NEW TASK (POST)
    // ==========================
    const addHandler = async () => {
        if (!todolist.task.trim()) return;

        const newTaskWithTimestamp = {
            task: todolist.task,
            createdAt: new Date().toISOString(),
        };

        dispatch(addTask(newTaskWithTimestamp));

        // for(i =0; i<completedTasksBackend.length; i++){
        //     if(!taskList.find(completedTasksBackend[i])){
        //         dispatch(addTask(completedTasksBackend[i]));
        //     }
        // }
        

        await fetch("http://localhost:3000/codesy/v1/add-new-task", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                taskBody: newTaskWithTimestamp,
            }),
        });

        setTodolist({ task: "" });
    };

    // ==========================
    // MOVE TASK TO COMPLETED (PUT)
    // ==========================
    const removeHandler = async (index) => {
        const percentage = percentages[index] || 0;

        if (percentage <= 0) return;

        const completedAt = new Date().toISOString();
        const selectedTask = taskList[index];

        dispatch(deletetask({ index, percentage, completedAt }));

        await fetch("http://localhost:3000/codesy/v1/put/move-task-to-completed", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                taskBody: {
                    ...selectedTask,
                    percentage,
                    completedAt,
                },
            }),
        });
    };

    // ==========================
    // PROGRESS FIELD HANDLER
    // ==========================
    const percentHandler = (index, e) => {
        setPercentages(prev => ({
            ...prev,
            [index]: e.target.value,
        }));
    };

    // ==========================
    // DELETE CURRENT TASK (PUT)
    // ==========================
    async function DeleteTheTask() {
        console.log("hhihihihi")
        await fetch("http://localhost:3000/codesy/v1/put/delete-current-task", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                taskBody: TOBEdeletetask,
            }),
        });
    }

    return (
        <div className="min-h-screen bg-base-100 flex flex-col items-center px-6 py-8">
            {/* Background decoration */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 w-full max-w-4xl space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        Make Your Daily Task Here
                    </h1>
                    <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
                </div>

                {/* Add Task Form */}
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
                    <label className="flex flex-col space-y-6">
                        <span className="text-xl font-semibold text-white/90">Make task here:</span>

                        <input
                            className="h-16 w-full px-6 bg-white/10 border border-white/30 rounded-xl text-white text-lg placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                            type="text"
                            placeholder="Add task"
                            name="task"
                            value={todolist.task}
                            onChange={handleTask}
                        />

                        <button
                            className="h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            onClick={addHandler}
                        >
                            Add Task
                        </button>
                    </label>
                </div>

                {/* Current Tasks Section */}
                <div className="space-y-6">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-emerald-400 mb-4">Your current tasks</h1>
                        <div className="w-32 h-1 bg-emerald-500 mx-auto rounded-full"></div>
                    </div>

                    <div className="space-y-4">
                        {taskList.length > 0 ? (
                            taskList.map((task, index) => (
                                <div
                                    key={index}
                                    className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl hover:bg-white/15 transition-all duration-300 hover:scale-[1.01]"
                                >
                                    <h1 className="text-lg font-medium text-white mb-4 break-words">
                                        <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white text-sm font-bold rounded-full mr-3">
                                            {index + 1}
                                        </span>
                                        {task.task} 
                                        <p className="text-sm text-white/60">
                                            Created at: {new Date(task.createdAt).toLocaleString()}
                                        </p>
                                       
                                    </h1>

                                    <div className="flex flex-wrap items-center gap-4">
                                        <label className="flex items-center gap-2">
                                            <span className="text-white/70 text-sm font-medium">Progress:</span>
                                            <input
                                                className="w-20 h-10 px-3 bg-white/20 border border-white/30 rounded-lg text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                                                type="number"
                                                name={`percentage-${index}`}
                                                onChange={(e) => percentHandler(index, e)}
                                                value={percentages[index] || ''}
                                                placeholder="0"
                                                min="0"
                                                max="100"
                                            />
                                            <span className="text-white/70 text-sm">%</span>
                                        </label>

                                        <button
                                            className="h-10 px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                                            onClick={() => removeHandler(index)}
                                        >
                                            % Done
                                        </button>

                                        <div className="bg-white/10 rounded-lg p-2 border border-white/20">
                                            <AddTimer />
                                        </div>
                                        <button className="h-10 px-6 bg-gradient-to-r from-red-600 to-emerald-600 hover:from-red-500 hover:to-emerald-500 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                                        onClick={ () =>{
                                            setToBedeletetask(task.task);
                                            DeleteTheTask();
                                        }}
                                        >Delete</button>

                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 text-white/60">
                                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <p className="text-lg">No tasks yet. Add your first task above!</p>
                            </div>
                        )}
                    </div>
                </div>

                <br />

                {/* Completed Tasks Section */}
                <div className="space-y-6">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-emerald-400 mb-4">Completed tasks:</div>
                        <div className="w-32 h-1 bg-emerald-500 mx-auto rounded-full"></div>
                    </div>

                    <div className="space-y-4">
                        {completedTasks.length > 0 ? (
                            completedTasks.map((item, index) => (
                                <div
                                    className="bg-green-500/10 backdrop-blur-lg border border-green-400/30 rounded-2xl p-6 shadow-xl hover:bg-green-500/15 transition-all duration-300"
                                    key={index}
                                >
                                    <div className="space-y-4">
                                        <h1 className="text-lg font-medium text-white flex items-center gap-3">
                                            <p className="text-sm text-white/60">
                                                Completed at: {new Date(item.completedAt).toLocaleString()}
                                            </p>
                                            <span className="inline-flex items-center justify-center w-8 h-8 bg-green-600 text-white text-sm font-bold rounded-full">
                                                {index + 1}
                                            </span>
                                            {item.task} - {item.percentage}% complete
                                        </h1>

                                        <div className="relative">
                                            <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-1000 ease-out relative"
                                                    style={{ width: `${item.percentage}%` }}
                                                >
                                                    <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
                                                </div>
                                            </div>
                                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-medium text-white">
                                                {item.percentage}%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 text-white/60">
                                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <p className="text-lg">No completed tasks yet. Complete some tasks to see them here!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TodoHome;