// ==========================================
// 1. Leaflet 初期化
// ==========================================
const imgWidth = 1500;
const imgHeight = 1000;
const bounds = [[0, 0], [imgHeight, imgWidth]];

const map = L.map('map-container', {
  crs: L.CRS.Simple,
  minZoom: -1,
  maxZoom: 1,
  maxBounds: bounds,
  attributionControl: false
});

// 前回の起動テストで成功した、安定しているグリッド画像をそのまま使用
const dummyImageUrl = 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Grid_20x20_horizontal_numbers.svg';
L.imageOverlay(dummyImageUrl, bounds).addTo(map);
map.fitBounds(bounds);

// ==========================================
// 2. ピンの配置
// ==========================================
const spotTitle = document.getElementById('map-spot-title');
const spotDesc = document.getElementById('map-spot-desc');

const marker1 = L.marker([500, 750]).addTo(map);
marker1.on('click', function() {
  spotTitle.innerText = "1年1組：たこ焼き屋さん";
  spotDesc.innerText = "外はカリカリ、中はトロトロ！ただいまの待ち時間は【約15分】です。";
});

const marker2 = L.marker([800, 300]).addTo(map);
marker2.on('click', function() {
  spotTitle.innerText = "2年H組：お化け屋敷";
  spotDesc.innerText = "校内最恐ホラー。待ち時間は【約30分】。";
});

// 開発用：クリック座標取得
map.on('click', function(e) {
  console.log(`L.marker([${Math.round(e.latlng.lat)}, ${Math.round(e.latlng.lng)}]).addTo(map);`);
});

// ==========================================
// 3. 完璧なタブ切り替えシステム（バグ対策済）
// ==========================================
function switchTab(targetTab) {
  // ① すべてのページから active クラスを消して非表示にする
  document.querySelectorAll('.app-page').forEach(page => {
    page.classList.remove('active');
  });
  // ② 選択されたページに active クラスをつけて表示する
  document.getElementById(`${targetTab}-page`).classList.add('active');

  // ③ すべてのタブボタンから active クラスを消す
  document.querySelectorAll('.app-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  // ④ 選択されたタブボタンを青色（active）にする
  document.getElementById(`tab-btn-${targetTab}`).classList.add('active');

  // ⚠️【最重要】マップタブに戻ってきたとき、狂ったサイズ計算を強制的に叩き直す
  if (targetTab === 'map') {
    setTimeout(() => {
      map.invalidateSize();
    }, 50); // 0.05秒だけ待って、画面が完全に表示されてから実行するのがコツ
  }
}
