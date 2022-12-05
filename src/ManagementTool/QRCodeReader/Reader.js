import jsQR from "jsqr";
import { getUserData } from "./loadUserData"

const video = document.querySelector("#camera");
const canvas = document.querySelector("#picture");
const ctx = canvas.getContext("2d");
const res = document.getElementById("result");

export function initCamera() {
    /** カメラ設定 */
    const constraints = {
        audio: false,
        video: {
            width: 300,
            height: 200,
            facingMode: "user"   // フロントカメラを利用する
        }
    };

    //カメラを<video>と同期
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        video.srcObject = stream;
        video.onloadedmetadata = (e) => {
            video.play();
            // QRコードのチェック開始
            checkPicture();
        };
    }).catch((err) => {
        console.log(err.name + ": " + err.message);
    });
}

let uid;
function checkPicture() {
    // カメラの映像をCanvasに複写
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // QRコードの読み取り
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, canvas.width, canvas.height);

    //----------------------
    // 存在する場合
    //----------------------
    if (code) {
        // 結果を表示
        console.log(code.data);
        setQRResult("#result", code.data);  // 文字列
        //drawLine(ctx, code.location);       // 見つかった箇所に線を引く

        // video と canvas を入れ替え
        canvas.style.display = 'block';
        video.style.display = 'none';
        video.pause();
        uid = code.data;
        console.log(uid);
        getUserData(uid);
    } else {// 存在しない場合
        // 0.3秒後にもう一度チェックする
        setTimeout(() => {
            checkPicture();
        }, 300);
    }
}

/**
 * QRコードの読み取り結果を表示する
 *
 * @param {String} id
 * @param {String} data
 * @return {void}
 */
function setQRResult(id, data) {
    $(id).innerHTML = escapeHTML(data);
}

/**
 * jQuery style wrapper
 *
 * @param {string} selector
 * @return {Object}
 */
function $(selector) {
    return (document.querySelector(selector));
}

/**
 * HTML表示用に文字列をエスケープする
 *
 * @param {string} str
 * @return {string}
 */
function escapeHTML(str) {
    let result = "";
    result = str.replace("&", "&amp;");
    result = str.replace("'", "&#x27;");
    result = str.replace("`", "&#x60;");
    result = str.replace('"', "&quot;");
    result = str.replace("<", "&lt;");
    result = str.replace(">", "&gt;");
    result = str.replace(/\n/, "<br>");

    //return (result);
}