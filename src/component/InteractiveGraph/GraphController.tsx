import React from 'react';

import Graph from './Graph';

import {
  Legislator,
  Graph as GraphModel,
  Bill,
  PartyType,
} from '../../interface';

import './GraphController.css';

type Props = {
  legislators: Legislator[];
  graph: GraphModel;
  bills: Bill[];
  onDoubleClickLegislatorNode: (legislatorid: number) => void;
}

type State = {
  clickedParties: PartyType[];
};

export default class GraphController extends React.PureComponent<Props, State> {
  public state: State = {
    clickedParties: []
  };

  public onClickPartyLabel = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget) {
      const party = e.currentTarget.textContent as PartyType;
      if (this.state.clickedParties.includes(party)) {
        this.setState({
          clickedParties: this.state.clickedParties.filter((val) => (val !== party)),
        });
      } else {
        this.setState({
          clickedParties: [...this.state.clickedParties, party],
        });
      }
    }
  }

  public clicked = (party: PartyType) => {
    if (this.state.clickedParties.includes(party)) {
      return 'clicked'
    }
    return '';
  }

  public filterNodes = (): number[] => {
    if (this.state.clickedParties.length >= 1) {
      return this.props.legislators.filter((val) => (!this.state.clickedParties.includes(val.party))).map((val) => val.id);
    }
    return [];
  }

  render() {
    return (
      <>
        <Graph
          graph={this.props.graph}
          legislators={this.props.legislators}
          showCommunities={false}
          onClickNode={this.props.onDoubleClickLegislatorNode}
          hideNodes={this.filterNodes()}
        />
        <div id='left-panel'>
          <h2 style={{ textAlign: 'right' }}>第九屆立委提案網路視覺化</h2>
          <p>
            本次連署網路的資料透過立法院提案API取得，總共取得第九屆任期內105年2月1號至108年3月8號共5264筆提案資料。在資料處理過程中，將以政黨名義或是
            行政院提案之法案刪除，共剩下42共剩下4287筆提案資料。
          </p>
          <p>
            此視覺化將每一位立法委員視為圖中的一個節點。在同一筆提案資料中，將裡面的提案人與聯署人做兩兩的組合並將其連線。圖中節點的大小代表該委員參與提案的
            積極度，是利用該委員參與連署的次數大小比例所繪製。
          </p>
          <div style={{ marginTop: '3rem' }}>
            <h4>政黨</h4>
            <p>點擊以下政黨標籤可針對圖中節點進行篩選(可複選)</p>
            <button onClick={this.onClickPartyLabel} className={`btn color-kmt ${this.clicked('中國國民黨')}`}>中國國民黨</button>
            <button onClick={this.onClickPartyLabel} className={`btn color-dpp ${this.clicked('民主進步黨')}`}>民主進步黨</button>
            <button onClick={this.onClickPartyLabel} className={`btn color-times ${this.clicked('時代力量')}`}>時代力量</button>
            <button onClick={this.onClickPartyLabel} className={`btn color-pfp ${this.clicked('親民黨')}`}>親民黨</button>
            <button onClick={this.onClickPartyLabel} className={`btn color-nonleague ${this.clicked('無黨團結聯盟')}`}>無黨團結聯盟</button>
            <button onClick={this.onClickPartyLabel} className={`btn color-none ${this.clicked('無黨籍')}`}>無黨籍</button>
          </div>
        </div>
      </>
    )
  }
}