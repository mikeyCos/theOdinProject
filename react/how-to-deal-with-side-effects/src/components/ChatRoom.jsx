import { useEffect } from "react";
import {
  createEncryptedConnection,
  createUnencryptedConnection,
} from "../utilities/connect.encrypted";

export default function ChatRoom({ roomId, isEncrypted }) {
  //   console.log(createConnection);
  useEffect(() => {
    const createConnection = isEncrypted
      ? createEncryptedConnection
      : createUnencryptedConnection;
    const connection = createConnection(roomId);
    connection.connect();
    return () => connection.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, isEncrypted]);

  return <h1>Welcome to the {roomId} room!</h1>;
}
