import { AuthenticatedUserProvider } from "./context/AuthenticatedUserProvider";
import ChatNavigator from "./components/ChatNavigator";

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <ChatNavigator/>
    </AuthenticatedUserProvider>
  );
}

