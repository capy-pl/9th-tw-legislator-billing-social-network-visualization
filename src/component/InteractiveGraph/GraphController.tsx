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
          灣形便，動世科來舉經突分委的亮一也接書本家熱業時門酒、唱不言良供，分教除場推高地只健孩，清通失於話我平別了土苦加一散此明乎形便！灣人真聞？光言現這辦身。學解得魚這定？生畫遊：器的阿子開園家生點；家易智出中病馬臺以始選動們叫你因源年起更又日。
          </p>
          <div style={{ marginTop: '3rem' }}>
            <h4>政黨</h4>
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