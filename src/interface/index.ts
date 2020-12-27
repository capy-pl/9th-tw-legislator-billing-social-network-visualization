
export type Edge = {
  edge: number[];
  weight: number;
};

export type Node = {
  id: number;
  weight: number;
};

export type Community = number[];

export type Graph = {
  nodes: Node[];
  edges: Edge[];
  communities: Community[];
};

export type Legislator = {
  id: number;
  term: number;
  name: string;
  sex: string;
  party: PartyType;
  partyGroup: string;
  areaName: string;
  committee: string[];
  degree: string[];
  experience: string[];
  picUrl: string;
  picBase64: string;
};

export type Bill = {
  id: number;
  date: string;
  term: string;
  sessionTimes: string;
  sessionPeriod: string;
  billName: string;
  billProposer: string[];
  billCosignatory: string[];
}

export type PartyType = '民主進步黨' | '無黨籍' | '時代力量' | '中國國民黨' | '無黨團結聯盟' | '親民黨';
