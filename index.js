var s = document.getElementsByTagName('script')[0];

var jitsi = document.createElement('script');
jitsi.type = 'text/javascript'; 
jitsi.async = true; 
jitsi.defer = true; 
jitsi.src = 'https://meet.jit.si/external_api.js';
// jitsi.src = 'https://localhost:8443/libs/lib-jitsi-meet.min.js'; 
s.parentNode.insertBefore(jitsi, s);

var api;
var roomSize  = 1;

function init(roomName){
    const domain = 'meet.jit.si';
    const name = "Patient Doctor Video call";
    var configOverwrite =
    { 
        startWithAudioMuted: true, 
        startAudioOnly: true,
        prejoinPageEnabled: false,
        notifications: [
            'connection.CONNFAIL', // shown when the connection fails,
            'dialog.kickTitle', // shown when user has been kicked
            'notify.startSilentTitle', // shown when user joined with no audio
            'prejoin.errorDialOut',
            'prejoin.errorDialOutDisconnected',
            'prejoin.errorDialOutFailed',
            'prejoin.errorDialOutStatus',
            'prejoin.errorStatusCode',
            'prejoin.errorValidation'
        ],
    };
    var interfaceConfigOverwrite = {
        TOOLBAR_BUTTONS: [
            'microphone', 'camera', 'closedcaptions', 'desktop', 'embedmeeting', 'fullscreen',
            'fodeviceselection', 'hangup', 'profile', 'chat',
            'etherpad', 'sharedvideo', 'settings', 'raisehand',
            'videoquality', 'filmstrip', 'feedback',  'shortcuts',
            'tileview', 'videobackgroundblur', 'download', 'help'
        ]
    };


    const options = {
        roomName:name,
        width: 500,
        height: 500,
        parentNode: document.querySelector('#video'),
        configOverwrite,
        interfaceConfigOverwrite,
        userInfo: {
            displayName: $("#name").val()
        }
    };

    api = new JitsiMeetExternalAPI(domain, options);
    api.addEventListener('videoConferenceJoined',(_)=>{
        alert("Testing event started");
    });
    api.addEventListener('videoConferenceLeft',(_)=>{
        alert("Testing event closed");
    });
    setTimeout(() => {
        api.executeCommand("sendEndpointTextMessage","", "Test Value");
    },5000);
}

function start(roomName) {
    init(roomName);
}



