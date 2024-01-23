export interface ToasterData {
  message: string;
  type: 'added' | 'edited' | 'deleted';
  visible: boolean;
}
