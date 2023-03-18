# web-canvas
basic html css js practice
---

### How to use 
##### 以下按鈕點擊即可使用
![](https://i.imgur.com/UWf7cxu.png)
origin brush:利用mousedown、mousemove不斷判斷滑鼠位置並將他們連起來
![](https://i.imgur.com/OBlkVe8.png)
eraser:與origin brush相似，但ctx.globalCompositeOperation 改為'destination-out'
![](https://i.imgur.com/Iu9qb2I.png)
circle brush shape:先回到開始brush前的圖片，再不斷判斷mouse位置畫出圓形
![](https://i.imgur.com/bfLz8xh.png)
rectangle brush shape:先回到開始brush前的圖片，再不斷判斷mouse位置畫出方形
![](https://i.imgur.com/F8yE78S.png)
triangle brush shape:先回到開始brush前的圖片，再不斷判斷mouse位置畫出三角形
![](https://i.imgur.com/hXOkMCK.png)
text input:紀錄mousedown的位置，叫出input，如果輸入enter畫在畫布
![](https://i.imgur.com/S2BcMQE.png)
undo:將每次改變存到window.history，undo時history.back
![](https://i.imgur.com/S6V2wki.png)
redo:將每次改變存到window.history，undo時history.forward
![](https://i.imgur.com/NvQGvIE.png)
download file:創立超連結，href連接到toDataURL()，點擊時下載
![](https://i.imgur.com/Rc5Bc97.png)
upload file:利用Filereader讀檔案再貼到畫布上
![](https://i.imgur.com/SE70RCc.png)
refresh button:利用clearRect清空
![](https://i.imgur.com/bzjOtTG.png)
change color:利用type="color"選擇顏色
##### 左右調整大小
![](https://i.imgur.com/6HWHlrq.png)
brush width:利用range調整筆刷大小
##### 點開選取字體大小、字型
![](https://i.imgur.com/731SGyH.png)
text size and font:利用select改變字體大小、字型

### Function description
![](https://i.imgur.com/Q3GUuPO.png)
dot brush:在筆刷大小範圍內不斷畫上半徑、透明度隨機的圓點並記錄
![](https://i.imgur.com/NtaZMt1.png)
spray gun brush:在筆刷大小範圍內不依照density次數不斷畫上隨機小點
![](https://i.imgur.com/82lsujP.png)
density of spray gun:利用range調整spray gun密度
![](https://i.imgur.com/wF5AwcY.png)
bgm display:利用audio播放音樂

### page link

https://canvas-95764.web.app/


