export const printPrettyJson = (text: object) => {
  console.log(JSON.stringify(text, null, 4));
};
