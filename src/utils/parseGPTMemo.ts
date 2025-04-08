import { Memo, MemoCategory, MemoListType } from "../types";

export const parseGPTMemo = (gptData: {
  title: string;
  category: MemoCategory;
  summary: string;
  bullets?: string[];
  listType: MemoListType;
}): Memo => {
  const bullets = gptData.bullets ?? [];

  return {
    title: gptData.title,
    category: gptData.category,
    summary: gptData.summary,
    bullets,
    listType: gptData.listType,
  };
};
