// game.js
(() => { 'use strict';

// ===== 設定 =====
const LIMIT = 60; // 制限秒（HTMLの表示と合わせた）
const RAINBOW = ["#e85c9b","#f08c3c","#e0b400","#2dbf7a","#2aa6ff","#7667e5","#d65de8"];

// ===== DOMヘルパ =====
const $ = id => document.getElementById(id);
const E = {
  start: $("start"), game: $("game"), end: $("end"),
  word: $("word"), romaji: $("romaji"),
  time: $("time"), score: $("score"), streak: $("streak"), miss: $("miss"), bar: $("bar"),
  rScore: $("rScore"), rStreak: $("rStreak"), rMiss: $("rMiss"), rTime: $("rTime"),
  img: $("charImg")
};

const show = name => ["start","game","end"].forEach(id => $(id).classList.toggle("active", id === name));
const html = (el, v) => el.innerHTML = v;
const text = (el, v) => el.textContent = v;
const shuffle = a => a.sort(() => Math.random() - 0.5);
const reflow = el => { void el.offsetWidth; }; // アニメ再適用用

// ===== 状態 =====
let pool = [];
let score = 0, streak = 0, miss = 0, maxStreak = 0;
let timeLeft = LIMIT, timer = null;
let answer = "";          // 判定用（スペース除去・小文字）
let displayAnswer = "";   // 表示用（スペースあり原文）
let typed = "";           // ユーザー入力（スペースは入力しない方針）

// ===== データ（data.js から）を束ねる =====
const buildPairs = () => {
  const out = [];
  // 名前問題
  DEFAULT_PAIRS.forEach(p => out.push({ char: p.jp, jp: p.jp, romaji: p.romaji }));
  // セリフ問題
  for (const [char, list] of Object.entries(QUOTES)) {
    (list || []).forEach(q => out.push({ char, jp: q.jp, romaji: q.romaji }));
  }
  return out;
};

// ===== 描画 =====
const paintWord = jp => {
  const colored = [...jp].map((ch,i)=>`<span class="ch" style="color:${RAINBOW[i%RAINBOW.length]}">${ch}</span>`).join("");
  html(E.word, colored);
};

// 空白ズレ防止：typed/answer は空白抜きで一致長を数え、表示側の位置に投影
const paintRomaji = () => {
  const typedNoSpace = typed.replace(/\s+/g,'');
  let ai = 0; // answer 上の一致数
  while (ai < typedNoSpace.length && ai < answer.length && typedNoSpace[ai] === answer[ai]) ai++;

  // displayAnswer 上の切り分け位置 di を求める（スペースは消費しない）
  let di = 0, remain = ai;
  while (remain > 0 && di < displayAnswer.length) {
    if (displayAnswer[di] !== ' ') remain--;
    di++;
  }

  html(E.romaji,
    `<span class="done">${displayAnswer.slice(0,di)}</span>` +
    `<span class="muted remain">${displayAnswer.slice(di)}</span>`
  );
};

const setBar = () => { E.bar.style.width = (timeLeft / LIMIT) * 100 + '%'; };

const setImage = char => {
  const src = IMAGE_MAP[char];
  if (src) {
    E.img.src = src;
    E.img.style.display = 'block';
  } else {
    E.img.style.display = 'none';
    E.img.removeAttribute('src');
  }
};

// ===== 出題 =====
const refill = () => { if (!pool.length) pool = shuffle(buildPairs()); return pool.pop(); };

const setQ = p => {
  displayAnswer = p.romaji;                                // 表示用はそのまま（スペースあり）
  answer = p.romaji.toLowerCase().replace(/\s+/g, '');     // 判定用はスペース除去
  typed = "";
  paintWord(p.jp);
  paintRomaji();
  setImage(p.char);
};

// ===== ゲーム制御 =====
const reset = () => {
  score = streak = miss = maxStreak = 0;
  timeLeft = LIMIT;
  typed = "";
  ["score","streak","miss"].forEach(k => text(E[k], 0));
  text(E.time, LIMIT);
  setBar();
  setImage('');
};

const start = () => {
  if (timer) clearInterval(timer);
  reset();
  show("game");
  setQ(refill());
  timer = setInterval(() => {
    timeLeft--; text(E.time, timeLeft); setBar();
    if (timeLeft <= 0) end();
  }, 1000);
};

const end = () => {
  if (timer) clearInterval(timer);
  text(E.rScore, score);
  text(E.rStreak, Math.max(maxStreak, streak));
  text(E.rMiss, miss);
  text(E.rTime, LIMIT);
  show("end");
};

// ===== 入力 =====
document.addEventListener('keydown', e => {
  const isSpaceKey = (e.code === 'Space' || e.key === ' ' || e.key === 'Spacebar');

  // スタート画面
  if (E.start.classList.contains('active')) {
    if (isSpaceKey) { e.preventDefault(); start(); }
    return;
  }

  // 終了画面
  if (E.end.classList.contains('active')) {
    if (isSpaceKey) { e.preventDefault(); start(); return; }
    if (e.key === 'Escape') { e.preventDefault(); show("start"); return; }
    return;
  }

  // ゲーム画面以外は無視
  if (!E.game.classList.contains('active')) return;

  // ゲーム中はスペースは入力しない（押しても無視）
  if (isSpaceKey) { e.preventDefault(); return; }

  if (e.key === 'Escape') { end(); return; }
  if (e.key === 'Backspace') { typed = typed.slice(0,-1); paintRomaji(); return; }

  // 半角英字と半角ハイフンだけ受け付ける
    if (e.key.length === 1 && (/[a-zA-Z]/.test(e.key) || e.key === '-')) {
    const next = typed + e.key.toLowerCase();

    // 判定は空白除去した文字列同士
    if (!answer.startsWith(next.replace(/\s+/g,''))) {
      miss++; text(E.miss, miss);
      streak = 0; text(E.streak, streak);

      // 震え（CSSの .shake を再適用）
      [E.word, E.romaji].forEach(el => {
        el.classList.remove('shake');
        reflow(el);
        el.classList.add('shake');
      });

      return;
    }

    typed = next;
    paintRomaji();

    // クリア判定
    if (typed.replace(/\s+/g,'') === answer) {
      score++; text(E.score, score);
      streak++; maxStreak = Math.max(maxStreak, streak); text(E.streak, streak);

      // 軽いフィードバック
      E.romaji.animate([{opacity:1},{opacity:.3},{opacity:1}], {duration:160});

      setQ(refill());
    }
  }
});

// クリックで開始（共通スタートボタン）
document.addEventListener('click', e => { if (e.target.closest('.js-start')) start(); });

// 初期表示
show("start");

})();
