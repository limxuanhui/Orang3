export const printPrettyJson = (text: object) => {
  console.info(JSON.stringify(text, null, 4));
};
