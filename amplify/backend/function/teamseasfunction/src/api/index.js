"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCredentials = exports.findSecret = exports.grabSecrets = void 0;
const aws = __importStar(require("aws-sdk"));
const cognitoSP = new aws.CognitoIdentityServiceProvider({
    region: "us-east-2"
});
async function grabSecrets() {
    //@ts-ignore
    const { Parameters } = await new aws.SSM()
        .getParameters({
        Names: [
            "username",
            "password",
            "clientid",
            "userpoolid",
            "GOOGLE_ACCESS_KEY"
        ].map(secretName => process.env[secretName]),
        WithDecryption: true
    })
        .promise();
    return Parameters;
}
exports.grabSecrets = grabSecrets;
async function findSecret(keyName, Parameters) {
    //@ts-ignore
    return await Parameters.find(entry => entry.Name === process.env[keyName])
        .Value;
}
exports.findSecret = findSecret;
async function initiateAuthParams() {
    const Parameters = await grabSecrets();
    return {
        AuthFlow: "ADMIN_NO_SRP_AUTH",
        ClientId: await findSecret("clientid", Parameters),
        UserPoolId: await findSecret("userpoolid", Parameters),
        AuthParameters: {
            USERNAME: await findSecret("username", Parameters),
            PASSWORD: await findSecret("password", Parameters) // use env variables or SSM parameters
        }
    };
}
async function getCredentials() {
    const authParams = (await initiateAuthParams());
    return new Promise((resolve, reject) => {
        cognitoSP.adminInitiateAuth(authParams, (authErr, authData) => {
            if (authErr) {
                console.log(authErr);
                reject(authErr);
            }
            else if (authData === null) {
                reject("Auth data is null");
            }
            else {
                console.log("Auth Successful");
                resolve(authData);
            }
        });
    });
}
exports.getCredentials = getCredentials;
