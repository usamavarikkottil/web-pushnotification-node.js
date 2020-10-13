console.log("Service worker loaded...")
self.addEventListener("push", e => {
    const data = e.data.json();
    console.log("PUsh received");
     self.registration.showNotification(data.title, {
         body: "Notified by usama varikkottil",
         icon: "https://avatars1.githubusercontent.com/u/39443352?s=460&u=b32a803549c813238c262e1efc3397f9f1ccb822&v=4"
     })
})