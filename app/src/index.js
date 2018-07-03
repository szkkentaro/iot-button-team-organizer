import './style.scss';

// AWS IoT
import AWSIoTData from 'aws-iot-device-sdk';

AWS.config.region = 'ap-northeast-1'; // Fix me
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'ap-northeast-1:********-****-****-****-************', // Fix me
});

const mqttClient = AWSIoTData.device({
    region: AWS.config.region,
    host: '**************.iot.ap-northeast-1.amazonaws.com', // Fix me
    clientId: 'mqtt-client-' + (Math.floor((Math.random() * 100000) + 1)),
    protocol: 'wss',
    maximumReconnectTimeMs: 8000,
    debug: true,
    accessKeyId: '',
    secretKey: '',
    sessionToken: ''
});

const cognitoIdentity = new AWS.CognitoIdentity();
AWS.config.credentials.get(function (err, data) {
    if (!err) {
        console.log('retrieved identity: ' + AWS.config.credentials.identityId);
        var params = {
            IdentityId: AWS.config.credentials.identityId
        };

        cognitoIdentity.getCredentialsForIdentity(params, function (err, data) {
            if (!err) {
                mqttClient.updateWebSocketCredentials(
                    data.Credentials.AccessKeyId,
                    data.Credentials.SecretKey,
                    data.Credentials.SessionToken
                );
            } else {
                console.log('error retrieving credentials: ' + err);
                alert('error retrieving credentials: ' + err);
            }
        });
    } else {
        console.log('error retrieving identity:' + err);
        alert('error retrieving identity: ' + err);
    }
});

const topicName = 'team-organizer';
window.mqttClientConnectHandler = function () {
    console.log('connect');
    mqttClient.subscribe(topicName);
};
window.mqttClientReconnectHandler = function () {
    console.log('reconnect');
};
window.mqttClientMessageHandler = function (topic, payload) {
    console.log('message: ' + topic + ':' + payload.toString());

    document.getElementById(`facilitator-div`).style.display = "none";
    document.getElementById(`creator-div`).style.display = "none";
    document.getElementById(`sales-div`).style.display = "none";
    document.getElementById(`winner-div`).style.display = "none";

    const [team, num, role] = JSON.parse(payload.toString()).Id.S.split("-");
    document.getElementById(`${role}-div`).style.display = "inline-block";
    document.getElementById('team-id-div').innerHTML = `<p>${team.toUpperCase()} <b>${num}</b> ${role.toUpperCase()}</p>`;
};

mqttClient.on('connect', window.mqttClientConnectHandler);
mqttClient.on('reconnect', window.mqttClientReconnectHandler);
mqttClient.on('message', window.mqttClientMessageHandler);

document.getElementById('mqtt-div').innerHTML = '<p>attempting to connect to aws iot...</p>';
