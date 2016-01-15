# Toast
# 介紹
* 以 jQuery & bootstrap 為基礎實做出 Javascript Plugin
* 參考 https://github.com/CodeSeven/toastr 所開發出的簡易 Toast Notify  

# 使用模組
載入 bootstrap & jQuery
```
<!-- 最新編譯和最佳化的 CSS -->
<link rel="stylesheet" href="css/bootstrap/css/bootstrap.min.css">
<!-- 選擇性佈景主題 -->
<link rel="stylesheet" href="css/bootstrap/css/bootstrap-theme.min.css">
<!-- 自訂 Toast CSS -->
<link rel="stylesheet" href="css/toast.css">

<!-- jQuery -->
<script type="text/javascript" src="js/jquery-1.11.3.js"></script>	
<!-- 最新編譯和最佳化的 JavaScript -->
<script src="css/bootstrap/js/bootstrap.min.js"></script>
<!-- 自訂 Toast Plugin Javascript -->
<script type="text/javascript" src="js/toast.js"></script>
```
***
# Demo
Demo WebSite: http://flymaple.github.io/Toast/index.html  

Toast 在同個 Page 會有一個共同的 Container，所以在 init 的時候必須決定在螢幕的所處位置 ( 預設: lb: 左下 )，  
若要在 init 之後更改定位點必須執行 toast.destory() ， 目前共有 10個 定位點:  
( lt: 左上、ct: 中上、rt: 右上、ft: 滿上、lm: 左中、rm: 右中、lb: 左下、cb: 中下、rb: 右下、fb: 滿下 )  
 lt 　　　　　　ct　　　　　　rt  
 ┌ -----------------ft------------------┐  
 |--------------------------------------- |  
lm ---------------------------------- rm  
 |--------------------------------------- |  
└ ---------------- fb ---------------- ┘  
 lb 　　　　　　cb　　　　　　rb 

**初始化，可做可不做**
```
toast.init({
    width: '200px',
    height: '35px',
    upToDown: true,
    position: 'lb',
    closeButton: false,
    timeout: 3000
});
```
```
width: 全域共用或是個別設置
height: 全域共用或是個別設置
upToDown: Notify 的顯示順序 ( 預設: 由上到下 )( 全域 )
position: 定位點 ( 全域 )
clseButton: 是否顯示關閉按鈕 ( 全域 )
timeout: 訊息消失的毫秒數 ( 全域 )
```
**4 種 Notify function**
```
toast.info('Google', 'http://www.google.com.tw');
toast.warn('FlowringMail', 'http://flowringmail.flowring.com/', {width: '300px'});
toast.success('成功寫入');
toast.error('寫入失敗');
```
![Alt text](/images/all notify.png)   

**4 種 function 都有 3 個參數** { 訊息字串, Url字串, 自訂參數 } { 有給 Url 參數會如上圖有黑色箭頭，點選後會開起該網址 }
```
toast.info('我是訊息', '網址', {width: '300px', height: '50px'});
toast.info('我是訊息, {width: '300px', height: '50px'});
toast.info('我是訊息');
```
**Toast 註銷** ( 將已經初始化的 Toast 銷毀，用於重新設定 )
```
toast.destory();
```
