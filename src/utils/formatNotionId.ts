import { validate as isUUID } from "uuid";

/**
 * Notion URL에서 복사한 32자리 ID를 UUID 포맷으로 변환
 */
export const formatNotionIdToUUID = (id: string): string => {
  if (isUUID(id)) return id; // 이미 UUID 형식이면 그대로 사용

  // 32자 하이픈 없는 ID → UUID 형식으로 변환
  return `${id.substring(0, 8)}-${id.substring(8, 12)}-${id.substring(12, 16)}-${id.substring(16, 20)}-${id.substring(20)}`;
};
