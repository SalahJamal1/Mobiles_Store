import * as SecureStore from "expo-secure-store";
export const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(new Date(dateString));
};
export function getInitial(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export const getToken = async (): Promise<boolean> => {
  const token = await SecureStore.getItemAsync("jwt");
  return !!token;
};
export const CAPACITIES = [
  { name: "128 GB", extra: 0 },
  { name: "256 GB", extra: 100 },
  { name: "512 GB", extra: 200 },
  { name: "1 TB", extra: 300 },
];

export const DEFAULT_COLORS = [
  { name: "Space Gray", value: "#374151" },
  { name: "Silver", value: "#e5e7eb" },
  { name: "Rose Gold", value: "#fda4af" },
  { name: "Midnight Purple", value: "#7c3aed" },
];

export const COLOR_HEX: { [key: string]: string } = {
  "Space Gray": "#374151",
  Silver: "#e5e7eb",
  "Rose Gold": "#fda4af",
  "Midnight Purple": "#7c3aed",
};
