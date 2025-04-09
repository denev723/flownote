import { htmlToText } from "html-to-text";

export const cleanContent = (content: string) => {
  return htmlToText(content, {
    wordwrap: 130,
  });
};
