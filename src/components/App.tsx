import React from 'react';
import { connect } from 'react-redux';
import { Todo, fetchTodos, deleteTodo } from '../actions';
import { StoreState } from '../reducers';

interface AppProps {
    todos: Todo[];
    fetchTodos: Function;
    deleteTodo: typeof deleteTodo;
}

interface AppState {
    fetching: boolean;
}

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {
            fetching: false
        };
    }

    componentDidUpdate(prevProps: AppProps) {
        if (!prevProps.todos.length && this.props.todos.length) {
            this.setState({ fetching: false });
        }
    }

    onButtonClick = (): void => {
        this.props.fetchTodos();
        this.setState({ fetching: true });
    };

    renderList = (): JSX.Element[] => {
        return this.props.todos.map((todo: Todo) => {
            return (
                <div key={todo.id} onClick={() => this.deleteTodo(todo.id)}>
                    {todo.title}
                </div>
            );
        });
    };

    deleteTodo = (id: number): void => {
        this.props.deleteTodo(id);
    };

    render() {
        return (
            <div>
                <button onClick={this.onButtonClick}>Fetch</button>
                {this.state.fetching ? 'Loading...' : this.renderList()}
            </div>
        );
    }
}

const mapStateToProps = ({ todos }: StoreState): { todos: Todo[] } => {
    return { todos: todos };
};

export default connect(mapStateToProps, { fetchTodos, deleteTodo })(App);
