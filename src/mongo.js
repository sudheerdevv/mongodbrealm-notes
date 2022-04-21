import * as Realm from "realm-web";

const app = new Realm.App({ id: process.env.REACT_APP_REALM_ID });
const mongo = app.currentUser?.mongoClient(process.env.REACT_APP_CLUSTER_NAME);
const users = mongo?.db("users").collection("userinfos");

export { app, users };
