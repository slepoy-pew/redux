import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
    titleChanged,
    taskDeleted,
    completeTask,
    loadTasks,
    getTasks,
    getTasksLoadingStatus,
    createTask,
} from "./store/task";
import configureStore from "./store/store";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { getError } from "./store/errors";

const store = configureStore();

const App = (params) => {
    const state = useSelector(getTasks());
    const isLoading = useSelector(getTasksLoadingStatus());
    const error = useSelector(getError());
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadTasks());
    }, []);
    const addNewTask = () => {
        dispatch(
            createTask({ userId: 1, title: "SomeNew Task", completed: false })
        );
    };

    const changeTitle = (taskId) => {
        dispatch(titleChanged(taskId));
    };
    const deleteTask = (taskId) => {
        dispatch(taskDeleted(taskId));
    };
    if (isLoading) {
        return <h1>Loading</h1>;
    }
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <h1> App</h1>
            <button onClick={addNewTask}>Add task</button>
            <ul>
                {state.map((el, i) => (
                    <li key={el.id + i}>
                        <p>{el.title}</p>
                        <p> {`Completed: ${el.completed}`}</p>
                        <button onClick={() => dispatch(completeTask(el.id))}>
                            Complete
                        </button>
                        <button onClick={() => changeTitle(el.id)}>
                            Change title
                        </button>
                        <button onClick={() => deleteTask(el.id)}>
                            Delete
                        </button>
                        <hr />
                    </li>
                ))}
            </ul>
        </>
    );
};

const root = ReactDOM.createRoot(
    document.getElementById("root")
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
