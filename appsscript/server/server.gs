function doGet() {
    // const to = "yoichiro.ikeda2023@gmail.com";
    // const subject = "タイトルですまる";
    // const body = "ボディですまる";
    // GmailApp.sendEmail(to, subject, body);

    return HtmlService.createHtmlOutputFromFile('client/index');
}

function doPost(e) {
    // POSTデータの取得
    const requestData = JSON.parse(e.postData.contents);
    Logger.log(requestData);

    // Google Spread Sheetへ登録

    // 返す
    return ContentService.createTextOutput(JSON.stringify(
        {
            "resuponsu": "なんか返しとくよ"
        }
    ))
        .setMineType(ContentService.MineType.JSON);
}

function registData(formData) {
    Logger.log(formData)

    // Google Spread Sheetへ登録

    // 返す
    return ContentService.createTextOutput(JSON.stringify(
        {
            "resuponsu": "なんか返しとくよ"
        }
    ))
        .setMineType(ContentService.MineType.JSON);
}

// 自分自身のURLを返す
function getWebAppUrl() {
    return ScriptApp.getService().getUrl();
}
