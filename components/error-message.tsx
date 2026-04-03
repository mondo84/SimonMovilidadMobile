import { StyleSheet, Text } from "react-native";

type ErrorMessageProps = {
  message?: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) return null;

  return <Text style={styles.error}>{message}</Text>;
};

export default ErrorMessage;

const styles = StyleSheet.create({
  error: {
    color: "#ef4444",
    marginTop: 10,
    textAlign: "center",
  },
});
