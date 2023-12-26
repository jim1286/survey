import { BoardTypeEnum } from "@/enums";

export interface Board {
  id: string;
  title?: string;
  type: BoardTypeEnum;
  answer?: string;
  necessary: boolean;
  options?: BoardOption[];
}

export interface BoardOption {
  label: string;
  value: string;
}
