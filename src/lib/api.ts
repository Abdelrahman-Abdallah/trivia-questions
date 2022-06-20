export async function getUserToken(): Promise<string> {
  try {
    const response = await fetch("https://opentdb.com/api_token.php?command=request");
    const data = await response.json();
    return data.token;
  } catch (err) {
    console.log(err);
  }
}
