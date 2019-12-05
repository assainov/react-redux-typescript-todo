import { Todo, TodoAction, ActionTypes } from '../actions';

export const todosReducer = (state: Todo[] = [], action: TodoAction) => {
    switch (action.type) {
        case ActionTypes.fetchTodos:
            return action.payload;
        case ActionTypes.deleteTodo:
            const todos = state.filter(
                (todo: Todo) => todo.id !== action.payload
            );
            return todos;
        default:
            return state;
    }
};
