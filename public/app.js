let localAudio = document.querySelector('#localAudio')
let remoteAudio = document.querySelector('#remoteAudio')

let localVideo = document.querySelector('#localVideo')
let remoteVideo = document.querySelector('#remoteVideo')

let localStream, peerStream
let caststatus = document.querySelector('#caststatus')
let callBtn = document.querySelector('.call-btn')
let hangUpBtn = document.querySelector('.hangup-btn')


const peer = new Peer(''+Math.floor(Math.random()*2**18).toString(36).padStart(4,0), {
    host: location.hostname,
    debug: 1,
    path: '/myapp',
    port: 8000
});
window.peer = peer;

// 获取音视频权限
function getLocalStream() {
    navigator.mediaDevices.getUserMedia({video: true, audio: true}).then( stream => {
        // 音频
        // window.localStream = stream; 
        // window.localAudio.srcObject = stream; 
        // window.localAudio.autoplay = true; 
        // 视频
        window.localStream = stream; 
        window.localVideo.srcObject = stream;
        window.localVideo.autoplay = true;
    }).catch( err => {
        console.log("u got an error:" + err)
    });
}

const audioContainer = document.querySelector('.call-container');/**
 * Displays the call button and peer ID
 * @returns{void}
 */

function showCallContent() {
    window.caststatus.textContent = `您的设备ID是: ${peer.id}`;
    callBtn.hidden = false;
    audioContainer.hidden = true;
}

/**
 * Displays the audio controls and correct copy
 * @returns{void}
 */

function showConnectedContent() {
    window.caststatus.textContent = `已连接`;
    callBtn.hidden = true;
    audioContainer.hidden = false;
}

getLocalStream();
peer.on('open', function () {
    window.caststatus.textContent = `您的设备ID是: ${peer.id}`;
});

let code;
function getStreamCode() {
    code = window.prompt('请输入对方的设备号');
}

let conn;
function connectPeers() {
    console.log('connectPeers', code)
    conn = peer.connect(code);
}

peer.on('connection', function(connection){
    conn = connection;
});

// const callBtn = document.querySelector('.call-btn');
callBtn.addEventListener('click', function(){
    // 输入呼叫号码
    getStreamCode();
    // 建立连接
    connectPeers();
    console.log('code-click',code)
    const call = peer.call(code, window.localStream); 

    call.on('stream', function(stream) { 
        // 音频
        // window.remoteAudio.srcObject = stream; 
        // window.remoteAudio.autoplay = true; 
        // window.peerStream = stream; 

        // 视频
        window.remoteVideo.srcObject = stream;
        window.remoteVideo.autoplay = true;
        window.peerStream = stream;
        console.log('已经连接成功')
        showConnectedContent(); 
    })
})

peer.on('call', function(call) {
    const answerCall = confirm("是否接听?")
 
    if(answerCall){
       call.answer(window.localStream) 
       showConnectedContent(); 
       call.on('stream', function(stream) { 
        //    音频
        //  window.remoteAudio.srcObject = stream;
        //   window.remoteAudio.autoplay = true;
        //   window.peerStream = stream;
        //   视频
          window.remoteVideo.srcObject = stream;
          window.remoteVideo.autoplay = true;
          window.peerStream = stream;
       });
    } else {
       console.log("已拒绝"); // D
    }
 });

//  挂断
 hangUpBtn.addEventListener('click', function (){
    conn.close();
    showCallContent();
})