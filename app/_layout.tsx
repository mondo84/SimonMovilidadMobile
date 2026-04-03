import { Stack } from "expo-router";
import { QueryProviders } from "../src/providers/query-providers";

const Layout = () => {
  return (
    <QueryProviders>
      {/* Router outlet */}
      <Stack screenOptions={{ headerShown: false }} />
    </QueryProviders>
  );
};

export default Layout;
