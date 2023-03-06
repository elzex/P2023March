import jsQR from "jsqr";

export function startCamera(vElement, cfg) {
	navigator.mediaDevices.getUserMedia(cfg).then((stream) => {
		vElement.srcObject = stream;
		vElement.onloadedmetadata = (e) => {
			vElement.play();
		}
	}).catch(e => {
		console.log(e)
	})
}

export function stopCamera(vElement) {
	const tracks = vElement.srcObject.getTracks();

	tracks.forEach(function (track) {
		track.stop();
	});
}

export async function canvasUpdate(video, pic) {
	return new Promise(async (resolve, reject) => {
		const ctx = pic.getContext("2d", { willReadFrequently: true });
		ctx.drawImage(video, 0, 0, pic.width, pic.height);
		//ctx.getImageData(0, 0, pic.width, pic.height);
		const QR = ctx.getImageData(0, 0, pic.width, pic.height);
		const code = jsQR(QR.data, pic.width, pic.height);
		if (code) {
			//console.log(code.data);
			stopCamera(video);
			resolve(code.data)
			//const data = await getUserData(code.data);
			//return data;
		} else {
			setTimeout(() => {
				reject()
			}, 10);
		}
	})
};

export function isSmartPhone() {
	if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
		return true;
	} else {
		return false;
	}
}