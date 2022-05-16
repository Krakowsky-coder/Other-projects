import React, { useEffect, useState } from "react";
import { Graph, GraphConnection } from "../../models/Graph.model";
import isEqual from 'lodash-es/isEqual'
import './IncidentMatrix.scss';

interface IIncidentMatrixProps {
  graph: Graph
}

interface IUndirectedIncMatrix {
  [vertice: string]: {edges: GraphConnection[]}
}

export const IncidentMatrix = (props: IIncidentMatrixProps) => {
  const [incMatrix, setIncMatrix] = useState({} as IUndirectedIncMatrix);
  
  useEffect(() => (buildDirectedIncMatrix(), buildUndirectedIncMatrix()));

  const buildDirectedIncMatrix = () => {
    console.log("DIRECTED" + props.graph.isEmpty());
  }

  const buildUndirectedIncMatrix = () => {
    if(!props.graph.isEmpty()){
      const uIncMatrix: IUndirectedIncMatrix = {};
      props.graph.verticesIds.forEach(vert => {
        const filteredConnections = props.graph.connections.filter(con => con.x === vert || con.y === vert);
        uIncMatrix[vert] = {edges: filteredConnections};
      });
  
      if(!isEqual(uIncMatrix, incMatrix)){
        setIncMatrix(uIncMatrix);
      }
    }
  }

  const generateUndirectedTable = () => {
    const rows: JSX.Element[] = [];
    Object.keys(incMatrix).forEach(vertice => {
      const cells: JSX.Element[] = [];
      cells.push(<div className="incm-column" key={vertice}><strong>{vertice}</strong></div>);
      props.graph.connections.forEach((conn, i) => {
        const found = incMatrix[vertice].edges.findIndex(findConn => findConn.x === conn.x && findConn.y === conn.y);
        const uniqID = `conn_${i}_${vertice}`; 
        cells.push(<div className="incm-column" key={uniqID}>{found > -1 ? '1' : '0'}</div>)
      })
      rows.push(<div className="incm-row" key={vertice}>{cells}</div>)
    })
    return (
    <div className="incm-wrapper">
      <div className="incm-row">
        <div className="incm-column"><h5>Macierz incydencji</h5></div>
        {Object.values(props.graph.connections).map(x => <div className="incm-column"><strong><p>{x.x}</p><p>{x.y}</p></strong></div>)}
      </div>
      {rows}
    </div>)
  }

  if(props.graph.isEmpty()){
    return <div>1</div>
  }else{
    return (
      <div>
        {generateUndirectedTable()}
      </div>
    )
  }
}