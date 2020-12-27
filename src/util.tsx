import { PartyType } from './interface';

export function base64Url(str: string) : string {
  return `data:image/jpeg;base64, ${str}`;
}

export function getPartyColor(party: PartyType) : string {
  switch(party){
    case '中國國民黨':
      return '#005CAF';
    case '民主進步黨':
      return '#24936E'
    case '親民黨':
      return '#F05E1C'
    case '時代力量':
      return '#FFB11B';
    case '無黨團結聯盟':
      return '#C1328E';
    default:
      return '#656765';
  }
}