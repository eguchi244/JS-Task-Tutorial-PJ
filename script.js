/* ==========================================
 * タスク管理アプリ（Vanilla JS）
 * 状態管理・DOM描画・localStorage永続化
 * ========================================*/

// ==========================================
// DOM要素
// ==========================================
const taskForm      = document.getElementById('taskForm');
const taskInput     = document.getElementById('taskInput');
const filterButtons = document.querySelectorAll('.filter');
const taskList      = document.getElementById('taskList');
const taskCount     = document.getElementById('taskCount');

// ==========================================
// 状態変数
// NOTE: 単一の真実のソース（Single Source of Truth）
// ==========================================
let tasks  = [];    // タスク配列
let filter = 'all'; // 'all' | 'active' | 'completed'

// ==========================================
// localStorage Key
// ==========================================
const STORAGE_KEY = 'tasks';

// ==========================================
// タスク操作
// ==========================================

/**
 * 新しいタスクを作成してtasks配列に追加する
 *
 * @param {string} title - タスクのタイトル
 */
function addTask(title) {
  tasks.push({
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  });
}


// ==========================================
// DOM 描画
// ==========================================

/**
 * タスクリストのHTMLを作成する
 *
 * NOTE: タスクが存在しない時はタスクリストのHTMLを生成しない（描画なし）
 */
function render() {
  // タスクリストの描画をリセットする
  taskList.innerHTML = '';

  // タスクリストのHTMLを作成する
  tasks.forEach((task) => {
    // 要素を生成する(<li class="task-item">task.title</li>)
    const li = document.createElement('li');
    li.className = 'task-item';
    li.textContent = task.title; // XSS対策（textContent使用）
    // ul#taskList にタスクリストを追加
    taskList.appendChild(li);
  });
}

// ==========================================
// イベントハンドラー
// ==========================================

/**
 * タスク入力欄の送信イベントを処理する
 *
 * @param {SubmitEvent} event - フォーム送信のイベントオブジェクト
 */
function handleTaskSubmit(event) {
  // Formの規定動作を止める（SPA用のページリロード対策）
  event.preventDefault();

  // バリデーション
  // NOTE: 前後の空白を除去した結果が空文字なら追加しない
  const title = taskInput.value.trim();
  if (title === '') return;

  // タスクリストを作成して描画する
  addTask(title);
  render();

  // タスク入力欄を空にしてフォーカスする
  taskInput.value = '';
  taskInput.focus();
}

// ==========================================
// イベントリスナー
// ==========================================

// --- タスク入力欄 ---
taskForm.addEventListener('submit', handleTaskSubmit);

// ==========================================
// 初期描画
// ==========================================
render();
