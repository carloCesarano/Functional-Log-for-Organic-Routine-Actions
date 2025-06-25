import { StyleSheet } from "react-native";

export const aggiungiPiantaStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#D4EDB6",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#2E4A2C",
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#D4EDB6",
    borderRadius: 16,
    padding: 16,
    justifyContent: "space-between",
  },
  scrollArea: {
    flex: 1,
  },
  form: {
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
  },
  photoBox: {
    width: 140,
    height: 120,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  photoText: {
    color: "#888",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    height: 44,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#2E4A2C",
    borderWidth: 0,
  },
  pickerWrapper: {
    width: "100%",
    height: 44,
    borderRadius: 8,
    backgroundColor: "#fff",
    justifyContent: "center",
    overflow: "hidden",
    // no paddingHorizontal qui!
  },
  picker: {
    color: "#2E4A2C",
    width: "100%",
    height: 44,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  cancelButton: {
    backgroundColor: "#C69C91",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    flex: 1,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: "#7DBB8D",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    flex: 1,
    marginLeft: 8,
  },
  cancelText: {
    color: "#2E4A2C",
    textAlign: "center",
    fontWeight: "bold",
  },
  addText: {
    color: "#2E4A2C",
    textAlign: "center",
    fontWeight: "bold",
  },
});