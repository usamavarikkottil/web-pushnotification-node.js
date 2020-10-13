const publicVapidKey = "BEDOEHpK6F367nT-y7cpk0u0UE2bC_rLR48wuzQzIbdVw4NEBfasdQg_P3LDzbutk75u3wiUpYUJj7mC0xzhRvE";

if("serviceWorker" in navigator) {
    send().catch(err => console.log(err));
}

//Register service worker, register push , send push notifications  
async function send() {
    console.log("registering service worker");
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: "/"
    });
    console.log("Service worker registered...");

    //Register push 
    console.log("Regisering push");
    const subscription  = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    })
    console.log("push registered");

    //send push notification
    console.log("sending push...")
    await fetch("/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
            "content-type" : "application/json"
        }
    })
    console.log("Push sent...")

}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
   
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
   
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }