var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BFM-AP2idxvZbRRS3wUCXkWvT6TamylolERzbqxu4GIQfmYoJKfm4Mggj7v8uGeZjAs7uhmjRfbGv13hs6qnDmE",
   "privateKey": "SBVTW6SrmU1fGq-LvUg8UjuoeSJucpLteytUFW8gFug"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fwZJ6TfrHZs:APA91bFeVSAlv_d1PED3umbPpbuqfllGqEJT4cYiv9hncXZEHaS57MVDpMJGxMVmNX-VhoXyGzsIBjX4OdHNCEnj_QhAetawiGhSNH6fCAsoc9NmpGMBZITcANt8u_bIj_C68RTjHoty",
   "keys": {
       "p256dh": "BFsH9ecXYS+dBlDAZFiEbDGeLYVAjg3oO4Be2SSG24uUSCZ8mDVKP5QC9G+i9DlCkAYnZZU5mD9boB2t953vA/w=",
       "auth": "rsaeDUJlke8DPjOPdafFvQ=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '750193281848',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);