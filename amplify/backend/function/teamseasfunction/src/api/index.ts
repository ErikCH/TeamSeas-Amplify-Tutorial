import * as aws from "aws-sdk";

const cognitoSP = new aws.CognitoIdentityServiceProvider({
  region: "us-east-2"
});

export async function grabSecrets() {
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

export async function findSecret(keyName, Parameters) {
  //@ts-ignore
  return await Parameters.find(entry => entry.Name === process.env[keyName])
    .Value;
}

async function initiateAuthParams() {
  const Parameters = await grabSecrets();

  return {
    AuthFlow: "ADMIN_NO_SRP_AUTH",
    ClientId: await findSecret("clientid", Parameters), // use env variables or SSM parameters
    UserPoolId: await findSecret("userpoolid", Parameters), // use env variables or SSM parameters
    AuthParameters: {
      USERNAME: await findSecret("username", Parameters), // use env variables or SSM parameters
      PASSWORD: await findSecret("password", Parameters) // use env variables or SSM parameters
    }
  };
}

export async function getCredentials() {
  const authParams = (await initiateAuthParams()) as any;
  return new Promise((resolve, reject) => {
    cognitoSP.adminInitiateAuth(authParams, (authErr, authData) => {
      if (authErr) {
        console.log(authErr);
        reject(authErr);
      } else if (authData === null) {
        reject("Auth data is null");
      } else {
        console.log("Auth Successful");
        resolve(authData);
      }
    });
  });
}
