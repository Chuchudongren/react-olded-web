import axios from 'axios'
import qs from 'qs'
function toArrayBuffer(buf) {
    var ab = new ArrayBuffer(buf.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return ab;
}
export default function readTex(tex) {
    axios.post('/life/getMp3', qs.stringify({ tex })).then(res => {
        var arrayBuf = toArrayBuffer(res.data.result.data)
        const audioContext = new AudioContext();
        const audioSource = audioContext.createBufferSource()
        // 控制播放等操作
        audioContext.decodeAudioData(arrayBuf, (buffer) => {
            audioSource.buffer = buffer;
            audioSource.connect(audioContext.destination);
            // 播放音乐
            audioSource.start()
        })
    })

}