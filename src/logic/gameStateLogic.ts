import { DiscColor, GridValue, MessageType } from "../types";

const endpointUrl = import.meta.env.VITE_ENDPOINT_URL;
const gameKey = import.meta.env.VITE_GAMEKEY;

interface FetchGameDataResponse {
  board: GridValue[][];
  turn: DiscColor;
  playerDiscColor: DiscColor;
  message: MessageType;
}

interface FetchAccountDataResponse {
  isGameEnded: boolean;
}

export async function fetchGameData(username: string, password: string): Promise<FetchGameDataResponse | null> {
  try {
    const response = await fetch(`${endpointUrl}?id=${username}${gameKey}${password}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error:", error);
    return null;
  }
}

export async function fetchAccountData(username: string): Promise<FetchAccountDataResponse | null> {
  try {
    const response = await fetch(`${endpointUrl}?id=${username}${gameKey}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    return data.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error:", error);
    return null;
  }
}

export async function uploadAccount(username: string, isGameEnded: boolean) {
  try {
    const requestBody = {
      id: `${username}${gameKey}`,
      data: {
        isGameEnded,
      },
    };

    const response = await fetch(endpointUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error:", error);
  }
}
export async function uploadGameState(
  username: string,
  password: string,
  board: GridValue[][],
  turn: DiscColor,
  playerDiscColor: DiscColor,
  message: MessageType
) {
  try {
    const requestBody = {
      id: `${username}${gameKey}${password}`,
      data: {
        board,
        turn,
        playerDiscColor,
        message,
      },
    };

    const response = await fetch(endpointUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    return data.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error:", error);
  }
}
