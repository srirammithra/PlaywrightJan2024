import * as nodeFetch from "node-fetch";

export const getLoginToken = async (varUsername, varPassword) => {
    const varResponse = await nodeFetch("http://localhost:2221/api/login", {
        method: "POST",
        body: JSON.stringify({ username: varUsername, password: varPassword })
    });
    if (varResponse.status !== 200) {
        throw new Error("Failed to fetch Login token");
    }
    const varResponseJSON = await varResponse.json();
    return varResponseJSON.token;
}