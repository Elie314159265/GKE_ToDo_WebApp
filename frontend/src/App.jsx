import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  // バックエンドからToDoリストを取得する関数
  const fetchTodos = async () => {
    try {
      // Ingressで設定したパス /api/todos にリクエスト
      const res = await axios.get('/api/todos');
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching todos:, err");
    }
  };

  // フォーム送信時の処理
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 新しいToDoをバックエンドに送信
      await axios.post('/api/todos', { title });
      setTitle('');
      fetchTodos(); // リストを再取得して更新
    } catch (err)
    {
      console.error("Error adding todo:, err");
    }
  };
	// ▼▼▼【新規追加】タスク削除の処理 ▼▼▼
  const handleDelete = async (id) => {
    try {
      // DELETE /api/todos/:id にリクエストを送信
      await axios.delete(`/api/todos/${id}`);
      fetchTodos(); // リストを再取得して画面を更新
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };


  // コンポーネントが最初に表示されたときにToDoリストを取得
  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <>
      <h1>ToDo App on Kubernetes</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New ToDo"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {/* ▼▼▼【修正】削除ボタンを追加 ▼▼▼ */}
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => handleDelete(todo.id)} className="delete-button">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}


export default App;
