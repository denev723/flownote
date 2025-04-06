import dayjs from "dayjs";

export const replaceRelativeDates = (input: string): string => {
  const base = dayjs();

  // 날짜 표현 → YYYY-MM-DD
  const dateMap: { [key: string]: string } = {
    오늘: base.format("YYYY-MM-DD"),
    금일: base.format("YYYY-MM-DD"),
    당일: base.format("YYYY-MM-DD"),
    본일: base.format("YYYY-MM-DD"),
    오늘자: base.format("YYYY-MM-DD"),

    내일: base.add(1, "day").format("YYYY-MM-DD"),
    명일: base.add(1, "day").format("YYYY-MM-DD"),
    익일: base.add(1, "day").format("YYYY-MM-DD"),
    이튿날: base.add(1, "day").format("YYYY-MM-DD"),
    "다음 날": base.add(1, "day").format("YYYY-MM-DD"),

    모레: base.add(2, "day").format("YYYY-MM-DD"),
    "내일 모레": base.add(2, "day").format("YYYY-MM-DD"),
    "사흘 뒤": base.add(2, "day").format("YYYY-MM-DD"),
    익익일: base.add(2, "day").format("YYYY-MM-DD"),

    사흘: base.add(2, "day").format("YYYY-MM-DD"),
    나흘: base.add(3, "day").format("YYYY-MM-DD"),
    닷새: base.add(4, "day").format("YYYY-MM-DD"),
    엿새: base.add(5, "day").format("YYYY-MM-DD"),
    이레: base.add(6, "day").format("YYYY-MM-DD"),
    여드레: base.add(7, "day").format("YYYY-MM-DD"),
    아흐레: base.add(8, "day").format("YYYY-MM-DD"),
    열흘: base.add(9, "day").format("YYYY-MM-DD"),

    "삼일 뒤": base.add(3, "day").format("YYYY-MM-DD"),
    "며칠 뒤": base.add(3, "day").format("YYYY-MM-DD"),
    다다음날: base.add(2, "day").format("YYYY-MM-DD"),
    "다다음 주": base.add(14, "day").format("YYYY-MM-DD"),
  };

  let result = input;

  // 날짜 표현 변환
  for (const [word, date] of Object.entries(dateMap)) {
    const pattern = new RegExp(word, "g");
    result = result.replace(pattern, date);
  }

  return result;
};
