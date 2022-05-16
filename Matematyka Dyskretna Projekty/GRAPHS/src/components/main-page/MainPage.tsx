import React from "react";
import { Graph } from "../../models/Graph.model";
import { IncidentMatrix } from "../incident-matrix/IncidentMatrix";
import { Uploader } from "../uploader/Uploader";

interface IMainPageState {
  graph: Graph;
}

export class MainPage extends React.Component<{}, IMainPageState> {
  constructor(props: any) {
    super(props);
    this.graphReceive = this.graphReceive.bind(this);
    this.state = {
      graph: new Graph(),
    };
  }

  graphReceive(graph: Graph) {
    this.setState({ graph });
    console.log(graph);
  }

  render() {
    return (
      <div>
        <Uploader onGraphCreate={this.graphReceive} />
        <pre>{JSON.stringify(this.state.graph, undefined, 2)}</pre>
        <IncidentMatrix graph={this.state.graph}/>
      </div>
    );
  }
}
