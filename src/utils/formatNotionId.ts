import { validate as isUUID } from "uuid";

/**
 * Notion URL에서 복사한 32자리 ID를 UUID 포맷으로 변환
 */
export const formatNotionIdToUUID = (id: string): string => {
  // 이미 UUID 형식이면 그대로 사용
  if (isUUID(id)) return id;

  // 길이가 32자가 아니면 변환 시도하지 않음 (잘못된 ID)
  if (id.length !== 32) throw new Error("Notion ID는 32자리 문자열이어야 합니다.");

  // 하이픈 없는 32자리 ID → UUID 형식으로 변환
  return `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(16, 20)}-${id.slice(
    20
  )}`;
};
