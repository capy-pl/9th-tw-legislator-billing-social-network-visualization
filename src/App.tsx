import React from 'react';
import './App.css';
import LegislatorJson from './data/legislator.json';
import BillJson from './data/remove-none-legislator-bill.json';
import GraphJson from './data/graph.json';
import InteractiveGraph from './component/InteractiveGraph';
import LegislatorInfoTab from './component/LegislatorInfoTab';

import {
  Legislator,
  Graph,
  Bill,
} from './interface';

type State = {
  clickedLegislatorId: number;
  showLegislatorInfoTab: boolean;
}

class App extends React.PureComponent<{}, State> {
  public state: State = {
    clickedLegislatorId: 0,
    showLegislatorInfoTab: false,
  };

  public onDoubleClick = (id: number) => {
    this.setState({
      clickedLegislatorId: id,
      showLegislatorInfoTab: true,
    });
  }

  public onCloseInfoTab = () => {
    this.setState({
      showLegislatorInfoTab: false,
    });
  }

  public render() {
    return (
      <div className="App">
        {
          this.state.showLegislatorInfoTab && <LegislatorInfoTab
            close={this.onCloseInfoTab}
            legislator={(LegislatorJson as Legislator[])[this.state.clickedLegislatorId]}
          />
        }
      <InteractiveGraph onDoubleClickLegislatorNode={this.onDoubleClick} legislators={LegislatorJson as Legislator[]} graph={GraphJson as Graph} bills={BillJson as Bill[]} />
  </div>
    );
  }
}

export default App;
