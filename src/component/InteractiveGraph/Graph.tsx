import React from 'react';
import "vis-network/styles/vis-network.css";
import { DataSet, Network, NodeOptions, Options } from 'vis-network';
import { base64Url, getPartyColor } from '../../util';

import {
  Legislator,
  Node,
  Edge as EdgeModel,
  Graph as GraphModel
} from '../../interface'; 

type Props = {
  legislators: Legislator[];
  graph: GraphModel;
  hideNodes?: number[];
  showCommunities: boolean;
  onClickNode: (id: number) => void;
}

interface GraphNode extends NodeOptions {
  id: number;
  label: string;
};


const graphOption: Options = {
  edges: {
    smooth: false,
    color: "rgba(145, 152, 159, 0.5)",
  },
  layout: {
    improvedLayout: false,
    randomSeed: 5,
  },
  nodes: {
    shape: 'circularImage',
    borderWidth: 4,
    borderWidthSelected: 8,
    font: {
      size: 25,
      color: "#080808",
      bold: {
        size: 40,
      },
    },
    scaling: {
      min: 30,
      max: 125,
    }
  },
  physics: {
    solver: 'forceAtlas2Based',
    barnesHut: {
      springLength: 1000,
      gravitationalConstant: -25000 
    },
    forceAtlas2Based: {
      springLength: 800,
      gravitationalConstant: -1500,
      avoidOverlap: 0.2,
    },
    minVelocity: 15,
  },
  interaction: {
    hover: true,
    tooltipDelay: 100,
  },
};

export default class Graph extends React.PureComponent<Props> {
  private containerRef = React.createRef<HTMLDivElement>();
  private network ?: Network;
  private nodes ?: DataSet<GraphNode>;
  private edges ?: DataSet<any>;

  public initGraph() {
    if (this.containerRef && this.containerRef.current){
      this.nodes = new DataSet<GraphNode>();

      this.props.graph.nodes.forEach((node) => {
        this.nodes?.add(this.toGraphNode(node));
      });

      this.edges = new DataSet();
      this.props.graph.edges.forEach((edge) => {
        if (edge.weight > 25) {
          this.edges?.add(this.toGraphEdge(edge));
        }
      });

      this.network = new Network(this.containerRef.current, { 
        nodes: this.nodes,
        edges: this.edges,
      }, graphOption);

      this.network.on('doubleClick', (e) => {
        if (e.nodes && e.nodes.length > 0) {
          this.props.onClickNode(e.nodes[0]);
        }
      });
    }
  }

  public toGraphNode(node: Node) : GraphNode {
    const legislator = this.props.legislators[node.id];
    const border = getPartyColor(legislator.party);
    return {
      id: node.id,
      label: `${legislator.name}`,
      image: base64Url(legislator.picBase64),
      value: node.weight,
      font: {
        color: border,
        size: 30
      },
      color: {
        border,
        hover: {
          border,
        },
        highlight: {
          border,
        }
      },
    };
  }

  public toGraphEdge(edge: EdgeModel) : any {
    return {
      from: edge.edge[0],
      to: edge.edge[1],
    }
  }

  public componentDidMount() {
    this.initGraph();
  }

  public componentDidUpdate = () => {
    this.repaint();
    if (this.props.hideNodes && this.props.hideNodes.length) {
      this.nodes?.update(this.props.hideNodes.map((id) => ({
          id,
          hidden: true,
        })
      ));
    }
  }

  public repaint = () => {
    this.nodes?.update(this.props.legislators.map((legislator) => ({
      id: legislator.id,
      hidden: false,
    })));
  }

  public render() {
    return (
      <div ref={this.containerRef} id="interactivegraph-graph-container" />
      )
  }
}