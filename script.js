/* ==========================================
 * タスク管理アプリ（Vanilla JS）
 * 状態管理・DOM描画・localStorage永続化
 * ========================================*/

// ==========================================
// 型定義
// ==========================================

/**
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} title
 * @property {boolean} completed
 * @property {string} createdAt
 */

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
/** @type {Task[]} */
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

/**
 * 指定ID以外のタスクでtasks配列を作り直す
 *
 * NOTE: 指定IDのタスクを削除すると同義です
 * @param {string} id - タスクのUUID
 */
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
}

/**
 * タスクの完了状態を反転して更新する
 *
 * @param {string} id - タスクのUUID
 */
function toggleTask(id) {
  // 指定IDのタスクを取得
  const task = tasks.find((t) => t.id === id);

  // タスクの完了状態を反転する
  // NOTE: undefined対策 - タスクを取得できない時は状態更新しない
  if (task) {
    task.completed = !task.completed;
  }
}

// ==========================================
// DOM 描画
// ==========================================

/**
 * タスクリストのli要素を作成する
 *
 * @param {Task} task - タスク
 * @returns {HTMLLIElement}　li要素のタスクリスト
 */
function createTaskElement(task) {
  // li要素を作成する
  const li = document.createElement('li');
  li.className = task.completed ? 'task-item completed' : 'task-item';

  // checkbox要素を作成する
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.dataset.id = task.id;
  checkbox.dataset.action = 'toggle';

  // タイトルのspan要素を作成する
  const title = document.createElement('span');
  title.className = 'task-title';
  title.textContent = task.title; // XSS対策(textContent使用)

  // 削除用のbtn要素を作成する
  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.className = 'btn btn-delete';
  deleteBtn.textContent = '削除';
  deleteBtn.dataset.id = task.id;
  deleteBtn.dataset.action = 'delete';

  // li要素に各要素をまとめて追加する
  li.append(checkbox, title, deleteBtn);
  return li;
}

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
    // ul#taskList にタスクリストのli要素を追加
    taskList.appendChild(createTaskElement(task));
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

/**
 * タスクリスト内のクリックイベントを処理する（イベント移譲）
 *
 * NOTE: タスクリストの削除・完了切り替えを action に応じて実行する
 * @param {MouseEvent} event - クリックイベントのオブジェクト
 */
function handleTaskListClick(event) {
  // クリックされた要素の data-id と data-action を取得
  const { id, action } = event.target.dataset;
  // idが存在しない場合は何もしない
  if (!id) return;

  // actionに応じた状態更新を実行する
  if (action === 'delete') {
    deleteTask(id);
  } else if (action === 'toggle') {
    toggleTask(id);
  } else {
    return;
  }

  // 画面を再描画する
  render();
}

// ==========================================
// イベントリスナー
// ==========================================

// --- タスク入力欄 ---
taskForm.addEventListener('submit', handleTaskSubmit);

// --- タスクリストの削除・完了切り替え（イベント移譲）---
taskList.addEventListener('click', handleTaskListClick);

// ==========================================
// 初期描画
// ==========================================
render();
