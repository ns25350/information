// ==========================================
// 1. Leaflet (CRS.Simple) の初期化設定
// ==========================================

// 画像のサイズ（横1500px、縦1000pxと仮定）
const imgWidth = 1500;
const imgHeight = 1000;

// [南西の座標, 北東の座標] つまり [[0, 0], [縦の最大, 横の最大]]
const bounds = [[0, 0], [imgHeight, imgWidth]];

// マップの作成
const map = L.map('map-container', {
  crs: L.CRS.Simple,
  minZoom: -1,       // どこまで小さく引きで引けるか
  maxZoom: 1,        // どこまで拡大できるか
  maxBounds: bounds, // 画像の外にスクロールしすぎないように制限
  attributionControl: false // 右下のクレジットを非表示
});

// 仮置きのダミー画像をセット（文字入りグレー画像）
const dummyImageUrl = `https://placehold.co/${imgWidth}x${imgHeight}/e0e0e0/666666.png?text=School+Map+1500x1000`;

L.imageOverlay(dummyImageUrl, bounds).addTo(map);

// 画像が画面にぴったり収まるように表示位置を自動調整
map.fitBounds(bounds);


// ==========================================
// 2. ピン（マーカー）の配置とタップイベント
// ==========================================

const spotTitle = document.getElementById('map-spot-title');
const spotDesc = document.getElementById('map-spot-desc');

// --- テスト用ピン1 (中央付近 [500, 750] に配置) ---
const marker1 = L.marker([500, 750]).addTo(map);
marker1.on('click', function() {
  spotTitle.innerText = "1年1組：たこ焼き屋さん";
  spotDesc.innerText = "外はカリカリ、中はトロトロの本格たこ焼き！ただいまの待ち時間は【約15分】です。";
});

// --- テスト用ピン2 (左上付近 [800, 300] に配置) ---
const marker2 = L.marker([800, 300]).addTo(map);
marker2.on('click', function() {
  spotTitle.innerText = "2年H組：お化け屋敷";
  spotDesc.innerText = "校内最恐のウォークスルー型ホラー。心臓の弱い方はご注意ください。待ち時間は【約30分】。";
});


// ==========================================
// 🌟 開発用：画像をクリックしたら座標をコンソールに表示する機能
// ==========================================
// パソコンのブラウザで「F12キー」を押してコンソール（Console）を開き、
// マップ画像をポチポチ叩くと、その場所の座標 [Y, X] がログに表示されます。
// ピンを増やしたい時は、その数値をコピーして上の L.marker([Y, X]) を増やしてください。
map.on('click', function(e) {
  console.log(`ピンの座標コード: L.marker([${Math.round(e.latlng.lat)}, ${Math.round(e.latlng.lng)}]).addTo(map);`);
});


// ==========================================
// 3. タブ切り替えシステム
// ==========================================
function switchTab(targetTab) {
  // ① 一旦すべてのページ（ディブ）を非表示にする
  document.querySelectorAll('.app-page').forEach(page => {
    page.style.display = 'none';
  });
  
  // ② クリックされたターゲットのページだけを表示する
  document.getElementById(`${targetTab}-page`).style.display = 'block';
  
  // ③ タブバーのボタンの「アクティブ（青色）」の見た目を切り替える
  document.querySelectorAll('.app-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // クリックされたボタンに active クラスを付与
  // (今回は手抜きせず確実に対象を特定するため、引数から判定)
  let tabIndex = 0;
  if (targetTab === 'waiting') tabIndex = 1;
  if (targetTab === 'schedule') tabIndex = 2;
  document.querySelectorAll('.app-tab')[tabIndex].classList.add('active');

  // ⚠️重要：マップタブに戻ってきたとき、Leafletのレイアウトが崩れるのを防ぐための呪文
  if (targetTab === 'map') {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }
}
