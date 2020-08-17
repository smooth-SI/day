(function() {
  'use strict';
  
  // ※フィールドコード入力部分の[]は不要です。フィールドコードのみ入力してください。

  // レコード詳細画面とレコード編集画面
  var events = [
    'app.record.detail.show',
    'app.record.edit.show'
  ];
    
  kintone.events.on(events, function(event) {
    var record = event.record;
    
    // 今日の日付
    var dt = new Date();
    var y = dt.getFullYear();
    var m = ("00" + (dt.getMonth()+1)).slice(-2);
    var d = ("00" + dt.getDate()).slice(-2);
    var today = Number(y +  m  + d);
    
    // 誕生日
    var birthRecord = record.[基準日のフィールドコードを入力].value
    var birthday    = Number(birthRecord.replace( /-/g , "" ) );

    // 年齢計算
    var age = Math.floor((today - birthday) / 10000);
    
    if ( record.[出力したいフィールドのフィールドコードを入力].value != age){
      var appid = kintone.app.getId();
      var recid = kintone.app.record.getId();
      
      var Param = {
          "app":appid,
          "id":recid,
          "record":{
          "[出力したいフィールドのフィールドコードを入力]":{
              "value": age
          },
        },
      };
      
      kintone.api("/k/v1/record",
      "PUT",Param,
        function(resp){
          location.reload(true);
            alert("好きな文字を入力");
          },
        function(resp){
          alert("好きな文字を入力");
        }
      );
    }
  });
})();